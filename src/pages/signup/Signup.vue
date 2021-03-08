<template>
  <div class="signup">
    <signup-nav-bar></signup-nav-bar>

    <div class="logo">
      <image src="~static/img/main/logooo.png" mode="scaleToFill" />
    </div>

    <div class="main">
      <div class="title">注册</div>
      <div class="inputs">
        <div class="inputs-div">
          <input
            type="text"
            placeholder="请输入昵称"
            class="username"
            placeholder-style="color:#999;font-weight:400;"
            @input="registerGetUsername"
          />
          <div class="employ" v-if="isnameinuse">昵称已被占用</div>
          <image
            src="~static/img/assets/ok.png"
            mode="scaleToFill"
            class="ok"
            v-if="!isnameinuse"
          />
        </div>
        <div class="inputs-div">
          <input
            type="text"
            placeholder="请输入邮箱"
            class="email"
            placeholder-style="color:#999;font-weight:400;"
            @input="registerGetEmail"
          />
          <div class="employ" v-if="isemailinuse">邮箱已被注册</div>
          <div class="inavlid" v-if="notemail">请输入正确的邮箱地址</div>
          <image
            src="~static/img/assets/ok.png"
            mode="scaleToFill"
            class="ok"
            v-if="!isemailinuse && !notemail"
          />
        </div>
        <div class="inputs-div">
          <input
            :type="type"
            placeholder="请输入密码"
            class="password"
            placeholder-style="color:#999;font-weight:400;"
            @input="registerGetPassword"
          />
          <image
            :src="lookUrl"
            mode="scaleToFill"
            class="eye-open"
            @click="changeLook"
          />
        </div>
      </div>
      <div
        class="submit"
        :class="{
          readytoregister:
            !isnameinuse && !isemailinuse && !notemail && password,
        }"
        @click="gotoregister"
      >
        <span>注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import SignupNavBar from "./childcomponents/SignupNavBar";
export default {
  name: "Signup",
  components: { SignupNavBar },
  data() {
    return {
      type: "password",
      isnameinuse: false,
      isemailinuse: false,
      notemail: false,
      eyeopen: true,
      lookUrl: '../../static/img/assets/eye-open.png',
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    //切换密码显示
    changeLook() {
      if (this.eyeopen) {
        this.type = 'text'
        this.eyeopen = !this.eyeopen
        this.lookUrl = '../../static/img/assets/eye-close.png'
      } else {
        this.type = 'password'
        this.eyeopen = !this.eyeopen
        this.lookUrl = '../../static/img/assets/eye-open.png'
      }
    },
    //验证输入
    registerGetUsername(e) {
      this.username = e.detail.value
      console.log(this.username);
    },
    registerGetEmail(e) {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      this.email = e.detail.value
      console.log(this.email)
      if (this.email.length > 0) {
        if (reg.test(this.email)){
          console.log('正确');
          this.notemail = false
        } else {
          console.log('不正确');
          this.notemail = true
        }
      }
    },
    registerGetPassword(e) {
      this.password = e.detail.value
      console.log(this.password);
    },
    //去注册
    gotoregister() {
      if(!this.isnameinuse && !this.isemailinuse && !this.notemail && this.password)
      console.log(this.username + ' ' + this.email + ' ' + this.password)
    }
  }
};
</script>

<style scoped>
.signup {
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
.inputs-div {
  position: relative;
}
.employ {
  position: absolute;
  top: -4rpx;
  right: 0;
  font-size: 30rpx;
  font-weight: 500;
  color: #e74c3c;
  line-height: 88px;
}

.inavlid {
  position: absolute;
  top: -4rpx;
  right: 0;
  font-size: 30rpx;
  font-weight: 500;
  color: #e74c3c;
  line-height: 88px;
}

.ok {
  position: absolute;
  top: 66rpx;
  right: 8rpx;
  height: 39rpx;
  width: 39rpx;
  line-height: 88px;
}

.eye-open {
  position: absolute;
  top: 56rpx;
  right: 0;
  height: 56rpx;
  width: 56rpx;
  line-height: 88px;
}
.readytoregister {
  background-color: #f1c40f;
  box-shadow: 0px 50rpx 32rpx -36rpx rgba(255, 228, 49, 0.7);
}
</style>