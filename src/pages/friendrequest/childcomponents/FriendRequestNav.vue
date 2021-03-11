<template>
  <div class="friend-request-nav">
    <nav-bar-1>
      <div slot="left" class="friend-request-nav-left" @click="backOne">
        <image src="~static/img/assets/back.png" mode="scaleToFill" />
      </div>
      <div slot="center" class="friend-request-nav-center">好友请求</div>
    </nav-bar-1>
  </div>
</template>

<script>
import NavBar1 from 'components/content/navbar1/NavBar1'
export default {
  name: 'FriendRequestNav',
  components: { NavBar1 },
  methods: {
    backOne() {
      uni.navigateBack({ delta: 1 })
    }
  }
}
</script>

<style scoped>
.friend-request-nav {
  border-bottom: 1px solid #ecf0f1;
}
.friend-request-nav-left image {
  height: 39rpx;
  width: 39rpx;
  margin-top: 24rpx;
  margin-left: 30rpx;
}
.friend-request-nav-center {
  line-height: 88rpx;
  font-size: 40rpx;
}
</style>