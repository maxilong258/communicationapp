<template>
  <div class="index">
    <index-nav-bar></index-nav-bar>

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
      friends: []
    };
  },
  onLoad() {
    this.getFriends();
  },
  methods: {
    getFriends() {
      this.friends = fakedata.friends();
      for (let item of this.friends) {
        item.imgUrl = "../../static/img/user/" + item.imgUrl;
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
}

.home-content {
  padding: 108rpx 0;
  width: 100%;
}
</style>
