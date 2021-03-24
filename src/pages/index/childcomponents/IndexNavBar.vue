<template>
  <div class="index-nav-bar">
    <nav-bar class="home-nav">
      <div slot="left" class="nav-bar-left">
        <navigator
          :url="'/pages/userhome/UserHome?id=' + uid"
          hover-class="none"
        >
          <image :src="imgurl" mode="aspectFill"></image>
        </navigator>
      </div>
      <div slot="center" class="nav-bar-center">
        <div class="logo-wrapper">
          <image src="~static/img/main/logooo.png" mode="scaleToFill" />
        </div>
      </div>
      <div slot="right" class="nav-bar-right">
        <div class="search" @click="toSearchPage">
          <image src="~static/img/assets/search1.png" mode="scaleToFill" />
        </div>
        <div class="add" @click="toRequestPage">
          <image src="~static/img/assets/requests.png" mode="scaleToFill" />
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/content/navbar/NavBar";
export default {
  name: "IndexNavBar",
  components: {
    NavBar
  },
  props: {
    imgurl: {
      type: String,
      default() {
        return '';
      }
    },
    uid: {
      type: String,
      default() {
        return ''
      }
    }
  },
  methods: {
    toSearchPage() {
      uni.navigateTo({ url: '/pages/search/Search' })
    },
    toRequestPage () {
      uni.navigateTo({ url: '/pages/friendrequest/FriendRequest' })
    }
  }
};
</script>

<style scoped>
.index-nav-bar {
  background-color: #ffffff;
  z-index: 999;
}

.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background-color: #ffffff;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  line-height: 88rpx;
}

.nav-bar-left {
  padding-right: 70rpx;
}
.nav-bar-left navigator {
  height: 88rpx;
}

.nav-bar-left image {
  width: 68rpx;
  height: 68rpx;
  border-radius: 8rpx;
  margin-top: 10rpx;
  margin-left: 30rpx;
}
.nav-bar-center div {
  height: 88rpx;
}
.nav-bar-center image {
  padding-top: 20rpx;
  height: 60rpx;
  width: 288rpx;
}
.nav-bar-right {
  display: flex;
  justify-content: center;
  align-content: center;
}
.nav-bar-right div {
  flex: 1;
  text-align: center;
  align-items: center;
  height: 88rpx;
}
.search image {
  width: 50rpx;
  height: 50rpx;
  border-radius: 8rpx;
  padding-top: 20rpx;
}
.add image {
  width: 50rpx;
  height: 50rpx;
  border-radius: 8rpx;
  padding-top: 20rpx;
}
</style>