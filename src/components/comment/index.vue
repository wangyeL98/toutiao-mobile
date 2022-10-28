<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync='error'
    error-text='错误'
    :immediate-check="false"
  >
    <Comment
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      @open="$emit('open',$event)"
    ></Comment>
  </van-list>
</template>

<script>
import { comment } from '@/api/comment'
import Comment from './component'
export default {
  name: 'CommentIndex',
  components: {
    Comment
  },
  data () {
    return {
      // list: [],
      finished: false,
      loading: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await comment({
          type: this.type,
          source: this.articleId.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        // console.log(data.data)
        // if (Math.random > 0.1) {
        //   JSON.parse('aaaaa')
        // }
        this.list.push(...results)
        this.$emit('allCount', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.$toast('错误')
      }
    }
  }
}
</script>

<style>
</style>
