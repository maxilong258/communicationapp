<template>
  <div class="user-detail">
    <user-detail-nav></user-detail-nav>
    <div class="main">
      <div class="column heads">
        <div class="row head">
          <div class="title">头像</div>
          <div class="cont" v-if="id === uid">
            <image-cropper
              :src="tempFilePath"
              @confirm="confirm"
              @cancel="cancel"
            ></image-cropper>
            <image :src="cropFilePath" @tap="upload" class="user-img"></image>
          </div>
          <div class="cont" v-if="id !== uid">
            <image :src="cropFilePath" class="user-img"></image>
          </div>
          <div class="edit"><image src="~static/img/assets/edit.png" v-if="id === uid"/></div>
        </div>
        <div
          class="row"
          @click="modify('explain', user.explain, false)"
          v-if="id === uid"
        >
          <div class="title">签名</div>
          <div class="cont">{{ user.explain }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row" v-if="id !== uid">
          <div class="title">签名</div>
          <div class="cont">{{ user.explain }}</div>
        </div>
        <div class="row">
          <div class="title">注册</div>
          <div class="cont">
            {{ user.time | showDate }}
          </div>
        </div>
      </div>

      <div class="column">
        <div
          class="row"
          @click="modify('name', myname, false)"
          v-if="id === uid"
        >
          <div class="title">昵称</div>
          <div class="cont">{{ user.name }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div
          class="row"
          @click="modify('markname', markname, false)"
          v-if="id !== uid"
        >
          <div class="title">昵称</div>
          <div class="cont">{{ markname }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row">
          <div class="title">性别</div>
          <div class="cont">
            <picker
              @change="bindPickerChange"
              :value="sexpickerindex"
              :range="sexpickerarray"
              v-if="id === uid"
            >
              <view class="uni-input">{{
                sexpickerarray[sexpickerindex]
              }}</view>
            </picker>
            <view class="uni-input" v-if="uid !== id">{{
              sexpickerarray[sexpickerindex]
            }}</view>
          </div>
          <div class="edit">
            <image src="~static/img/assets/edit.png" v-if="id === uid">
          </div>
        </div>
        <div class="row" v-if="id === uid">
          <div class="title">生日</div>
          <div class="cont" >
            <picker
              mode="date"
              :value="date"
              :start="startDate"
              :end="endDate"
              @change="bindDateChange"
            >
              <view class="uni-input">{{ date }}</view>
            </picker>
          </div>
          <div class="edit"><image src="~static/img/assets/edit.png"></div>
        </div>
        <div class="row" v-if="id !== uid">
          <div class="title">生日</div>
          <div class="cont" >
            <view class="uni-input">{{ date }}</view>
          </div>
        </div>
        <div class="row" @click="modify('昵称', fakedataarr.tell, false)" v-if="id === uid">
          <div class="title">电话</div>
          <div class="cont">{{ user.phone }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row" v-if="id !==uid">
          <div class="title">电话</div>
          <div class="cont">{{ user.phone }}</div>
        </div>
        <div class="row" @click="modify('昵称', fakedataarr.mall, true)" v-if="id === uid">
          <div class="title">邮箱</div>
          <div class="cont">{{ user.email }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row" v-if="id !== uid">
          <div class="title">邮箱</div>
          <div class="cont">{{ user.email }}</div>
        </div>
      </div>
      <div class="column" v-if="id === uid">
        <div class="row" @click="modify('昵称', 2333, true)">
          <div class="title">密码</div>
          <div class="cont">********</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
      </div>
      <div class="exitBtn" v-if="id === uid">退出登录</div>
      <div class="exitBtn" v-if="id !== uid">删除好友</div>
    </div>
    <!-- -------------------------------------------------------------------------------------------------- -->
    <view
      class="modify"
      :style="{ bottom: -+widheight + 'px' }"
      :animation="animationData"
    >
      <div class="modify-header">
        <div class="modify-header-close" @click="modify">取消</div>
        <div class="modify-header-title">修改</div>
        <div class="modify-header-define" @click="modifySubmit">确定</div>
      </div>
      <div class="modify-main">
        <input
          type="text"
          v-model="pwd"
          class="modify-pwd"
          placeholder="请输入原密码"
          placeholder-style="color:#aaa;font-weight:400;"
          :style="{ display: ispwd1 }"
        />
        <textarea
          v-model="modifymaintext"
          class="modify-content"
          placeholder="输入修改的内容"
          placeholder-style="color:#aaa;font-weight:400;"
        />
      </div>
    </view>
  </div>
</template>

<script>
import UserDetailNav from './childcomponents/UserDetailNav.vue'
import ImageCropper from 'components/common/ling-imgcropper/ling-imgcropper'
import { request } from 'network/request'
import { formatDate } from 'common/js/utils'
export default { 
  name: 'UserDetail',
  components: { 
    UserDetailNav,
    ImageCropper
  },
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      id: '',
      uid: '',
      token: '',
      myname: '',
      markname: '',
      user: {},
      sexpickerarray: ['男', '女', '未知'],
      sexpickerindex: 0,
      date: currentDate,
      tempFilePath: "",
      headimg: '',
      cropFilePath: "../../static/img/user/7.png",
      ispwd1: '',
      pwd: '',
      modifymaintext: '',
      ismodify: false,
      animationData: {},
      widheight: '',
      modifytitle: '',
    }
  },
  computed: {
    startDate() {
      return this.getDate('start');
    },
    endDate() {
      return this.getDate('end');
    },
  },
  filters: {
    showDate: function(e) {
      const date = new Date(e)
      return formatDate(date, "yyyy-MM-dd hh:mm")
    }
  },
  onLoad(e) {
    this.id = e.id
    this.getStorages()
    this.getUser()
    this.getMarkname()
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
        console.log(this.storagevalue);
      } catch (e) {

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
        console.log(res)
        let status = res.data.status
        if (status === 200) {
          let result = res.data.result
          this.cropFilePath = this.serverUrl + result.imgurl;
          if (result.explain == undefined) result.explain = '这个人很懒，什么都没有留下'
          if (result.birth == undefined) this.date = '未知'
          else {
            this.date = formatDate(result.birth, 'yyyy-MM-dd')
          }
          if (result.phone == undefined) result.phone = '未知'
          if (this.markname.length === 0) this.markname = result.name
          
          this.sexJudge(result.sex);
          this.user = result
          console.log(this.user);
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
      if (e === 'female') this.index = 1
      else if (e === 'male') this.index = 0
      else this.index = 2
     },
    getMarkname () {
      if (this.id !== this.uid) {
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
            if(!typeof(result.markname) != undefined) this.markname = result.markname
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
      }
    },


    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.target.value)
      this.sexpickerindex = e.target.value
      let sex = ''
      if (this.sexpickerindex === 0) sex = 'male'
      else if(this.sexpickerindex === 1) sex = 'female'
      else sex = 'asexual' 
      this.update(sex, 'sex', undefined)
    },
    bindDateChange: function(e) {
      this.date = e.target.value
      this.update(this.date, 'birth', undefined)
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === 'start') {
        year = year - 60;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    },
    
      //图片裁剪插件
    upload() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (res) => {
          this.tempFilePath = res.tempFilePaths.shift();
        },
      });
    },
    confirm(e) {
      this.tempFilePath = "";
      this.cropFilePath = e.detail.tempFilePath;
      this.headimg = e.detail.tempFilePath

      uni.uploadFile({
        url: this.serverUrl + '/files/upload',
        fileType: 'image',
        filePath: this.headimg,
        name: 'file',
        formData: {
          url: 'user',
          name: this.uid,
          token: this.token
        },
        success: (uploadFileRes) => {
          let backstr = uploadFileRes.data
          console.log(backstr);
          //修改本地存储
          try {
            uni.setStorageSync('user', {'id': this.uid, 'name': this.myname, 'imgurl': backstr, 'token': token})
          } catch (e) {
            // console.log('数据存储出错');
          }
          this.update(backstr, 'imgurl', undefined)
        },
        fail: (error) => {}
      })
    },
    update (e, t, p) {
      request({
        url: '/user/update',
        data: {
          id: this.uid,
          data: e,
          type: t,
          password: p,
          token: this.token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
      })
    },
    updateFriendMarkname () {
      request({
        url: '/user/markname',
        data: {
          uid: this.uid,
          fid: this.id,
          token: this.token,
          name: this.modifymaintext
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
      })
    },

    cancel() {
      console.log("canceled");
      this.tempFilePath = "";
    },

    //获取页面高度
    getElementStyle () {
      const query = uni.createSelectorQuery().in(this);
      query.select('.modify').boundingClientRect(data => {
        console.log("得到布局位置信息" + JSON.stringify(data));
        console.log("节点离页面顶部的距离为" + data.top);
        this.widheight = data.height
      }).exec();
    },
    //修改项弹窗动画
    modify (type, data, ispwd) {
      if (ispwd) { 
        this.ispwd1 = 'block'
        this.ispwd = ispwd
      } else {
        this.ispwd1 = 'none'
        this.ispwd = undefined
        this.pwd = undefined
      }
      this.modifytitle = type
      this.modifymaintext = data
      this.ismodify = !this.ismodify
      var animation = uni.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      })
      if ( this.ismodify ) {
        animation.bottom(0).step()
      } else {
        animation.bottom(-this.widheight).step()
      }
      this.animationData = animation.export()
    },
    modifySubmit() {
      if (this.modifytitle == 'markname' && this.modifymaintext.length > 0) {
        this.updateFriendMarkname()
        this.markname = this.modifymaintext
        this.modify()
        return
      }

      if (this.modifymaintext.length > 0) {
        let type = this.modifytitle
        this.update(this.modifymaintext, type, this.ispwd )
        this.user[type] = this.modifymaintext
      }
      this.modify()
    }
  },
  
}
</script>

<style scoped>
.main {
  padding-top: 118rpx;
  display: flex;
  flex-direction: column;
}
.column {
  display: flex;
  flex-direction: column;
  padding-top: 12rpx;
  border-bottom: 1px solid #ecf0f1;
}

.row {
  display: flex;
  flex-direction: row;
  padding: 6rpx 0;
}
.head {
  height: 148rpx;
  display: flex;
  align-items: center;
}
.title {
  padding: 0 16rpx;
  font-size: 32rpx;
  color: #2c3e50;
  line-height: 112rpx;
}
.user-img {
  width: 104rpx;
  height: 104rpx;
  border-radius: 10rpx;
  margin-top: 30rpx;
}
.cont {
  width: 570rpx;
  padding-left: 16rpx;
  font-size: 32rpx;
  color: #7f8c8d;
  line-height: 112rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.edit {
  flex: none;
  height: 108rpx;
  display: flex;
  align-items: center;
}
.edit image {
  width: 39rpx;
  height: 39rpx;
}
.exitBtn {
  margin-top: 118rpx;
  text-align: center;
  font-size: 32rpx;
  color: rgba(255, 93, 91, 1);
  line-height: 88rpx;
  height: 88rpx;
}
.modify {
  position: fixed;
  z-index: 99999;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.modify-header {
  width: 100%;
  height: 88rpx;
  padding-top: var(--status-bar-height);
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ecf0f1;
}
.modify-header-close {
  padding-left: 32rpx;
  padding-right: 32rpx;
  font-size: 32rpx;
  color: #2c3e50;
  line-height: 88rpx;
}
.modify-header-title {
  flex: 1;
  text-align: center;
  font-size: 40rpx;
  color: #2c3e50;
  line-height: 88rpx;
}
.modify-header-define {
  padding-left: 32rpx;
  padding-right: 32rpx;
  font-size: 32rpx;
  color: #3498db;
  line-height: 88rpx;
}
.modify-main {
  display: flex;
  padding: 20rpx;
  flex-direction: column;
}
.modify-pwd {
  padding: 0rpx 20rpx;
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  height: 88rpx;
  background-color: rgba(243, 244, 246, 1);
  border-radius: 10rpx;
  margin-bottom: 32rpx;
  line-height: 88rpx;
  color: #2c3e50;
  font-size: 36rpx;
}
.modify-content {
  box-sizing: border-box;
  padding: 16rpx 20rpx;
  width: 100%;
  flex: 1;
  height: 386rpx;
  background-color: rgba(243, 244, 246, 1);
  border-radius: 10rpx;
  line-height: 44rpx;
  color: #2c3e50;
}
</style>