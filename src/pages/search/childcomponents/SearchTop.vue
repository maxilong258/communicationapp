<template>
  <div class="search-top">
    <search-top-bar>
      <div slot="left" class="search-div">
        <input
          type="search"
          placeholder="搜索用户和群"
          class="search"
          placeholder-style="color:#999;font-weight:400;"
          @input="search"
        />
        <image src="~static/img/assets/search.png" mode="scaleToFill" />
      </div>
      <div slot="right" class="search-cancel" @click="backOne">
        <span class="text">取消</span>
      </div>
    </search-top-bar>
  </div>
</template>

<script>
import SearchTopBar from "components/content/searchtopbar/SearchTopBar"
import fakedata from '../../../common/data/fakedata'
export default {
  name: 'SearchTop',
  components: {
    SearchTopBar
  },
  data() {
    return {
      searchresarr: []
    }
  },
  methods: {
    backOne() {
      uni.navigateBack({ delta: 1 })
    },
    //获取关键词
    search(e) {
      this.searchresarr = []
      let searchvalue = e.detail.value
      if (searchvalue.length > 0) {
        this.searchUser(searchvalue)
      }
    },
    //寻找匹配关键词的用户
    searchUser(e) {
      const arr = fakedata.friends()
      let exp = eval("/"+e+"/g")
      for (let item of arr) {
        this.isFriend(item)
        if (item.name.search(e) != -1 || item.email.search(e) != -1){
          item.imgUrl = '../../static/img/user/' + item.imgUrl
          item.name = item.name.replace(exp, '<span style="color:#3498db";>' + e + '</span>')
          item.email = item.email.replace(exp, '<span style="color:#3498db";>' + e + '</span>')
          this.searchresarr.push(item)
        }  
      }
      this.$emit('getsearchresarr', this.searchresarr)
    },
    //判断是否为好友
    isFriend(e) {
      let tomodaji = 0
      const arr = fakedata.isFriend();
      for (let item of arr) {
        if (item.friend === e.id) tomodaji = 1
      }
      e.tomodaji = tomodaji
      console.log(e.tomodaji);
    }
  }
}
</script>

<style scoped>
.search-div {
  width: 589rpx;
  height: 60rpx;
  position: relative;
  border-radius: 10rpx;
  margin: 14rpx auto 14rpx 32rpx;
  box-sizing: border-box;
  font-size: 32rpx;
  /* z-index: -1; */
}
.search-div image {
  position: absolute;
  top: 10rpx;
  right: 14rpx;
  height: 40rpx;
  width: 40rpx;
}
.search {
  background-color: rgba(243, 244, 246, 1);
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 70rpx 0 12rpx;
  border-radius: 10rpx;
}

.search-cancel {
  font-size: 32rpx;
}
</style>