<template>
  <div class="user-detail-nav">
    <nav-bar-1 class="user-detail-nav">
      <div slot="left" class="user-detail-nav-left" @click="backOne">
        <image src="~static/img/assets/back.png" />
      </div>
      <div slot="center">详细</div>
    </nav-bar-1>
  </div>
</template>

<script>
import NavBar1 from 'components/content/navbar1/NavBar1'
export default {
  name: 'UserDetailNav',
  components: {
    NavBar1
  },
  props: {
    uid: {
      type: String,
      default() {
        return ''
      }
    }
  },
  methods: {
    // backOne () {
    //   uni.navigateTo({ url: '/pages/index/Index' })
    // }
    backOne () {
      uni.navigateBack({ delta: 1 })
    }
  }
}
</script>

<style scoped>
.user-detail-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background-color: #ffffff;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  line-height: 88rpx;
}

.user-detail-nav div {
  height: 88rpx;
}

.user-detail-nav-left image {
  height: 52rpx;
  width: 52rpx;
  margin-top: 21rpx;
  margin-left: 30rpx;
}
</style>