<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      @click="post"
      :disabled='!message.length'
    >发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
export default {
  name: 'PostComment',
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    art_id: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async post () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await postComment({
          target: this.articleId.toString(),
          content: this.message,
          art_id: this.art_id
        })

        this.message = ''
        // console.log(data.data)
        this.$emit('changeData', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
