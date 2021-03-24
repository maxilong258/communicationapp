<template>
  <div class="search-page">
    <search-top
      @getsearchresarr="getsearchresarr"
      :storagevalue="storagevalue"
    ></search-top>
    <div class="main">
      <div class="search-user result">
        <div class="title" v-if="searchresult.length > 0">用户</div>
        <div
          class="list user"
          v-for="(item, index) in searchresult"
          :key="index"
        >
          <navigator
            :url="'/pages/userhome/UserHome?id=' + item._id"
            hover-class="none"
          >
            <image :src="item.imgUrl" />
          </navigator>

          <div class="names">
            <div class="name" v-html="item.name"></div>
            <div class="email" v-html="item.email"></div>
          </div>
          <div
            class="right-btn send"
            v-if="item.tomodaji === 1"
            @click="
              toChat({ id: item._id, name: item.name, imgurl: item.imgUrl })
            "
          >
            发消息
          </div>
          <navigator
            :url="'/pages/userhome/UserHome?id=' + item._id"
            hover-class="none"
          >
            <div class="right-btn add" v-if="item.tomodaji === 0">加好友</div>
          </navigator>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchTop from './childcomponents/SearchTop'
export default {
  name: 'Search',
  components: {
    SearchTop
  },
  data() {
    return {
      storagevalue: {},
      searchresult: []
    }
  },
  onLoad() {
    this.getStorages()
    setTimeout(() => {
      console.log(this.searchresult);
    }, 3939)
  },
  methods: {
    getStorages () {
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
    getsearchresarr(searchresarr) {
      this.searchresult = searchresarr
      console.log(this.searchresult);
    },
    toChat (data) {
      uni.navigateTo({ url: '/pages/chat/Chat?id=' + data.id + '&name=' + data.name + '&img=' + data.imgurl })
    }
  }
}
</script>

<style scoped>
.main {
  padding: 0 32rpx;
}
.title {
  font-size: 44rpx;
  font-weight: 600;
  color: #2c3e50;
  line-height: 60rpx;
  padding-top: 30rpx;
  padding-bottom: 20rpx;
}
.list {
  border: 1px solid #fff;
  position: relative;
  height: 122rpx;
}
.list image {
  float: left;
  width: 80rpx;
  height: 80rpx;
  border-radius: 10%;
  margin: 20rpx 36rpx 20rpx 0;
}
.names {
  padding-left: 30rpx;
  margin-top: 16rpx;
}
.name {
  font-size: 36rpx;
  color: #2c3e50;
  line-height: 50rpx;
}
.email {
  font-size: 30rpx;
}
.right-btn {
  position: absolute;
  top: 0;
  right: 0;
  float: right;
  width: 120rpx;
  height: 48rpx;
  font-size: 26rpx;
  font-weight: 600;
  border-radius: 24rpx;
  line-height: 48rpx;
  text-align: center;
  margin-top: 36rpx;
}

.send {
  background-color: #f1c40f;
  color: #2c3e50;
}
.add {
  background-color: #bdc3c7;
  color: #3498db;
}
</style>