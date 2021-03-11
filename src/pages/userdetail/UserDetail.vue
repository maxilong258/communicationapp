<template>
  <div class="user-detail">
    <user-detail-nav></user-detail-nav>
    <div class="main">
      <div class="column heads">
        <div class="row head">
          <div class="title">头像</div>
          <div class="cont">
            <image-cropper
              :src="tempFilePath"
              @confirm="confirm"
              @cancel="cancel"
            ></image-cropper>

            <image :src="cropFilePath" @tap="upload" class="user-img"></image>
          </div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row" @click="modify('签名', fakedataarr.sign, false)">
          <div class="title">签名</div>
          <div class="cont">{{ fakedataarr.sign }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row">
          <div class="title">注册</div>
          <div class="cont">{{ fakedataarr.register }}</div>
        </div>
      </div>

      <div class="column">
        <div class="row" @click="modify('昵称', fakedataarr.name, false)">
          <div class="title">昵称</div>
          <div class="cont">{{ fakedataarr.name }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row">
          <div class="title">性别</div>
          <div class="cont">
            <picker
              @change="bindPickerChange"
              :value="sexpickerindex"
              :range="sexpickerarray"
            >
              <view class="uni-input">{{
                sexpickerarray[sexpickerindex]
              }}</view>
            </picker>
          </div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row">
          <div class="title">生日</div>
          <div class="cont">
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
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row" @click="modify('昵称', fakedataarr.tell, false)">
          <div class="title">电话</div>
          <div class="cont">{{ fakedataarr.tell }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
        <div class="row" @click="modify('昵称', fakedataarr.mall, true)">
          <div class="title">邮箱</div>
          <div class="cont">{{ fakedataarr.mall }}</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
      </div>
      <div class="column">
        <div class="row" @click="modify('昵称', 2333, true)">
          <div class="title">密码</div>
          <div class="cont">********</div>
          <div class="edit"><image src="~static/img/assets/edit.png" /></div>
        </div>
      </div>
      <div class="exitBtn">退出登录</div>
    </div>
    <!-- -------------------------------------------------------------------------------------------------- -->
    <view
      class="modify"
      :style="{ bottom: -+widheight + 'px' }"
      :animation="animationData"
    >
      <div class="modify-header">
        <div class="modify-header-close" @click="modify">取消</div>
        <div class="modify-header-title">{{ "modifytitle" }}</div>
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
import ImageCropper from '../../components/common/ling-imgcropper/ling-imgcropper'
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
      //模拟数据
      fakedataarr: {
        name: '大伊万',
        sign: '今天，甚至过去，大多数人都是由自己来设计他们的职业生涯的。无论你正要启程，还是已经奋斗多年，以下内容都会对您的职业生涯有所助益。',
        register: new Date(),
        sex: '男',
        birth: '1997-10-10',
        tell: '34232543232',
        mall: 'shckjhe@nl.com'
      },
      sexpickerarray: ['男', '女', '未知'],
      sexpickerindex: 0,
      date: currentDate,
      tempFilePath: "",
      cropFilePath: "../../static/img/user/7.png",
      ispwd1: '',
      pwd: '',
      modifymaintext: '',
      ismodify: false,
      animationData: {},
      widheight: '',
      modifytitle: ''
    }
  },
  computed: {
    startDate() {
      return this.getDate('start');
    },
    endDate() {
      return this.getDate('end');
    }
  },
  mounted() {
    this.getElementStyle()
  },
  methods: {
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.target.value)
      this.index = e.target.value
    },
    bindDateChange: function(e) {
      this.date = e.target.value
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

      // #ifdef APP-PLUS||MP
      //除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
      //按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
      //待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了

      uni.uploadFile({
        url: "后端地址上传图片接口地址",
        filePath: this.cropFilePath,
        name: "file",
        fileType: "image",
        //formData:{},传递参数
        success: (uploadFileRes) => {
          var backstr = uploadFileRes.data;
          //自定义操作
        },

        fail(e) {
          console.log("this is errormes " + e.message);
        },
      });

      // #endif
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
      } else {
        this.ispwd1 = 'none'
      }
      this.ispwd = ispwd
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