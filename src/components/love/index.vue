<template>
  <div class="love-container">
    <van-icon
    :color="attitude===1 ? 'red' : '#777' "
    :name="attitude===1 ? 'good-job' : 'good-job-o' "
    @click="love"
    />
  </div>
</template>

<script>
import { loveArticle, deLoveArticle } from '@/api/user'
export default {
  model: {
    prop: 'attitude',
    event: 'change'
  },
  name: 'LoveIndex',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    attitude: {
      type: Number,
      required: true
    }

  },
  methods: {
    async love () {
      try {
        if (this.attitude === 1) {
          await deLoveArticle(this.articleId)
          this.$toast('取消点赞')
          this.$emit('change', 0)
        } else {
          await loveArticle(this.articleId)
          this.$toast('点赞成功')
          this.$emit('change', 1)
        }
      } catch (err) {
        this.$toast('错误')
      }
    }
  }
}
</script>

<style>

</style>
