<template>
  <div>
    <div class="test" @click="upload">上传图片</div>
    <image v-for="(item, index) in img" :key="index" :src="item" />
  </div>
</template>

<script>
import myfun from 'common/js/dateHandler'
export default {
  name: 'Test',
  data() {
    return {
      id: '_jdaonwoidqawdwadaf',
      img: []
    }
  },
  methods: {
    upload () {
      const url = myfun.fileName(new Date)
      uni.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (chooseImageRes) => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        for (let i = 0; i < tempFilePaths.length; i++) {
          const uploadTask = uni.uploadFile({
            url: this.serverUrl + '/files/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              url: url,
              name: new Date().getTime() + this.id + i
            },
            success: (uploadFileRes) => {
              console.log(uploadFileRes);
              let path = this.serverUrl + uploadFileRes.data
              this.img.push(path)
              //console.log(uploadFileRes.data);
            }
          });

          uploadTask.onProgressUpdate((res) => {
            console.log('上传进度' + res.progress);
            console.log('已经上传的数据长度' + res.totalBytesSent);
            console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

            // 测试条件，取消上传任务。
            // if (res.progress > 50) {
            //   uploadTask.abort();
            // }
          });
        }
       
    }
});
    }
  }
}
</script>

<style scoped>
.test {
  text-align: center;
  font-size: 39px;
}
</style>