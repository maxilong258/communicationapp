<template>
  <div class="user-home">
    <user-home-nav-bar :relation="relation" :id="id"></user-home-nav-bar>
    <div class="bg">
      <view class="bg-white" :animation="animationData3"></view>
      <image :src="user.imgurl" mode="aspectFill" class="bg-img" />
    </div>
    <div class="main">
      <div class="user-header">
        <view
          class="sex"
          :style="{ background: sexbg }"
          :animation="animationData2"
        >
          <image :src="seximg" mode="scaleToFill" />
        </view>
        <image
          :src="user.imgurl"
          mode="aspectFill"
          class="user-img"
          :animation="animationData1"
        />
      </div>
      <div class="user-info">
        <div class="username">{{ markname }}</div>
        <div class="usernick">昵称: {{ user.name }}</div>
        <div class="userintro">{{ user.explain }}</div>
      </div>
    </div>

    <user-home-bottom-bar>
      <div class="bottom-btn" @click="addFriendAnime" v-if="relation === 2">
        加为好友
      </div>
      <div class="bottom-btn" v-if="relation === 1">发送消息</div>
    </user-home-bottom-bar>
    <!-- ------------------------------------------------------------------------------------------------- -->
    <view
      class="add-msg"
      :style="{ height: addHeight + 'px', bottom: -+addHeight + 'px' }"
      :animation="animationData"
    >
      <div class="name">{{ user.name }}</div>
      <textarea v-model="addfriendmsg" maxlength="120" class="add-text" />
    </view>

    <view class="add-bt" :animation="animationData">
      <view class="close" @click="addFriendAnime">取消</view>
      <div class="send" @click="addFriend">发送</div>
    </view>
  </div>
</template>

<script>
import UserHomeBottomBar from './childcomponents/UserHomeBottomBar.vue'
import UserHomeNavBar from './childcomponents/UserHomeNavBar'
import { request } from 'network/request'

export default {
  name: 'UserHome',
  components: { 
    UserHomeNavBar,
    UserHomeBottomBar 
  },
  data() {
    return {
      id: '',
      uid: '',
      token: '',
      seximg: '',
      sexbg: '',
      relation: null,     //用户与自己的状态 0 为自己 1 为好友 2 为不是好友
      myname: '',
      addfriendmsg: '请求加为好友',
      markname: '',
      addHeight: '',
      animationData: {},
      animationData1: {},
      animationData2: {},
      animationData3: {},
      isAdd: false,
      user: {}
    }
  },
  onLoad (e) {
    this.id = e.id
    this.getStorages()
    this.getUser()
    this.friendJudge()
  },
  mounted() {
    this.getElementStyle()
  },
  methods: {
    getStorages () {
      try {
        const value = uni.getStorageSync('user')
        if (value) {
          this.uid = value.id
          this.token = value.token
          this.myname = value.name
        } else {
          uni.navigateTo({ url: '/pages/signin/Signin' })
        }
      } catch (e) {
        //error
      }
    },
    getUser () {
      request({
        url: '/user/detail',
        data: {
          id: this.id,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          result.imgurl = this.serverUrl + '/user/' + result.imgurl
          if (typeof(res.explain)) result.explain = '这个人很懒，什么都没有留下'
          if ( this.markname.length === 0 ) this.markname = result.name
          this.sexJudge(result.sex)
          this.user = result
        } else if (status === 500) {
          uni.showToast({
          title: '服务器出错',
          icon: 'none',
          duration: 3939
         })
        } else if (status === 300) {
          uni.navigateTo({ url: '/pages/signin/Signin?name=' + this.myname })
        }
      })
    },
    sexJudge (e) {
      if(e == 'female') {
        this.seximg = '../../static/img/assets/female.png'
        this.sexbg = 'rgba(255, 93, 91, 1)'
      } else if (e === 'male') {
        this.seximg = '../../static/img/assets/male.png'
        this.sexbg = '#ooafc0'
      } else if (e === "asexual") {
        this.sexbg = 'black'
      }
    },
    friendJudge () {
      if (this.id === this.uid) return this.relation = 0
      request({
        url: '/search/isfriend',
        data: {
          uid: this.uid,
          fid: this.id,
          token: this.token
        },
        method: 'post',
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if (status === 200) {
          this.relation = 1
          this.getMarkname()
        }
        else if (status === 400) this.relation = 2
        else if (status === 500) uni.showToast({
          title: '服务器出错',
          icon: 'none',
          duration: 3939
        })
      })
    },
    getMarkname () {
      request({
        url: '/user/getmarkname',
        data: {
          uid: this.uid,
          fid: this.id,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          if(!typeof(result.markname)) this.markname = result.markname
        } else if (status === 300) {
          uni.navigateTo({ url: '/pages/signin/Signin?name=' + this.myname })
        } else if(status === 500) {
          uni.showToast({
            title: '服务器出错',
            icon: 'none',
            duration: 3939
          })
        }
      })
    },
    getElementStyle () {
      const query = uni.createSelectorQuery().in(this);
      query.select('.bg').boundingClientRect(data => {
        console.log("得到布局位置信息" + JSON.stringify(data));
        console.log("节点离页面顶部的距离为" + data.top);
        this.addHeight = data.height-239
      }).exec();
    },
    addFriendAnime() {
      this.isAdd = !this.isAdd
      var animation = uni.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      var animation1 = uni.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      var animation2 = uni.createAnimation({
        duration: 100,
        timingFunction: 'ease',
      })
      var animation3 = uni.createAnimation({
        duration: 100,
        timingFunction: 'ease',
      })
      if (this.isAdd) {
        animation.bottom(0).step()
        animation1.width(120).height(120).step()
        animation1.left('-39%').step()
        animation2.opacity(0).step()
        animation3.backgroundColor('rgba(241, 196, 15, .4)').step()
      } else {
        animation.bottom(-this.addHeight).step()
        animation1.left(0).step()
        animation1.width().height().step()
        animation2.opacity(1).step()
        animation3.backgroundColor('rgba(241, 196, 15, 0)').step()
      }
      this.animationData = animation.export()
      this.animationData1 = animation1.export()
      this.animationData2 = animation2.export()
      this.animationData3 = animation3.export()
    },
    addFriend() {
      console.log(this.uid);
      request({
        url: '/friend/applyfriend',
        data: {
          uid: this.uid,
          fid: this.id,
          token: this.token,
          msg: this.addfriendmsg
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        let status = res.data.status
        if(status === 200) {
          uni.showToast({
            title: '好友请求发送成功',
            icon: 'none',
            duration: 3939
          })
        } else if (status === 300) {
          uni.navigateTo({ url: '/pages/signin/signin?name=' + this.myname })
        } else if (status === 500) {
          uni.showToast({
            title: '服务器出错',
            icon: 'none',
            duration: 3939
          })
        }
      })
    } 
  }, 
}
</script>

<style scoped>
.bg {
  z-index: -2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bg-img {
  opacity: 0.3;
  position: absolute;
  z-index: -1;
  left: -35rpx;
  top: -35rpx;
  width: 110%;
  height: 110%;
  filter: blur(16px);
}
.bg-white {
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
}

.main {
  text-align: center;
  padding-top: 230rpx;
}
.user-header {
  position: relative;
  width: 412rpx;
  height: 412rpx;
  margin: 0 auto;
}
.sex {
  position: absolute;
  bottom: 22rpx;
  right: 22rpx;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  z-index: 11;
}
.sex image {
  width: 32rpx;
  height: 32rpx;
  padding: 15rpx;
}
.user-img {
  width: 400rpx;
  top: 0;
  height: 400rpx;
  border-radius: 48rpx;
  border: 6rpx solid rgba(255, 255, 255, 1);
  z-index: 10;
  box-shadow: 0 36rpx 40rpx 0 rgba(39, 40, 50, 0.1);
}
.user-info {
  padding-top: 42rpx;
}
.username {
  font-size: 52rpx;
  color: #2c3e50;
  line-height: 74rpx;
}
.usernick {
  padding-top: 3rpx;
  font-size: 28 rpx;
  line-height: 40rpx;
  color: #2c3e50;
}
.userintro {
  padding: 20rpx 100rpx;
  width: 552rpx;
  font-size: 28rpx;
  font-family: PingFangSC-light;
  font-weight: 300;
  color: #34495e;
  line-height: 48rpx;
}

.bottom-btn {
  color: #2c3e50;
  font-size: 32rpx;
  font-weight: 600;
  width: 684rpx;
  height: 80rpx;
  background-color: #f1c40f;
  border-radius: 10rpx;
  margin: auto;
  text-align: center;
  line-height: 80rpx;
}

.add-msg {
  position: fixed;
  width: 100%;
  padding: 0 56rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 25rpx 25rpx 0 0;
}
.name {
  padding-top: 239rpx;
  padding-bottom: 39rpx;
  font-size: 52rpx;
  color: #2c3e50;
  line-height: 74rpx;
}
.add-text {
  padding: 18rpx 22rpx;
  height: 420rpx;
  width: 100%;
  box-sizing: border-box;
  background-color: #ecf0f1;
  font-size: 32rpx;
  font-weight: 400;
  color: #2c3e50;
  line-height: 44rpx;
  border-radius: 10rpx;
}

.close {
  color: #2c3e50;
  font-size: 32rpx;
  font-weight: 600;
  width: 239rpx;
  height: 80rpx;
  background-color: #bdc3c7;
  border-radius: 10rpx;
  margin: auto;
  text-align: center;
  line-height: 80rpx;
}

.send {
  flex: 1;
  margin-left: 20rpx;
  color: #2c3e50;
  font-size: 32rpx;
  font-weight: 600;
  width: 50rpx;
  height: 80rpx;
  background-color: #f1c40f;
  border-radius: 10rpx;

  text-align: center;
  line-height: 80rpx;
}

.add-bt {
  position: fixed;
  bottom: -104rpx;
  display: flex;
  width: 100%;
  height: 104rpx;
  background-color: rgba(236, 240, 241, 1);
  box-sizing: border-box;
  padding: 12rpx 32rpx;
}
</style>