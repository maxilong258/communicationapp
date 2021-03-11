<template>
  <div class="chat-bottom-eomjis">
    <div class="emoji-line" v-for="(line, i) in emoji" :key="i">
      <div
        class="emoji-line-item"
        v-for="(item, index) in line"
        :key="index"
        @click="clickEmoji(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBottomEomjis',
  data() {
    return {
      emoji: [
        ['😀','😁','😂','🤣','😃','😅','😆','😉'],
        ['😊','😋','😎','😍','😘','😗','😙','😚'],
        ['🙂','🤗','🤔','😐','🙄','😏','😣','😥'],
        ['😮','🤐','😯','😪','😫','😴','😌','😛'],
        ['😜','😝','🤤','😒','😓','😔','😕','🙃'],
        ['🤑','😲','🙁','😖','😞','😟','😤','😢'],
        ['😭','😦','😧','😨','😩','😬','😰','😱'],
      ]
    }
  },
  methods: {
    clickEmoji (e) {
      this.$emit('emotion', e)
    }
  }
}
</script>

<style scoped>
.chat-bottom-eomjis {
  width: 100%;
  height: 460rpx;
  padding: 10rpx;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 132rpx;
}
.emoji-line {
  text-align: center;
  display: flex;
}
.emoji-line-item {
  margin: 25rpx 10rpx;
  flex: 1;
}
</style>