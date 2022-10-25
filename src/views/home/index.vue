<template>
  <div class="home_contain">
    <van-nav-bar class="home_title" fixed>
      <van-button
        slot="title"
        class="search_btn"
        type="info"
        round
        size="small"
        icon="search"
        to="/search"
      >
        搜索
      </van-button>
    </van-nav-bar>

    <van-tabs v-model="active" animated swipeable class="list_box">
      <van-tab
        class="text1"
        v-for="item in channelList"
        :key="item.id"
        :title="item.name"
      >
        <Article :obj="item"></Article>
      </van-tab>
      <div slot="nav-right" class="more" @click="show = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <div slot="nav-right" class="mask"></div>
    </van-tabs>

    <!-- 频道列表 -->
    <van-popup
      v-model="show"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-list
        :MychannelList="channelList"
        @addchannel="addchannelfn"
        :active="active"
        @changed="changedfn"
        @remove="del"
      ></channel-list>
    </van-popup>
    <!-- 频道列表 -->
  </div>
</template>

<script>
import ChannelList from './components/channel-list.vue'
import { channel, mychannels, delUserChannels } from '@/api/home'
import Article from './components/article.vue'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: {
    Article,
    ChannelList
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loading()
  },
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelList: [],
      show: false
    }
  },
  methods: {
    async loading () {
      let channels = []
      if (this.user) {
        const res = await channel()
        channels = res.data.data.channels
      } else {
        const getdata = getItem('MYCHANNEL')
        if (getdata) {
          channels = getdata
        } else {
          const res = await channel()
          channels = res.data.data.channels
        }
      }
      this.channelList = channels
    },
    async addchannelfn (item) {
      this.channelList.push(item)
      if (this.user) {
        try {
          await mychannels({
            id: item.id,
            seq: this.channelList.length
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        setItem('MYCHANNEL', this.channelList)
      }
    },
    changedfn (aaa) {
      this.active = aaa
      this.show = false
    },

    async del (index, acitves, id, newArr) {
      if (newArr.includes(id)) {
        return
      }
      if (index <= acitves) {
        this.active = acitves - 1
      }
      this.channelList.splice(index, 1)

      if (this.user) {
        try {
          await delUserChannels(id)
        } catch (err) {
          console.log(err)
        }
      } else {
        setItem('MYCHANNEL', this.channelList)
      }
    }
  }
}
</script>

<style lang="less">
.home_contain {
  // background: ;
  padding-top: 172px;
  padding-bottom: 100px;
  .home_title {
    background-color: #3296fa;
    .van-icon {
      font-size: 40px;
      color: #fff;
    }
    .search_btn {
      width: 555px;
      height: 64px;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 28px;
    }
    .van-nav-bar__title {
      max-width: unset;
    }
  }
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 11;
    left: 0;
    right: 0;
  }
  .list_box {
    // border: 1px solid orange;
    .van-tab {
      border-right: 1px solid orange;
      border-bottom: 1px solid orange;
      width: 200px;
      height: 83px;

      // font-size: 28px;
      // color: #777;
    }
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  [class*="van-hairline"]::after {
    border: none;
  }
  .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
    bottom: 9px;
  }
  .van-tab--active {
    color: orange;
  }
  .more {
    position: fixed;
    right: 0;
    width: 80px;
    height: 82px;
    background-color: #fff;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    .toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  .mask {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
    // padding:0 !important;
  }
  .van-tabs__wrap--scrollable .van-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0 !important;
  }
}
</style>
