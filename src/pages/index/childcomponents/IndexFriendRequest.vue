<template>
  <div class="index-friend-request">
    <view class="friend-list" hover-class="friend-click">
      <div class="friend-list-left">
        <text class="tip">1</text>
        <image src="~static/img/user/3.png" mode="scaleToFill" />
      </div>
      <div class="friend-list-right">
        <div class="message-top">
          <div class="name">好友请求</div>
          <div class="time">10:39</div>
        </div>
        <div class="message-content">你好帅</div>
      </div>
    </view>
  </div>
</template>

<script>
export default {
  name: "IndexFriendRequest"
};
</script>

<style scoped>
.friend-click {
  background-color: #ecf0f1;
}
.friend-list {
  display: flex;
  padding: 10rpx 15px;
  margin-top: 4rpx;
}
.friend-list-left {
  position: relative;
}
.friend-list-left image {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
}
.friend-list-left .tip {
  position: absolute;
  min-width: 36rpx;
  height: 36rpx;
  z-index: 10;
  background-color: #e74c3c;
  border-radius: 50%;
  left: 58rpx;
  line-height: 36rpx;
  text-align: center;
  color: #bdc3c7;
  font-size: 24rpx;
}
.friend-list-right {
  padding-left: 30rpx;
  width: 100%;
}
.message-top {
  height: 50rpx;
  line-height: 48rpx;
}
.message-top .name {
  float: left;
  font-size: 36rpx;
  font-weight: 400;
  color: #2c3e50;
}
.message-top .time {
  float: right;
  font-size: 24rpx;
  color: #7f8c8d;
}
.message-content {
  font-size: 30rpx;
  color: #2c3e50;
  line-height: 45rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>