<template>
    <van-button
      v-if="isFollowed"
      class="follow-btn"
      round
      size="small"
      @click="addfollow"
      :loading="isflag"
      >已关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      badge="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="addfollow"
      :loading="isflag"
      >关注</van-button
    >

</template>

<script>
import { followedUser, deletedUser } from '@/api/user'
export default {
  model: {
    prop: 'isFollowed',
    event: 'change'
  },
  name: 'FollowIndex',
  data () {
    return {
      isflag: false
    }
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async addfollow () {
      this.isflag = true
      try {
        if (this.isFollowed) {
          await deletedUser(this.aut_id)
        } else {
          await followedUser(this.aut_id)
        }
        this.$emit('change', !this.isFollowed)
      } catch (err) {
        this.$toast('错误')
        // console.log(err)
      }
      this.isflag = false
    }
  }
}
</script>

<style>
</style>
