<template>
  <div class="chat-page">
    <chat-nav></chat-nav>
    <scroll-view scroll-y="true" :scroll-into-view="scrolltoview" class="chat">
      <div class="chat-main" :style="{ paddingBottom: inputh + 'px' }">
        <div
          class="chat-ls"
          v-for="(item, index) in msgs"
          :key="index"
          :id="'msg' + item.tip"
        >
          <div class="chat-time" v-if="item.time != ''">
            {{ changeTime(item.time) }}
          </div>
          <div class="msg-m msg-left" v-if="item.id != 'b'">
            <image :src="item.imgUrl" class="user-img" />
            <div class="message" v-if="item.types === 0">
              <div class="msg-text">
                {{ item.message }}
              </div>
            </div>
            <div
              class="message"
              v-if="item.types === 1"
              @click="previewImg(item.massage)"
            >
              <image :src="item.message" mode="widthFix" class="msg-img" />
            </div>
          </div>
          <div class="msg-m msg-right" v-if="item.id == 'b'">
            <image :src="item.imgUrl" class="user-img" />
            <div class="message" v-if="item.types === 0">
              <div class="msg-text">
                {{ item.message }}
              </div>
            </div>
            <div
              class="message"
              v-if="item.types === 1"
              @click="previewImg(item.message)"
            >
              <image :src="item.message" mode="widthFix" class="msg-img" />
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <chat-bottom @inputs="inputs" @heights="heights"></chat-bottom>
  </div>
</template>

<script>
import ChatNav from './childcomponents/ChatNav'
import ChatBottom from './childcomponents/ChatBottom'
import fakedata from 'common/data/fakedata'
//import { formatDate } from 'common/js/utils'
import dateHandler from 'common/js/dateHandler'

export default {
  name: 'Chat',
  components: { 
    ChatNav,
    ChatBottom
  },
  data() {
    return {
      inputh: 60,
      msgs: [],
      imgmsgs:[],
      scrolltoview: '',
      oldTime: new Date()
    }
  },
  onLoad() {
    this.getMsg()
  },
 

  methods: {
    changeTime(date){
      return dateHandler.dateTime(date)
    },
    getMsg() {
      const msg = fakedata.fmessage()
      for (var i = 0; i < msg.length; i++) {  
        if (i < msg.length - 1) {
          let t = dateHandler.spaceTime(this.oldTime, msg[i].time)
          if(t) {
            this.oldTime = t
          }
          msg[i].time = t
        }
        
        //拼接图片地址
        msg[i].imgUrl = '../../static/img/user/' + msg[i].imgUrl
        if (msg[i].types === 1) {
          msg[i].message = '../../static/img/user/' + msg[i].message 
          this.imgmsgs.unshift(msg[i].message)
        }  
        this.msgs.unshift(msg[i])  
      }
      this.$nextTick(function(){
        this.scrolltoview = 'msg' + this.msgs[i-1].tip
      })
    },
    
    //预览图片

    previewImg(e) {
      let index = 0
      for (let i = 0; i < this.imgmsgs.length; i++){
        if (this.imgmsgs[i] === e) index = i
      }
      uni.previewImage({
          current: index,
          urls: this.imgmsgs,
          longPressActions: {
              itemList: ['发送给朋友', '保存图片', '收藏'],
              success: function(data) {
                  console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                  
              },
              fail: function(err) {
                  console.log(err.errMsg);
              }
          }
      })
    },
    inputs(msg) {
      let len = this.msgs.length
      let data = {
        id: 'b',
        imgUrl: '../../static/img/user/3.png',
        message: msg,
        types: 0,
        time: new Date(),
        tip: len
      }
      this.msgs.push(data),
      this.$nextTick(() => {
        this.scrolltoview = 'msg'+ len
      })
    },
    heights(height) {
      this.inputh = height
      this.goBottom()
    },
    goBottom() {
      this.scrolltoview = ''
      this.$nextTick(() => {
        let len = this.msgs.length-1
        this.scrolltoview = 'msg' + this.msgs[len].tip
      })
    }
  }
}
</script>

<style scoped>
.chat {
  height: 100vh;
}
.chat-main {
  padding-left: 32rpx;
  padding-right: 32rpx;
  padding-top: 100rpx;
  display: flex;
  flex-direction: column;
  background-color: #ecf0f1;
}

.chat-ls .chat-time {
  font-size: 24rpx;
  color: #95a5a6;
  line-height: 34rpx;
  padding: 20rpx 0;
  text-align: center;
}
.chat-ls .msg-m {
  display: flex;
  padding: 20rpx 0;
}
.user-img {
  height: 80rpx;
  width: 80rpx;
  border-radius: 10rpx;
}
.message {
  max-width: 480rpx;
}
.msg-text {
  font-size: 32rpx;
  color: #2c3e50;
  line-height: 44rpx;
  padding: 18rpx 24rpx;
}
.msg-img {
  max-width: 400rpx;
  border-radius: 10rpx;
}
.msg-left {
  flex-direction: row;
}
.msg-left .msg-img {
  margin-left: 16rpx;
}
.msg-right .msg-img {
  margin-right: 16rpx;
}
.msg-right {
  flex-direction: row-reverse;
}
.msg-left .msg-text {
  margin-left: 16rpx;
  background-color: #fff;
  border-radius: 0rpx 10rpx 10rpx 10rpx;
}

.msg-right .msg-text {
  margin-right: 16rpx;
  background-color: #f1c40f;
  border-radius: 10rpx 0rpx 10rpx 10rpx;
}
</style>