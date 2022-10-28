<template>
  <div >
    <van-nav-bar
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="success"
    >
      <span class="user_title" slot="title">{{ title }}</span>
    </van-nav-bar>

    <!-- 编辑内容 -->
    <div class="change_contain">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
    <!-- 编辑内容 -->
  </div>
</template>

<script>
import { fixUserInfo } from '@/api/user'
export default {
  name: 'Fix-username',
  props: {
    userObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      message: this.userObj.name,
      title: '昵称'
    }
  },
  methods: {
    async success () {
      await fixUserInfo({
        name: this.message
      })
      this.userObj.name = this.message
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.change_contain {
  margin-top: 20px;
  // width: 90%;
  display: flex;
  justify-content: center;
  .van-field {
    width: 95%;
  }
}
.user_title{
    color: #333 !important;
}
</style>
