<template>
  <div class="chat-page">
    <chat-nav></chat-nav>
    <scroll-view
      scroll-y="true"
      :scroll-into-view="scrolltoview"
      class="chat"
      @scrolltoupper="nextPage"
    >
      <div class="chat-main" :style="{ paddingBottom: inputh + 'px' }">
        <div class="loading" :class="{ displaynone: !isloading }">
          <image
            src="~static/img/assets/loading.png"
            class="loading-img"
            :animation="animationData"
          />
        </div>
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
            <div class="message" v-if="item.types === 2">
              <div
                class="msg-text voice"
                :style="{ width: item.message.time * 4 + 'px' }"
                @click="playVoice(item.message.voice)"
              >
                <image src="~static/img/assets/voice.png" class="voice-img" />
                {{ item.message.time + "s" }}
              </div>
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
            <div class="message" v-if="item.types === 2">
              <div
                class="msg-text voice"
                :style="{ width: item.message.time * 4 + 'px' }"
                @click="playVoice(item.message.voice)"
              >
                {{ item.message.time + "s" }}
                <image src="~static/img/assets/voice.png" class="voice-img" />
              </div>
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
      oldTime: new Date(),
      animationData: {},
      nowpage: 0,
      loading: '',
      isloading: true,
      beginloading: false
    }
  },
  onLoad() {
    this.getMsg(this.nowpage)
    //this.nextPage()
  },
 

  methods: {
    changeTime(date){
      return dateHandler.dateTime(date)
    },
    getMsg(page) {
      this.nowpage++
      const msg = fakedata.fmessage()
      let maxpages = msg.length
      if (msg.length > (page + 1) * 10){
        maxpages = (page + 1) * 10
      } else {
        this.nowpage = -1
      }

      for (var i = page*10; i < maxpages; i++) {  
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
        this.scrolltoview = 'msg' + this.msgs[maxpages - page * 10 - 1].tip
      })
      clearInterval(this.loading)
      this.isloading = false
      this.beginloading = false
    },
    nextPage () {
      if (this.nowpage > 0 && !this.beginloading) {
        this.isloading = true
        this.beginloading = true
        var animation = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease'
        })

        this.animation = animation
        let i = 1
        this.loading = setInterval(() => {
          animation.rotate(i*30).step()
          this.animationData = animation.export()
          i++
          if (i > 10) {
            this.getMsg(this.nowpage)
          }
        }, 100)
      }  
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
    //音频播放
    playVoice (e) {
      const innerAudioContext = uni.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = e
      innerAudioContext.onPlay(() => {
        console.log('开始播放');
      })
    },
    inputs(e) {
      let len = this.msgs.length
      let data = {
        id: 'b',
        imgUrl: '../../static/img/user/3.png',
        message: e.message,
        types: e.types,
        time: new Date(),
        tip: len
      }
      this.msgs.push(data),
      this.$nextTick(() => {
        this.scrolltoview = 'msg'+ len
      })
      if(e.types === 1) this.imgmsgs.push(e.message)
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
.loading {
  text-align: center;
}
.loading image {
  width: 39rpx;
  height: 39rpx;
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

.msg-left .voice {
  width: 200rpx;
  text-align: right;
  min-width: 100rpx;
  max-width: 399rpx;
}
.msg-left .voice-img {
  width: 46rpx;
  height: 40rpx;
  vertical-align: middle;
  padding-top: 2rpx;
  float: left;
}
.msg-right .voice {
  width: 200rpx;
  text-align: left;
  min-width: 100rpx;
  max-width: 399rpx;
}
.msg-right .voice-img {
  width: 46rpx;
  height: 40rpx;
  vertical-align: middle;
  float: right;
  transform: rotate(180deg);
  padding-bottom: 2rpx;
}
.displaynone {
  display: none;
}
</style>