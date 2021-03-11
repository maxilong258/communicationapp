<template>
  <div class="chat-nav">
    <nav-bar-1>
      <div slot="left" class="chat-nav-left" @click="backOne">
        <image src="~static/img/assets/back.png" mode="scaleToFill" />
      </div>
      <div slot="center">
        <div class="title">开心就好</div>
      </div>
      <div slot="right">
        <div class="group-img">
          <image src="~static/img/user/3.png" />
        </div>
      </div>
    </nav-bar-1>
  </div>
</template>

<script>
import NavBar1 from 'components/content/navbar1/NavBar1'
export default {
  name: 'ChatNav',
  components: {
    NavBar1
  },
  methods: {
    backOne() {
      uni.navigateBack({ delta: 1 })
    }
  }
}
</script>

<style scoped>
.chat-nav {
  border-bottom: 1px solid #bdc3c7;
  background-color: rgba(236, 240, 241, 0.97);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.chat-nav-left {
  height: 88rpx;
}
.chat-nav-left image {
  height: 39rpx;
  width: 39rpx;
  margin-top: 24rpx;
  margin-left: 30rpx;
}
.chat-nav-center {
  line-height: 88rpx;
  font-size: 40rpx;
}
.group-img {
  height: 88rpx;
}
.group-img image {
  width: 68rpx;
  height: 68rpx;
  border-radius: 8rpx;
  margin-top: 10rpx;
  margin-left: 26rpx;
}
</style>