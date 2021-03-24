<template>
  <div class="friend-request-page">
    <friend-request-nav></friend-request-nav>
    <div class="main">
      <div
        class="requester"
        v-for="(item, index) in requestingfriends"
        :key="index"
      >
        <div class="request-top">
          <div class="reject btn" @click="kotowalu(item.id)">拒绝</div>
          <div class="top-img">
            <image :src="item.imgurl" />
          </div>
          <div class="agree btn" @click="agree(item.id)">同意</div>
        </div>
        <div class="request-center">
          <div class="title">{{ item.name }}</div>
          <div class="time">{{ item.lastTime | showDate }}</div>
        </div>
        <div class="notic">
          <text>留言：</text>
          <div>{{ item.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendRequestNav from './childcomponents/FriendRequestNav.vue'
import { request } from 'network/request'
import { formatDate } from 'common/js/utils'

export default {
  name: 'FriendRequest',
  components: {
    FriendRequestNav 
  },
  data () {
    return {
      storagevalue: {},
      requestingfriends: []
    }
  },
  onLoad () {
    this.getStorages()
    this.getFriends()
  },
  filters: {
    showDate (value) {
      const date = new Date(value)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    } 
  },
  methods: {
    getStorages() {
      try {
        const value = uni.getStorageSync('user')
        if (value) {
          this.storagevalue = value
        } else {
          uni.navigateTo({ url: '/pages/signin/Signin' })
        }
        console.log(this.storagevalue);
      } catch (e) {
          
      }
    },
    getFriends () {
      request({
        url: 'index/getfriend',
        data: {
          uid: this.storagevalue.id,
          state: 1,
          token: this.storagevalue.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let result = res.data.result
        if (res.data.status === 200) {
          for (let i = 0; i < result.length; i++) {
            result[i].imgurl = this.serverUrl + result[i].imgurl
            this.getMessage(result, i)
          }
          this.requestingfriends = result   
        }   
      }) 
    },
    getMessage (arr, i) {
      request({
        url: 'index/getlastmsg',
        data: {
          uid: this.storagevalue.id,
          fid: arr[i].id,
          token: this.storagevalue.token
        },
        method: 'post'
      }).then((res) => {
        if(res.data.status === 200) {
          let result = res.data.result
          let e = arr[i]
          e.message = result.message
          arr.splice(i, 1, e)
        }   
      })
    },
    agree (fid) {
      request({
        url: '/friend/updatefriendstate',
        data: {
          uid: this.storagevalue.id,
          fid: fid,
          token: this.storagevalue.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if (status === 200) {
          for (let i = 0; i < this.requestingfriends.length; i++) {
            this.requestingfriends.splice(i, 1)
          }
        } 
      })
    },
    kotowalu (fid) {
      request({
        url: '/friend/deletefriend',
        data: {
          uid: this.storagevalue.id,
          fid: fid,
          token: this.storagevalue.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if (status === 200) {
          for (let i = 0; i < this.requestingfriends.length; i++) {
            this.requestingfriends.splice(i, 1)
          }
        }   
      })
    }
  }
}
</script>

<style scoped>
.main {
  padding: 66rpx 24rpx;
}
.requester {
  margin: 112rpx 0 20rpx;
  padding: 24rpx;
  background-color: #fff;
  box-shadow: 0rpx 24rpx 64rpx -8rpx rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;
}
.request-top {
  display: flex;
  flex-direction: row;
}
.request-top .btn {
  width: 160rpx;
  height: 64rpx;
  text-align: center;
  border-radius: 40rpx;
  font-size: 32rpx;
  line-height: 64rpx;
}
.reject {
  color: #d35400;
  background-color: #ecf0f1;
}
.agree {
  color: #2c3e50;
  background-color: #f1c40f;
}
.top-img {
  margin-top: -100rpx;
  flex: 1;
  text-align: center;
}
.top-img image {
  width: 166rpx;
  height: 166rpx;
  border-radius: 50%;
  background-color: #bdc3c7;
}
.request-center {
  padding-bottom: 34rpx;
  text-align: center;
  padding-top: 20rpx;
}
.request-center .title {
  font-size: 36rpx;
  font-weight: 500;
  color: #2c3e50;
  line-height: 50rpx;
}
.request-center .time {
  font-size: 24rpx;
  color: #95a5a6;
  line-height: 34rpx;
}
.notic {
  padding: 20rpx 32rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  background-color: #ecf0f1;
  color: #2c3e50;
  line-height: 40rpx;
}
</style>