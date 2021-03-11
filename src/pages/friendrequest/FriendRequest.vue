<template>
  <div class="friend-request-page">
    <friend-request-nav></friend-request-nav>
    <div class="main">
      <div class="requester">
        <div class="request-top">
          <div class="reject btn">拒绝</div>
          <div class="top-img">
            <image src="~static/img/user/3.png" />
          </div>
          <div class="agree btn">同意</div>
        </div>
        <div class="request-center">
          <div class="title">名字</div>
          <div class="time">2020-1-30</div>
        </div>
        <div class="notic">
          <text>留言：</text>
          从底部弹起的滚动选择器。支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器。
        </div>
      </div>
      <div class="requester">
        <div class="request-top">
          <div class="reject btn">拒绝</div>
          <div class="top-img">
            <image src="~static/img/user/3.png" />
          </div>
          <div class="agree btn">同意</div>
        </div>
        <div class="request-center">
          <div class="title">名字</div>
          <div class="time">2020-1-30</div>
        </div>
        <div class="notic">
          <text>留言：</text>
          从底部弹起的滚动选择器。支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendRequestNav from './childcomponents/FriendRequestNav.vue'

export default {
  name: 'FriendRequest',
  components: {
    FriendRequestNav 
  },
}
</script>

<style scoped>
.main {
  padding: 66rpx 24rpx;
}
.requester {
  margin: 112rpx 0 20rpx;
  padding: 24rpx;
  background-color: #fff;
  box-shadow: 0rpx 24rpx 64rpx -8rpx rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;
}
.request-top {
  display: flex;
  flex-direction: row;
}
.request-top .btn {
  width: 160rpx;
  height: 64rpx;
  text-align: center;
  border-radius: 40rpx;
  font-size: 32rpx;
  line-height: 64rpx;
}
.reject {
  color: #d35400;
  background-color: #ecf0f1;
}
.agree {
  color: #2c3e50;
  background-color: #f1c40f;
}
.top-img {
  margin-top: -100rpx;
  flex: 1;
  text-align: center;
}
.top-img image {
  width: 166rpx;
  height: 166rpx;
  border-radius: 50%;
  background-color: #bdc3c7;
}
.request-center {
  padding-bottom: 34rpx;
  text-align: center;
  padding-top: 20rpx;
}
.request-center .title {
  font-size: 36rpx;
  font-weight: 500;
  color: #2c3e50;
  line-height: 50rpx;
}
.request-center .time {
  font-size: 24rpx;
  color: #95a5a6;
  line-height: 34rpx;
}
.notic {
  padding: 20rpx 32rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  background-color: #ecf0f1;
  color: #2c3e50;
  line-height: 40rpx;
}
</style>