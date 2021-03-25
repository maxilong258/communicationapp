<template>
  <div class="chat-page">
    <chat-nav :fname="fname"></chat-nav>
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
          :id="'msg' + item.id"
        >
          <div class="chat-time" v-if="item.time != ''">
            {{ changeTime(item.time) }}
          </div>
          <div class="msg-m msg-left" v-if="item.fromId != storagevalue.id">
            <image :src="item.imgurl" class="user-img" />
            <div class="message" v-if="item.types == 0">
              <div class="msg-text">
                {{ item.message }}
              </div>
            </div>
            <div
              class="message"
              v-if="item.types == 1"
              @click="previewImg(item.massage)"
            >
              <image :src="item.message" mode="widthFix" class="msg-img" />
            </div>
            <div class="message" v-if="item.types == 2">
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
          <div class="msg-m msg-right" v-if="item.fromId == storagevalue.id">
            <image :src="item.imgurl" class="user-img" />
            <div class="message" v-if="item.types == 0">
              <div class="msg-text">
                {{ item.message }}
              </div>
            </div>
            <div
              class="message"
              v-if="item.types == 1"
              @click="previewImg(item.message)"
            >
              <image :src="item.message" mode="widthFix" class="msg-img" />
            </div>
            <div class="message" v-if="item.types == 2">
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
import dateHandler from 'common/js/dateHandler'
import { request } from 'network/request'

export default {
  name: 'Chat',
  components: { 
    ChatNav,
    ChatBottom
  },
  data() {
    return {
      storagevalue: {},
      fid: '',
      fname: '',
      fimgurl: '',
      inputh: 60,
      msgs: [],
      imgmsgs:[],
      scrolltoview: '',
      oldTime: 0,
      animationData: {},
      nowpage: 0,              //页码
      pagesize: 39,            //一页条数
      loading: '',
      isloading: true,
      beginloading: false
    }
  },
  onLoad(e) {
    this.fid = e.id
    this.fname = e.name
    this.fimgurl = e.img
    this.getStorages()
    this.getMsg(this.nowpage)
    this.receiveSocketMsg()
    //this.updateMessagestate()
    this.nextPage()
  },
 

  methods: {
    // updateMessagestate () {
    //   request({
    //     url: '/chat/updatemsg',
    //     data: {
    //       uid: this.storagevalue.id,
    //       fid: this.fid
    //     },
    //     method: 'post'
    //   }).then((res) => {
    //     console.log(res);
    //   })
    //   request({
    //     url: '/chat/updatemsg',
    //     data: {
    //       uid: this.fid,
    //       fid: this.storagevalue.id,
    //     },
    //     method: 'post'
    //   }).then((res) => {
    //     console.log(res);
    //   })
    // },
    getStorages() {
      try {
        const value = uni.getStorageSync('user')
        if (value) {
          this.storagevalue = value
        } else {
          uni.navigateTo({ url: '/pages/signin/Signin' })
        }
      } catch (e) {
          
      }
    },
    changeTime(date){
      return dateHandler.dateTime(date)
    },
    getMsg () {
      request({
        url: '/chat/msg',
        data: {
          uid: this.storagevalue.id,
          fid: this.fid,
          nowPage: this.nowpage,
          pageSize: this.pagesize,
          token: this.storagevalue.token
        },
        method: 'post'
      }).then((res) => {
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          result.reverse()
          let oldtime = result[0].time
          let imgarr = []
          for (let item of result) {
            item.imgurl = this.serverUrl + item.imgurl
            if(item.types == 1) {
              item.message = this.serverUrl + item.message
              imgarr.push(item.message)
            }
          }
          for (let i = 1; i < result.length; i++) {
            if (i < result.length - 1) {
              let t = dateHandler.spaceTime(oldtime, result[i].time)
              if (t) oldtime = t
              result[i].time = t
            }
            if (this.nowpage == 0) {
              if (result[i].time > this.oldTime) this.oldTime = result[i].time
            }
          }
          this.msgs = result.concat(this.msgs)
          this.imgmsgs = imgarr.concat(this.imgmsgs)
          if(result.length === this.pagesize) this.nowpage++
          else this.nowpage = -1
          this.$nextTick(function(){
            this.scrolltoview = 'msg' + this.msgs[result.length - 1].id
          })
          clearInterval(this.loading)
          this.isloading = false
          this.beginloading = false
        }   
      })
      
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
    receiveSocketMsg () {
      this.socket.on('msg', (msg, fromid, tip) => {
        if (fromid === this.fid && tip === 0) {
          let len = this.msgs.length
          let nowTime = new Date()
          let t = dateHandler.spaceTime(this.oldTime, nowTime)
          if (t) this.oldTime = t 
          if (msg.types == 1 || msg.types == 2) msg.message = this.serverUrl + msg.message
          nowTime = t
          const data = {
            fromId: fromid,
            imgurl: this.fimgurl,
            message: msg.message,
            types: msg.types,
            time: nowTime,
            id: len
          }
          this.msgs.push(data)
          if (msg.types == 1) this.imgmsgs.push(msg.message)
          this.$nextTick(() => {
            this.scrolltoview = 'msg'+ len
          })
        }  
      })
    },

    receiveMsg(e, id, img, tip) {
      //tip == 0 表示自己发的  tip == 1
      let len = this.msgs.length
      let nowTime = new Date()
      let t = dateHandler.spaceTime(this.oldTime, nowTime)
      if (t) this.oldTime = t 
      nowTime = t
      let data = {
        fromId: id,
        imgurl: img,
        message: e.message,
        types: e.types,
        time: nowTime,
        id: len
      }
      this.msgs.push(data),
      this.$nextTick(() => {
        this.scrolltoview = 'msg'+ len
      })
      if (e.types == 0 || e.types == 3) this.sendSocket(e)
      if (e.types == 1) {
        this.imgmsgs.push(e.message)
        let url = dateHandler.fileName(new Date())
        const uploadTask = uni.uploadFile({
          url: this.serverUrl + '/files/upload', //仅为示例，非真实的接口地址
          filePath: e.message,
          name: 'file',
          formData: {
            url: url,
            name: new Date().getTime() + this.storagevalue.id + Math.round(Math.random())
          },
          success: (uploadFileRes) => {
            console.log(uploadFileRes);
            const data = {
              message: uploadFileRes.data,
              types: e.types
            }
            this.sendSocket(data)
            //let path = this.serverUrl + uploadFileRes.data
            // this.img.push(path)
            //console.log(uploadFileRes.data);
          }
        });
        uploadTask.onProgressUpdate((res) => {
          // console.log('上传进度' + res.progress);
          // console.log('已经上传的数据长度' + res.totalBytesSent);
          // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
          // 测试条件，取消上传任务。
          // if (res.progress > 50) {
          //   uploadTask.abort();
          // }
        });
      }
      if (e.types == 2) {
        this.imgmsgs.push(e.message)
        let url = dateHandler.fileName(new Date())
        const uploadTask = uni.uploadFile({
          url: this.serverUrl + '/files/upload', //仅为示例，非真实的接口地址
          filePath: e.message.voice,
          name: 'file',
          formData: {
            url: url,
            name: new Date().getTime() + this.storagevalue.id + Math.round(Math.random())
          },
          success: (uploadFileRes) => {
            console.log(uploadFileRes);
            const data = {
              message: uploadFileRes.data,
              types: e.types
            }
            this.sendSocket(data)
            //let path = this.serverUrl + uploadFileRes.data
           // this.img.push(path)
            //console.log(uploadFileRes.data);
          }
        });
        uploadTask.onProgressUpdate((res) => {
          // console.log('上传进度' + res.progress);
          // console.log('已经上传的数据长度' + res.totalBytesSent);
          // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
          // 测试条件，取消上传任务。
          // if (res.progress > 50) {
          //   uploadTask.abort();
          // }
        });
      }
      
    },
    sendSocket (e) {
      this.socket.emit('msg', e, this.storagevalue.id, this.fid)
    },
    inputs (e) {
      this.receiveMsg(e, this.storagevalue.id, this.serverUrl + this.storagevalue.imgurl, 0)
    },
    heights(height) {
      this.inputh = height
      this.goBottom()
    },
    goBottom() {
      this.scrolltoview = ''
      this.$nextTick(() => {
        let len = this.msgs.length-1
        this.scrolltoview = 'msg' + this.msgs[len].id
      })
    }
  }
}
</script>

<style scoped>
.chat {
  height: 100vh;
  background-color: #ecf0f1;
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