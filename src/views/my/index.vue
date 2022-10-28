<template>
  <div class="my_contain">
    <div v-if="user" class="header user_info">
      <div class="base_info">
        <div class="img_left">
          <van-image
            :src="userInfo.photo"
            class="pic"
            round
            fit="cover"
          />
          <span class="username">{{userInfo.name}}</span>
        </div>
        <div class="fix_right">
          <van-button
           round
           type="default"
           size="mini"
           class="change"
           to="/editor"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="user_list">
        <div class="user_item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="user_item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="user_item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="user_item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <div class="header" v-else>
      <div class="nologin" @click="logined">
        <img class="mobile_img" src="~@/assets/mobile.png" alt="" />
        <span class="text">未登录</span>
      </div>
    </div>
    <van-grid :column-num="2" class="user_nav">
      <van-grid-item icon="photo-o">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item icon="photo-o">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <div class="top" v-if="user">
      <van-cell class="login_back" @click="exit">退出登录</van-cell>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getData } from '@/api/user'
export default {
  name: 'MyIndex',
  created () {
    if (this.user) {
      this.getUserInfo()
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async getUserInfo () {
      const res = await getData()
      // console.log(res)
      this.userInfo = res.data.data
    },
    logined () {
      this.$router.push({
        path: '/login'
      })
    },
    exit () {
      this.$dialog.confirm({
        title: '确认退出吗'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消执行这里')
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less">
.my_contain {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nologin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile_img {
      width: 132px;
      height: 132px;
    }
    .text {
      font-size: 28px;
      color: #fff;
      margin-top: 15px;
    }
  }
  .user_info {
    display: block;
    .base_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      height: 231px;
      padding: 76px 32px 23px;
      .fix_right {
        .change {
          color: #666;
        }
      }
      .img_left {
        display: flex;
        align-items: center;
        .username {
          font-size: 30px;
          color: #fff;
          margin-left: 22px;
        }
        .pic {
          width: 132px;
          height: 132px;
        }
      }
    }
  }
  .user_list {
    height: 130px;
    display: flex;
    align-items: center;
    .user_item {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;
      justify-content: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
  .user_nav {
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      font-size: 28px;
      color: #333;
      margin-top: 16px;
    }
  }
  .top {
    margin-top: 9px;
    .van-cell__value {
      text-align: center;
      color: #d86262;
    }
  }
}
body {
  background-color: #f5f7f9;
}
</style>
