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
import fakedata from 'common/data/fakedata'
import { debounce } from 'common/js/utils'
import { request } from 'network/request'

export default {
  name: 'SearchTop',
  components: {
    SearchTopBar
  },
  props: {
    storagevalue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // uid: this.storagevalue.id,
      // token: this.storagevalue.token,
      // myname: this.storagevalue.name,
      searchresarr: []
    }
  },
  onLoad() {
    //console.log(this.storagevalue);
    //this.getStorages() 
  },
  methods: {
    
    backOne() {
      uni.navigateBack({ delta: 1 })
    },
    //获取关键词
    search:debounce(function(e){
      this.searchresarr = []
      let searchvalue = e.detail.value
      if (searchvalue.length > 0) this.searchUser(searchvalue)
    },399),
   
    
    // search(e) {
    //   this.searchresarr = []
    //   let searchvalue = e.detail.value 
    //   if (searchvalue.length > 0) {
    //     this.searchUser(searchvalue)
    //   }
    // },
    //寻找匹配关键词的用户
    searchUser(e) {
      request({
        url: '/search/user',
        data: {
          data: e,
          token: this.storagevalue.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          let exp = eval("/"+e+"/g")
          for (let item of result) {
            this.isFriend(item)
            item.imgUrl = this.serverUrl + item.imgurl
            item.name = item.name.replace(exp, '<span style="color:#3498db";>' + e + '</span>')
            item.email = item.email.replace(exp, '<span style="color:#3498db";>' + e + '</span>')
            this.searchresarr.push(item)     
            console.log(item);
          }
          this.$emit('getsearchresarr', this.searchresarr)
        } else if (status === 300) {
          uni.navigateTo({ url: '/pages/signin/Signin?name=' + this.storagevalue.name })
        }
        else if (status === 500) {
          uni.showToast({
            title: '服务器出错',
            icon: 'none',
            duration: 3939
          })
        } 
      })

      
    },
    //判断是否为好友
    isFriend(e) {
      let tomodaji = 0
      if (this.storagevalue.id === e._id){
        tomodaji = 2
        e.tomodaji = tomodaji
      }else{
        request({
          url: '/search/isfriend',
          data: {
            uid: this.storagevalue.id,
            fid: e._id,
            token: this.storagevalue.token
          },
          method: 'post'
        }).then((res) => {
          console.log(res);
          let status = res.data.status
          if (status === 200) {
            e.tomodaji = 1
          } else if (status === 400) {

          } else if (status === 300) {
            uni.navigateTo({ url: '/pages/signin/Signin?name=' + this.storagevalue.name })
          } else if (status === 500) {
            uni.showToast({
              title: '服务器出错',
              icon: 'none',
              duration: 3939
            })
          } 
          
        })
      }
      //  if (item.friend === e.id) tomodaji = 1
      e.tomodaji = tomodaji
      // // console.log(e.tomodaji);
      
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