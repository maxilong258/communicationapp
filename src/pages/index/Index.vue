<template>
  <div class="index">
    <index-nav-bar
      :imgurl="imgurl"
      :uid="uid"
      :haveFriendRequest="haveFriendRequest"
    ></index-nav-bar>
    <div class="home-content">
      <index-friend-list :friends="friends"></index-friend-list>
    </div>
  </div>
</template>

<script>
import IndexNavBar from "./childcomponents/IndexNavBar";
import IndexFriendRequest from "./childcomponents/IndexFriendRequest";
import IndexFriendList from "./childcomponents/IndexFriendList";
import { request } from 'network/request'
import { sort } from 'common/js/utils'

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
      token: '',
      haveFriendRequest: false
    };
  },
  onLoad () {
    uni.redirectTo({ url: '/pages/index/index' })
    //self.location="index.htm"
    // localStorage.setItem('loadedOnce', 'true');
    // document.location.reload(true);
    // let i = 0
    //if(i == 0) location.reload()
    this.friends = []
    this.getStorages()
    this.getFriends()
    this.join(this.uid)
    this.receiveSocketMsg()
    this.getRequestingFriends()
    setTimeout(() => {
      console.log(this.friends);
      console.log(this.uid);
    }, 3939)
  },
  onShow () {
    console.log('show');
    //uni.navigateTo({ url: '/pages/index/index' })
   // this.reload()
  //  /uni.startPullDownRefresh()
    //uni.stopPullDownRefresh()
  },
  onPullDownRefresh () {
    location.reload()
    this.friends = []
    this.getStorages()
    this.getFriends()
    this.getRequestingFriends()
    // setTimeout(() => {
    //   uni.stopPullDownRefresh()
    // }, 1039)  
  },
  methods: {
    reload () {
      location.reload()
    },
    join (uid) {
      this.socket.emit('login', uid)
    },
    
    receiveSocketMsg () {
      this.socket.on('msg', (msg, fromid) => {
        let newmsg = ''
        if (msg.types == 0) newmsg = msg.message 
        else if (msg.types == 1) newmsg = '[图片]'
        else if (msg.types == 2) newmsg = '[语音]'
        else if (msg.types == 3) newmsg = '[位置]'
        for (let i = 0; i < this.friends.length; i++) {
          if (this.friends[i].id == fromid) {
            let e = this.friends[i]
            e.lastTime = new Date()
            e.message = newmsg
            e.tip++
            this.friends.splice(i, 1)
            this.friends.unshift(e)
            console.log(this.friends);
          }
        } 
      })
    },
    getRequestingFriends () {
      request({
        url: 'index/getfriend',
        data: {
          uid: this.uid,
          state: 1,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        let result = res.data.result
        if (res.data.status === 200) {
          if (result.length > 0) this.haveFriendRequest = true
        }   
      }) 
    },

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
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          for (let i = 0; i < result.length; i++) {
            result[i].imgurl = this.serverUrl + result[i].imgurl
            if (result[i].markname) result[i].name = result[i].markname
            this.friends.push(result[i])
          }
          this.friends = sort(this.friends, 'lastTime', 0)
          for (let i = 0; i < this.friends.length; i++) {
            this.getLastMassage(this.friends, i)
            this.getUnread(this.friends, i)
          }
        }
        
      })
    },
    getLastMassage (arr, i) {
      request({
        url: '/index/getlastmsg',
        data: {
          uid: this.uid,
          fid: arr[i].id,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          if (result.types === 1) res.message = '[图片]' 
          if (result.types === 2) res.message = '[音频]'
          if (result.types === 3) res.message = '[位置]'
          let e = arr[i]
          e.message = result.message
          arr.splice(i, 1, e)
        }
      })
    },
    getUnread (arr, i) {
      request({
        url: '/index/unreadmsg',
        data: {
          uid: this.uid,
          fid: arr[i].id,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          let e = arr[i]
          e.tip = result
          arr.splice(i, 1, e)
        }
      })
    },  
    getStorages() {
      try {
        const value = uni.getStorageSync('user')
        if (value) {
          this.uid = value.id
          this.imgurl = this.serverUrl + value.imgurl
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
