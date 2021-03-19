<template>
  <div class="chat-bottom">
    <div class="submit-chat">
      <div class="bt-img" @click="changeRecord">
        <image :src="toc" />
      </div>
      <textarea
        auto-height="true"
        class="chat-text btn"
        :class="{ displaynone: isrecord }"
        @input="inputs"
        v-model="msg"
        @focus="textareaFocus"
      />
      <div
        class="record btn"
        :class="{ displaynone: !isrecord }"
        @touchstart="touchstart"
        @touchend="touchend"
      >
        按住说话
      </div>
      <div class="bt-img" @click="changeEmoji">
        <image src="~static/img/assets/bq.png" />
      </div>
      <div class="bt-img" @click="changeMore">
        <image src="~static/img/assets/tj.png" />
      </div>
    </div>
    <div class="emoji" :class="{ displaynone: !isemoji }">
      <div class="emoji-send">
        <div class="emoji-del-bt" @click="emojiBackspace">
          <image src="~static/img/assets/backspace.png" class="backspaceimg" />
        </div>
        <div class="emoji-send-bt" @click="emojiSend">发送</div>
      </div>
      <chat-bottom-eomjis @emotion="emotion"></chat-bottom-eomjis>
    </div>
    <div class="more" :class="{ displaynone: !ismore }">
      <div class="more-list" @click="sendImg('album')">
        <image src="~static/img/assets/tupian.png" />
        <div class="more-list-title">图片</div>
      </div>
      <div class="more-list" @click="sendImg('camera')">
        <image src="~static/img/assets/tupian.png" />
        <div class="more-list-title">图片</div>
      </div>
      <div class="more-list">
        <image src="~static/img/assets/tupian.png" />
        <div class="more-list-title">图片</div>
      </div>
      <div class="more-list">
        <image src="~static/img/assets/tupian.png" />
        <div class="more-list-title">图片</div>
      </div>
      <div class="more-list">
        <image src="~static/img/assets/tupian.png" />
        <div class="more-list-title">图片</div>
      </div>
    </div>
  </div>
</template>

<script>

import ChatBottomEomjis from './ChatBottomEomjis'
//不好使
const recorderManager = uni.getRecorderManager()
export default {
  name: 'ChatBottom',
  components: { ChatBottomEomjis },
  data() {
    return {
      isrecord: false,
      isemoji: false,
      ismore: false,
      toc: '../../static/img/assets/yy.png',
      msg: '',
      timer: '',
      vlength: 0
    }
  },
  methods: {
    //获取模块高度
    getElementHeight() {
      const query = uni.createSelectorQuery().in(this)
      query.select('.chat-bottom').boundingClientRect(data => {
        this.$emit('heights', data.height)
      }).exec()
    },
    changeRecord() {
      this.isemoji = false
      this.ismore = false
      if (this.isrecord) {
        this.toc = '../../static/img/assets/yy.png'
        this.isrecord = false
      } else {
        this.toc = '../../static/img/assets/keyboard.png'
        this.isrecord = true  
      }
    },
    changeEmoji() {
      this.ismore = false
      this.isrecord = false
      this.toc = '../../static/img/assets/yy.png'
      this.isemoji = !this.isemoji
      setTimeout(() => {
        this.getElementHeight()
      },20)  
    },
    changeMore() {
      this.isemoji = false
      this.ismore = !this.ismore
      setTimeout(() => {
        this.getElementHeight()
      },20) 
    },
    emotion (e) {
      this.msg = this.msg + e
    },
    //文字输入
    inputs(e) {
      let chatm = e.detail.value
      let pos = chatm.indexOf('\n')
      if (pos !== -1 && chatm.length > 1) {
        this.send(this.msg, 0)
      } 
    },
    textareaFocus() {
      this.isemoji = false
      this.ismore = false
      setTimeout(() => {
        this.getElementHeight()
      },20) 
    },
    emojiSend() {
      if ( this.msg.length > 0) {
        this.send(this.msg, 0)
      }
    },
    emojiBackspace() {
      if (this.msg.length > 0) {
        this.msg = this.msg.substring(0, this.msg.length - 1)
      }
    },
    //图片发送
    sendImg (e) {
      let count = 9
      if (e === 'album') count = 9
      else count = 1
      uni.chooseImage({
        count,
        sizeType: ['original', 'compressed'],
        sourceType: [e],
        success: (res) => {
          const filepaths = res.tempFilePaths
          for (let i = 0; i < filepaths.length; i++) {
            this.send(filepaths[i], 1)
          }
        },
        //fail: (error) => {}
      })
    },
    //音频处理
    touchstart () {
      console.log('开始');
      let i = 1
      this.timer = setInterval(() => {
        this.vlength = i
        i++
        console.log(i)
      }, 1000);
      recorderManager.start()
    },
    touchend () {
      console.log('结束');
      clearInterval(this.timer)
      recorderManager.stop()
      recorderManager.onStop((res) => {
        console.log('recorder stop' + JSON.stringify(res));
        const data = {
          voice: res.tempFilePaths,
          time: this.vlength
        }
        this.send(data, 2)
      })
    },
    send (msg, types) {
      const data = {
        message: msg,
        types: types,
      }
      this.$emit('inputs', data)
      setTimeout(() => {
        this.msg = ''
      }, 0);
    }
  }
}
</script>

<style scoped>
.chat-bottom {
  background-color: rgba(236, 240, 241, 0.97);
  border-top: 1px solid rgba(189, 195, 199, 1);
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  padding-bottom: env(safe-area-inset-bottom);
}

.submit-chat {
  width: 100%;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 14rpx 10rpx;
}
.submit-chat image {
  width: 62rpx;
  height: 62rpx;
  margin: 0 10rpx;
  padding-bottom: 6rpx;
  flex: 1;
}
.submit-chat .btn {
  flex: auto;
  background-color: #fff;
  border-radius: 8rpx;
  padding: 20rpx 20rpx;
  margin: 0 10rpx;
  font-size: 36rpx;
  line-height: 46rpx;
}
.record {
  text-align: center;
  font-size: 36rpx;
  color: rgba(127, 140, 141, 1);
}
.displaynone {
  display: none;
}
.emoji {
  width: 100%;
  height: 460rpx;
  background-color: rgba(236, 237, 238, 1);
  box-shadow: 0rpx -1rpx 0rpx 0rpx rgba(0, 0, 0, 0.1);
}
.emoji-send {
  width: 360rpx;
  height: 104rpx;
  padding-top: 24rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: rgba(236, 237, 238, 0.8);
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
}
.emoji-send-bt {
  flex: 1;
  margin: 0 20rpx 0 10rpx;
  width: 120rpx;
  height: 80rpx;
  background-color: rgba(241, 196, 15, 1);
  font-size: 32rpx;
  text-align: center;
  line-height: 80rpx;
  border-radius: 10rpx;
}
.emoji-del-bt {
  flex: 1;
  margin: 0 10rpx 0 20rpx;
  width: 120rpx;
  height: 80rpx;
  background-color: rgba(189, 195, 199, 1);
  /* font-size: 32rpx; */
  text-align: center;
  /* line-height: 80rpx; */
  border-radius: 10rpx;
}
.emoji-del-bt image {
  margin-top: 12rpx;
  margin-right: 4rpx;
  width: 60rpx;
  height: 60rpx;
}

.more {
  width: 100%;
  height: 460rpx;
  background-color: rgba(236, 237, 238, 1);
  box-shadow: 0rpx -1rpx 0rpx 0rpx rgba(0, 0, 0, 0.1);
  padding-bottom: env(safe-area-inset-bottom);
  padding: 20rpx;
  box-sizing: border-box;
}

.more .more-list {
  float: left;
  width: 25%;
  text-align: center;
  padding-top: 24rpx;
}
.more .more-list image {
  width: 66rpx;
  height: 66rpx;
  padding: 32rpx;
  background-color: #fff;
  border-radius: 10rpx;
}
.more-list-title {
  font-size: 32rpx;
  color: #2c3e50;
  line-height: 39rpx;
}
</style>