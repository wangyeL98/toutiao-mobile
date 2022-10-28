<template>
  <div class="res-comment">
    <!-- 标题栏 -->
    <van-nav-bar>
      <span slot="title">{{
        item.reply_count > 0 ? item.reply_count + "条回复" : "暂无回复"
      }}</span>
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- 标题栏 -->

    <div class="fix">
      <!-- 回复人的资料 -->
      <commentUser :item="item"></commentUser>
      <!-- 回复人的资料 -->

      <!-- 回复的内容 -->
      <van-cell title="全部回复" />
      <commentList
        :articleId="item.com_id"
        type="c"
        :list="replyComment"
      ></commentList>
      <!-- 回复的内容 -->
    </div>

    <!-- 底部按钮 -->
    <div class="btn">
      <van-button @click="isShow = true">点击回复</van-button>
    </div>
    <!-- 底部按钮 -->

    <!-- 发布回复 -->
    <van-popup v-model="isShow" position="bottom">
      <PostComment
        :articleId="item.com_id"
        @changeData="changeFn"
        :art_id="articleId"
      ></PostComment>
    </van-popup>
    <!-- 发布回复 -->
  </div>
</template>

<script>
import PostComment from './post-comment.vue'
import commentList from '@/components/comment/index'
import commentUser from '@/components/comment/component/index'
export default {
  name: 'ResponseComment',
  components: {
    commentUser,
    commentList,
    PostComment
  },
  data () {
    return {
      isShow: false,
      replyComment: []
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    changeFn (data) {
      this.isShow = false
      this.item.reply_count++
      this.replyComment.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  height: 88px;
  // background: orange;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  .van-button {
    width: 70%;
    border-radius: 5px;
    background: #eee;
  }
}
// .fix{
//   position: fixed;
//   top: 0;
//   bottom: 88px;
//   overflow-y: auto;
//   left: 0;
//   right: 0;
//   // z-index: 111;
// }
</style>
