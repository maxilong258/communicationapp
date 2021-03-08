<template>
  <div class="signin-nav-bar">
    <nav-bar class="sigin-nav">
      <div slot="left" class="nav-bar-left">
        <view hover-class="click">
          <image src="~static/img/assets/x.png" mode="aspectFill"
        /></view>
      </div>
      <div slot="right" class="nav-bar-right">
        <view hover-class="click" @click="toSignup">注册</view>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/content/navbar/NavBar";
export default {
  name: "SiginNavBar",
  components: {
    NavBar
  },
  methods: {
    toSignup() {
      uni.navigateTo({ url: '../signup/Signup' })
    }
  }
};
</script>

<style scoped>
.sigin-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background-color: #ffffff;

  line-height: 88rpx;
}

.nav-bar-left {
  position: relative;
  padding-right: 70rpx;
}
.nav-bar-left view {
  padding-right: 70rpx;
}

.nav-bar-left image {
  position: absolute;
  height: 60rpx;
  width: 60rpx;
  top: 18rpx;
  left: 20rpx;
}
.nav-bar-right {
  padding-left: 70rpx;
}
.nav-bar-right view {
  padding-left: 30rpx;
}
.click {
  background-color: yellow;
}
</style>