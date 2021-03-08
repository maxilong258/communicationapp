<template>
  <div class="search-top-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "SearchTopBar"
};
</script>

<style scoped>
.search-top-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
}

.left {
  width: 80%;
  height: 44px;
  line-height: 44px;
}

.right {
  flex: 1;
  text-align: center;
}
</style>