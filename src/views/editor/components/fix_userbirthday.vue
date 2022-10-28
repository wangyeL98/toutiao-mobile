<template>
  <div class="userbirthday-container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="生日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    >
    </van-datetime-picker>
  </div>
</template>

<script>
import { fixUserInfo } from '@/api/user'
export default {
  name: 'userIndex',
  props: {
    userList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  methods: {
    async onConfirm (value) {
      // console.log(value)
      const year = value.getFullYear()
      const month = value.getMonth() + 1
      const date = value.getDate()
      const str = `${year}-${month}-${date}`
      await fixUserInfo({
        birthday: str
      })
      this.userList.birthday = str
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
