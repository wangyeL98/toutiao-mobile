<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="item.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{item.aut_name}}</div>
      <van-button
        class="like-btn"
        :class={like:item.is_liking}
        :loading="isLoading"
        :icon="item.is_liking ? 'good-job' : 'good-job-o'"
        @click = "loadingComment"
      >{{ item.like_count || '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{item.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{item.pubdate | dealtime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('open',item)"
        >回复 {{item.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { likeComment, deLikeComment } from '@/api/comment'

export default {
  name: 'CommentItem',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    async loadingComment () {
      this.isLoading = true
      try {
        if (this.item.is_liking) {
          await deLikeComment(this.item.com_id)
        } else {
          await likeComment(this.item.com_id)
        }
        this.item.is_liking = !this.item.is_liking
        this.item.is_liking ? this.item.like_count++ : this.item.like_count--
      } catch (err) {
        this.$toast('错误')
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.like{
        color:red
    }
  }
}
</style>
