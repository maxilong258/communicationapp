<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar1"
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 88rpx;
  line-height: 88rpx;
}

.left,
.right {
  width: 120rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.center {
  flex: 1;
  text-align: center;
}
</style>