<template>
  <div class="article_box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="msg"
        :success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <Article :arr="list"></Article>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Article from '@/components/article-item'
import { article } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: { Article },
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timer: null,
      error: false,
      isLoading: false,
      msg: '刷新成功'
    }
  },
  methods: {
    async onRefresh () {
      //   this.isLoading = false
      try {
        const { data } = await article({
          channel_id: this.obj.id,
          timestamp: Date.now()
        })
        const { results } = data.data
        // console.log(results)
        this.list.unshift(...results)
        this.isLoading = false
      } catch (err) {
        this.msg('刷新失败')
      }
    },
    async onLoad () {
      try {
        const { data } = await article({
          channel_id: this.obj.id,
          timestamp: this.timer || Date.now()
        })
        const { results } = data.data
        // console.log(results)
        // if (Math.random() > 0.3) {
        //   JSON.parse('ddddd')
        // }
        this.list.push(...results)
        this.loading = false

        if (results.length) {
          this.timer = Date.parse(results.pubdate)
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less">
.article_box {
    height: 79vh;
    overflow-y: auto;
}
</style>
