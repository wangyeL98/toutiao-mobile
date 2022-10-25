<template>
  <div class="save-container">
    <van-icon
      :name="isCollect ? 'star' : 'star-o'"
      @click="save"
      :color="isCollect ? '#ffa500' : '#777' "
    />
  </div>
</template>

<script>
import { deSaveArticle, saveArticle } from '@/api/user'
export default {
  name: 'SaveIndex',
  data () {
    return {
      sname: 'star-o'
    }
  },
  model: {
    prop: 'isCollect',
    event: 'change'
  },
  // props: ['articleId', 'isCollect'],
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    isCollect: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async save () {
      try {
        if (this.isCollect) {
          await deSaveArticle(this.articleId)
          this.$toast('取消收藏')
        } else {
          await saveArticle(this.articleId)
          this.$toast('收藏成功')
        }
        this.$emit('change', !this.isCollect)
      } catch (err) {
        this.$toast('错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
// @import "./github-markdown.css";
// .save-container{
//     .van-icon-star-o {
//         font-size: 20px;
//     }
// }
</style>
