<template>
  <div class="editor-container">
    <!-- 标题 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      class="editor_title"
      @click-left="$router.back()"
    />
    <!-- 标题 -->

    <!-- 用户信息 -->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image round fit="cover" slot="default" :src="userList.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="userList.name" @click="nameshow=true" />
    <van-cell
      title="性别"
      is-link
      :value="userList.gender === 0 ? '男' : '女'"
      @click="gendershow=true"
    />
    <van-cell title="生日" is-link :value="userList.birthday" @click="birthdayshow=true"/>
    <!-- 用户信息 -->

    <!-- 修改呢称 -->
    <van-popup
      class="change_user"
      v-model="nameshow"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <FixUsername
      @close="nameshow = false"
      :userObj="userList"
      ></FixUsername>
    </van-popup>
    <!-- 修改呢称 -->

    <!-- 修改性别 -->
    <van-popup
      class="change_user"
      v-model="gendershow"
      position="bottom"
    >
      <FixUsergender v-if="gendershow" @close="gendershow=false" :userList="userList"></FixUsergender>
    </van-popup>
    <!-- 修改性别 -->

    <!-- 修改出生日期 -->
    <van-popup
      class="change_user"
      v-model="birthdayshow"
      position="bottom"
    >
      <FixUserbirthday v-if="birthdayshow" @close="birthdayshow=false" :userList="userList"></FixUserbirthday>
    </van-popup>
    <!-- 修改出生日期 -->

    <input type="file" hidden ref="file" @change="onChangefn">

    <!-- 修改头像 -->
    <van-popup
    v-if="photoshow"
      class="change_photo"
      v-model="photoshow"
      position="bottom"
    >
      <FixUserPhoto :imgUrl="imgUrl" @close="photoshow=false" @update-photo="userList.photo=$event"></FixUserPhoto>
    </van-popup>
    <!-- 修改头像 -->

  </div>
</template>

<script>
import FixUserPhoto from './components/fix_userphoto.vue'
import FixUserbirthday from './components/fix_userbirthday.vue'
import FixUsergender from './components/fix_usergender.vue'
import FixUsername from './components/fix_usename.vue'
import { getUserInfo } from '@/api/user'
export default {
  components: { FixUsername, FixUsergender, FixUserbirthday, FixUserPhoto },
  name: 'EditorIndex',
  created () {
    this.loading()
  },
  data () {
    return {
      userList: {},
      nameshow: false,
      gendershow: false,
      birthdayshow: false,
      photoshow: false,
      title: '',
      message: '',
      imgUrl: null
    }
  },
  methods: {
    async loading () {
      const { data } = await getUserInfo()
      this.userList = data.data
    },
    onChangefn () {
      const file = this.$refs.file.files[0]
      const imgUrl = window.URL.createObjectURL(file)
      // console.log(imgUrl)
      this.imgUrl = imgUrl
      this.photoshow = true
      this.$refs.file.value = ''
      // console.log(this.$refs.file.value)
    }
  }
}
</script>

<style scoped lang="less">
.editor-container {
  .editor_title {
    background: #3296fa;
  }
  [class*="van-hairline"]::after {
    border: none;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
    // font-size: 32px;
  }
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
  /deep/ .van-image__img {
    width: 60px;
    height: 60px;
  }
  .change_user {
    background-color: #fafafa;
    .user_title {
      color: #333 !important;
    }
  }
  .change_photo{
    height: 100%;
    background-color: #333;
  }
}
</style>
