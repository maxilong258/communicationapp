<template>
  <div class="index-friend-list">
    <view
      class="friend-list"
      v-for="(item, index) in friends"
      :key="index"
      hover-class="friend-click"
      @click="toChat(item)"
    >
      <div class="friend-list-left">
        <text class="tip" v-if="item.tip > 0">{{ item.tip }}</text>
        <image :src="item.imgurl" mode="scaleToFill" />
      </div>
      <div class="friend-list-right">
        <div class="message-top">
          <div class="name">{{ item.name }}</div>
          <div class="time">{{ showTime(item.lastTime) }}</div>
        </div>
        <div class="message-content">
          {{ item.message }}
        </div>
      </div>
    </view>
  </div>
</template>

<script>
import dateHandler from "common/js/dateHandler";
export default {
  name: "IndexFriendList",
  props: {
    friends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    showTime(date) {
      return dateHandler.dateTime(date);
    },
    toChat (data) {
      uni.navigateTo({ url: '/pages/chat/Chat?id=' + data.id + '&name=' + data.name + '&img=' + data.imgurl })
    }
  },
};
</script>

<style scoped>
.friend-list {
  display: flex;
  padding: 10rpx 15px;
  margin-top: 4rpx;
}

.friend-click {
  background-color: #ecf0f1;
}

.friend-list-left {
  position: relative;
}
.friend-list-left image {
  width: 96rpx;
  height: 96rpx;
  border-radius: 10%;
}
.friend-list-left .tip {
  position: absolute;
  min-width: 24rpx;
  height: 36rpx;
  z-index: 10;
  background-color: #e67e22;
  border-radius: 18rpx;
  padding: 0 6rpx;
  left: 62rpx;
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