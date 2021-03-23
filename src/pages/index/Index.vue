<template>
  <div class="index">
    <index-nav-bar :imgurl="imgurl" :uid="uid"></index-nav-bar>
    <div class="home-content">
      <index-friend-request></index-friend-request>
      <index-friend-list :friends="friends"></index-friend-list>
    </div>
  </div>
</template>

<script>
import IndexNavBar from "./childcomponents/IndexNavBar";
import IndexFriendRequest from "./childcomponents/IndexFriendRequest";
import IndexFriendList from "./childcomponents/IndexFriendList";
import { request } from 'network/request'
import fakedata from "../../common/data/fakedata";

export default {
  name: "Index",
  components: {
    IndexNavBar,
    IndexFriendRequest,
    IndexFriendList
  },
  data() {
    return {
      friends: [],
      uid: '',
      imgurl: '',
      token: ''
    };
  },
  onLoad() {
    this.getStorages()
    this.getFriends()
  },
  methods: {
    // getFriends1() {
    //   this.friends = fakedata.friends();
    //   for (let item of this.friends) {
    //     item.imgUrl = "../../static/img/user/" + item.imgUrl;
    //   }
    // },
    getFriends() {
      request({
        url: '/index/getfriend',
        data: {
          uid: this.uid,
          state: 0,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
      })
    },
    getStorages() {
      try {
        const value = uni.getStorageSync('user')
        if (value) {
          this.uid = value.id
          this.imgurl = this.serverUrl  + value.imgurl
          this.token = value.token
        } else {
          uni.navigateTo({ url: '/pages/signin/Signin' })
        }
      } catch (e) {
          
      }
    }
  }
};
</script>

<style>
.index {
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: var(--status-bar-height);
}

.home-content {
  padding: 108rpx 0;
  width: 100%;
}
</style>
