<template>
  <div class="user-name-bottom-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UserHomeBottomBar'
}
</script>

<style scoped>
.user-name-bottom-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 104rpx;
  background-color: rgba(236, 240, 241, 1);
  box-sizing: border-box;
  padding: 12rpx 16rpx;
}
</style>