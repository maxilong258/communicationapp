<template>
  <div class="index-nav-bar">
    <nav-bar class="home-nav">
      <div slot="left" class="nav-bar-left">
        <image src="~static/img/user/yyyeee.png" mode="aspectFill"></image>
      </div>
      <div slot="center" class="nav-bar-center">
        <image src="~static/img/main/logooo.png" mode="scaleToFill" />
      </div>
      <div slot="right" class="nav-bar-right">
        <div class="search"><div class="iconfont icon-search"></div></div>
        <div class="add"><div class="iconfont icon-Add"></div></div>
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

.nav-bar-left image {
  border-radius: 50%;
  height: 60rpx;
  width: 60rpx;
  margin: 18rpx 39rpx;
}
.nav-bar-center image {
  padding-top: 20rpx;
  height: 60rpx;
  width: 240rpx;
}
.nav-bar-right {
  display: flex;
  justify-content: center;
  align-content: center;
}
.nav-bar-right div {
  flex: 1;
}
.icon-search {
  margin: 8rpx 10rpx 0 20rpx;
  font-size: 39rpx;
}
.icon-Add {
  font-size: 47rpx;
  margin: 8rpx 10rpx 0 20rpx;
}
</style>