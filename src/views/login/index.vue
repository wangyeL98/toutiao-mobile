<template>
  <div class="login-box">
    <van-nav-bar title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field placeholder="请输入手机号" name="mobile" v-model="user.mobile"
      :rules="test.mobile"
      type="number"
      maxlength="11"

      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field placeholder="请输入验证码" name="code" v-model="user.code"
      :rules="test.code"
      type="number"
      maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="1000*5" format="ss s" v-if="isShow" @finish="isShow = false"/>
          <van-button v-else size="small" type="default" round class="login-yzms"
          @click="checkCode"
          native-type="button"
          >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, send } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      test: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isShow: false
    }
  },

  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      console.log(user)
      try {
        const res = await login(this.user)

        // console.log(res)

        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data)
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败', err)
          this.$toast.fail('登录失败')
        } else {
          this.$toast.fail('登录失败')
          console.log('登录事变,请稍后重试', err)
        }
        // console.log(err)
      }
    },
    async checkCode () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('发送失败', err)
      }
      this.isShow = true
      try {
        const res = await send(this.user.mobile)
        this.$toast('发送成功')
        console.log(res)
      } catch (err) {
        // this.$toast('发送失败')
        this.isShow = false
        if (err.response.status === 429) {
          this.$toast('发送频繁，请稍后重试')
        } else {
          this.$toast('发送错误，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less">
.login-box {
  .van-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon{
      color:#fff
    }
  }
  .toutiao {
    font-size: 37px;
    color: #666;
  }
  .login-yzms {
    padding: 0;
    width: 152px;
    height: 46px;
    background-color: #ededed;
    color: #666;
    font-size: 22px;
    line-height: 46px;
  }
  .login-btn {
    padding: 53px 28px;
    .van-button--info {
      background-color: #6db4fb;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>
