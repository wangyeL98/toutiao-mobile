<template>
  <div class="gender-container">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { fixUserInfo } from '@/api/user'
export default {
  name: 'GenderInder',
  data () {
    return {
      columns: ['男', '女']
    }
  },
  props: ['userList'],
  methods: {
    async onConfirm (value) {
      await fixUserInfo({
        gender: value === '男' ? '0' : '1'
      })
      this.userList.gender = value === '男' ? 0 : 1
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
