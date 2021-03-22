<template>
  <div class="signin">
    <signin-nav-bar></signin-nav-bar>
    <div class="logo" @click="test1">
      <image src="~static/img/main/logooo.png" mode="scaleToFill" />
    </div>
    <div class="main">
      <div class="title">登录</div>
      <div class="slogan">您好，欢迎来到 &%&…</div>
      <div class="inputs">
        <input
          type="text"
          placeholder="用户名/邮箱"
          placeholder-style="color:#999;font-weight:400;"
          v-model="username"
        />
        <input
          type="password"
          placeholder="密码"
          placeholder-style="color:#999;font-weight:400;"
          v-model="password"
        />
      </div>
      <div class="tips" :style="{ display: showtips }">用户名或密码错误</div>
      <div
        class="submit"
        @click="loginClick"
        :class="{ readytologin: username && password }"
      >
        <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import {request} from '../../network/request'
import SigninNavBar from "./childcomponents/SigninNavBar";

export default {
  name: "Singin",
  components: { SigninNavBar },
  data() {
    return {
      username: '',
      password: '',
      showtips: 'none'
    }
  },
  onLoad(e) {
    if(e.username){
      this.username = e.username
      uni.showToast({
        title: '注册成功请登录',
        icon: 'none',
        duration: 3939
      })
    } else if (e.name) {
      this.username = e.name
      uni.showToast({
        title: '登录过期请重新登录',
        icon: 'none',
        duration: 3939
      })
    }
  },
  methods: {
    //获取用户输入信息
    getUsername (e) {
      this.username = e.detail.value
      console.log(this.username);
    },
    getPassword (e) {
      this.password = e.detail.value
      console.log(this.password);
    },
    //登录提交
    loginClick () {
      if (this.username && this.password) {
        request({
          url: '/signin/match',
          data: {
            data: this.username,
            pwd: this.password
          },
          method: 'post'
        }).then((res) => {
          console.log(res)
          let status = res.data.status
          if ( status === 200) {
            this.showtips = 'none'
            let result = res.data.back
            //登录成功 本地存储用户信息
            try {
              uni.setStorageSync('user', {'id': result.id, 'name': result.name, 'imgurl': result.imgurl, 'token': result.token})
            } catch (e) {
              console.log('数据存储出错');
            }
            uni.navigateTo({ url: '../index/Index' })
          } else if ( status === 400 ) {
            console.log('失败');
            //用户匹配shibai
            this.showtips = 'block'
            this.password = ''
          } else if ( status === 500 ) {
            uni.showToast({
              title: '服务器出错',
              icon: 'none',
              duration: 3939
            })
          }
        })
      }
    }
  }
};
</script>

<style scoped>
.signin {
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: var(--status-bar-height);
  position: relative;
}

.logo image {
  position: absolute;
  top: 256rpx;
  left: 50%;
  transform: translate(-50%, 0);
  width: 399rpx;
  height: 92rpx;
}

.main {
  padding: 0 30rpx;
  width: 100%;
}

.title {
  margin-top: 450rpx;
  font-size: 48rpx;
  font-weight: 500;
  color: #2c3e50;
}
.slogan {
  font-size: 39rpx;
  color: #34495e;
  padding-top: 40rpx;
}
.inputs {
  padding-top: 8rpx;
}

.inputs input {
  padding-top: 40rpx;
  height: 88rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: #2c3e50;
  line-height: 88rpx;
  border-bottom: 1px solid #95a5a6;
}

.submit {
  margin-top: 128rpx;
  margin-left: 85rpx;
  background-color: #bdc3c7;
  width: 520rpx;
  height: 96rpx;
  box-shadow: 0px 50rpx 32rpx -36rpx rgba(189, 195, 199, 0.4);
  border-radius: 48rpx;
  font-size: 40rpx;
  font-weight: 500;
  color: #2c3e50;
  line-height: 96rpx;
  text-align: center;
}

.tips {
  float: left;
  line-height: 56rpx;
  color: #e74c3c;
}

.readytologin {
  background-color: #f1c40f;
  box-shadow: 0px 50rpx 32rpx -36rpx rgba(255, 228, 49, 0.7);
}
</style>