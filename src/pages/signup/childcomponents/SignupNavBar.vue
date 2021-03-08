<template>
  <div class="signup-nav-bar">
    <nav-bar class="signup-nav">
      <div slot="left" class="nav-bar-left">
        <view hover-class="click" @click="backToSignin">
          <image src="~static/img/assets/back.png" mode="aspectFill"
        /></view>
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
    backToSignin() {
      uni.navigateBack({ delta: 1 })
    }
  }
};
</script>

<style scoped>
.signup-nav {
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
  height: 50rpx;
  width: 50rpx;
  top: 18rpx;
  left: 20rpx;
}
</style>