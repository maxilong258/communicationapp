<template>
  <div class="user-home-nav-bar">
    <nav-bar-1 class="user-home-nav">
      <div slot="left" class="user-home-nav-left" @click="backOne">
        <image src="~static/img/assets/back.png" mode="scaleToFill" />
      </div>
      <div
        slot="right"
        class="user-home-nav-right"
        v-if="relation === 0 || relation === 1"
        @click="userDetail"
      >
        <image src="~static/img/assets/more.png" mode="scaleToFill" />
      </div>
    </nav-bar-1>
  </div>
</template>

<script>
import NavBar1 from 'components/content/navbar1/NavBar1'
export default {
  name: 'UserHomeNavBar',
  components: { NavBar1 },
  props: {
    relation: {
      type: Number,
      default() {
        return 2
      }
    },
    id: {
      type: String,
      default() {
        return ''
      }
    }
  },
  methods: {
    backOne() {
      uni.navigateBack({ delta: 1 })
    },
    userDetail() {
      uni.navigateTo({ url: '/pages/userdetail/UserDetail?id=' + this.id  })
    }
  }
}
</script>

<style scoped>
.user-home-nav-left image {
  height: 52rpx;
  width: 52rpx;
  margin-top: 24rpx;
  margin-left: 30rpx;
}

.user-home-nav-right image {
  height: 52rpx;
  width: 52rpx;
  margin-top: 24rpx;
  margin-left: 32rpx;
}
</style>