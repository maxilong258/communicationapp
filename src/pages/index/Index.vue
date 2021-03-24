<template>
  <div class="index">
    <index-nav-bar :imgurl="imgurl" :uid="uid"></index-nav-bar>
    <div class="home-content">
      <index-friend-list :friends="friends"></index-friend-list>
    </div>
  </div>
</template>

<script>
import IndexNavBar from "./childcomponents/IndexNavBar";
import IndexFriendRequest from "./childcomponents/IndexFriendRequest";
import IndexFriendList from "./childcomponents/IndexFriendList";
import { request } from 'network/request'
import { sort } from 'common/js/utils'

export default {
  name: "Index",
  components: {
    IndexNavBar,
    IndexFriendRequest,
    IndexFriendList
  },
  data() {
    return {
      friends: [],
      uid: '',
      imgurl: '',
      token: ''
    };
  },
  onLoad () {
    this.imgurl = ''
    this.getStorages()
    this.getFriends()
  },
  onPullDownRefresh () {
    this.friends = []
    this.getStorages(),
    this.getFriends()
    setTimeout((res) => {
      uni.stopPullDownRefresh()
    }, 1039)
  },
  methods: {
    getFriends() {
      request({
        url: '/index/getfriend',
        data: {
          uid: this.uid,
          state: 0,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          for (let i = 0; i < result.length; i++) {
            result[i].imgurl = this.serverUrl + result[i].imgurl
            if (result[i].markname) result[i].name = result[i].markname
            this.friends.push(result[i])
          }
          this.friends = sort(this.friends, 'lastTime', 0)
          for (let i = 0; i < this.friends.length; i++) {
            this.getLastMassage(this.friends, i)
            this.getUnread(this.friends, i)
          }
        }
        
      })
    },
    getLastMassage (arr, i) {
      request({
        url: '/index/getlastmsg',
        data: {
          uid: this.uid,
          fid: arr[i].id,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res)
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          if (result.types === 1) res.message = '[图片]' 
          if (result.types === 2) res.message = '[音频]'
          if (result.types === 3) res.message = '[位置]'
          let e = arr[i]
          e.message = result.message
          arr.splice(i, 1, e)
        }
      })
    },
    getUnread (arr, i) {
      request({
        url: '/index/unreadmsg',
        data: {
          uid: this.uid,
          fid: arr[i].id,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          let e = arr[i]
          e.tip = result
          arr.splice(i, 1, e)
        }
      })
    },  
    getStorages() {
      try {
        const value = uni.getStorageSync('user')
        if (value) {
          this.uid = value.id
          this.imgurl = this.serverUrl + value.imgurl
          this.token = value.token
        } else {
          uni.navigateTo({ url: '/pages/signin/Signin' })
        }
      } catch (e) {
          
      }
    }
  }
};
</script>

<style>
.index {
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: var(--status-bar-height);
}

.home-content {
  padding: 108rpx 0;
  width: 100%;
}
</style>
