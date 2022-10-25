<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="detailObj.aut_name">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ detailObj.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="detailObj.aut_photo"
          />
          <div slot="title" class="user-name">{{ detailObj.aut_name }}</div>
          <div slot="label" class="publish-date">{{ detailObj.pubdate }}</div>

          <Followed
            v-model="detailObj.is_followed"
            :aut_id="detailObj.aut_id"
            class="follow-btn"
          ></Followed>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="detailObj.content"
          ref="article"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论区域 -->
        <Comment
          :articleId="articleId"
          @allCount="count = $event.total_count"
          :list="postList"
        ></Comment>
        <!-- 评论区域 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="count" color="#777" />
          <!-- 收藏文章 -->
          <Save :articleId="articleId" v-model="detailObj.is_collected"></Save>
          <!-- 点赞文章 -->
          <Love :articleId="articleId" v-model="detailObj.attitude"></Love>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup
          v-model="isShow"
          position="bottom"

        >
          <PostComment :articleId="articleId" @changeData="chagneFn"></PostComment>
        </van-popup>
        <!-- 发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="statusd === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loading">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import Followed from '@/components/follow'
import { getDetails } from '@/api/details'
import { ImagePreview } from 'vant'
import Comment from '@/components/comment'
import Save from '@/components/save'
import Love from '@/components/love'
import PostComment from './components/post-comment.vue'
export default {
  name: 'ArticleIndex',
  components: { Followed, Save, Love, Comment, PostComment },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isLoading: true,
      detailObj: {},
      statusd: 0,
      count: 0,
      isShow: false,
      postList: []
      // sname: 'star-o',
      // gname: 'good-job-o'
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading()
  },
  mounted () {},
  methods: {
    async loading () {
      this.isLoading = true
      try {
        const { data } = await getDetails(this.articleId)
        // console.log(data.data)

        // 测试
        // if (Math.random() > 0.1) {
        //   JSON.parse('qqqqqq')
        // }

        this.detailObj = data.data

        // this.$nextTick(() => {
        //   this.checkpro()
        // })
        setTimeout(() => {
          this.checkpro()
        }, 10)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        if (err.response && err.response.status === 404) {
          this.statusd = 404
        }
        this.$toast('未知错误，请重新刷新')
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    checkpro () {
      const all = this.$refs.article
      const imgs = all.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = function () {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    chagneFn (data) {
      this.isShow = false
      this.postList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
