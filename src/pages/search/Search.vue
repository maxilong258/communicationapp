<template>
  <div class="search-page">
    <search-top-bar>
      <div slot="left">
        <input
          type="search"
          placeholder="搜索用户和群"
          class="search"
          placeholder-style="color:#999;font-weight:400;"
        />
      </div>
      <div slot="right">
        <span class="text">取消</span>
      </div>
    </search-top-bar>
  </div>
</template>

<script>
import SearchTopBar from "components/content/searchtopbar/SearchTopBar"

export default {
  name: 'Search',
  components: {
    SearchTopBar
  }
}
</script>

<style scoped>
</style>