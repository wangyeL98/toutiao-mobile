<template>
  <div class="channel-box">
    <!-- 我的频道 -->
    <van-cell center>
      <div slot="title" class="title">我的频道</div>
      <van-button
        class="change-btn"
        slot="default"
        size="mini"
        round
        plain
        @click="taggle"
        >{{ isShow ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in MychannelList"
        :key="index"
        class="grid-item"
        @click="changed(index,item)"
      >
        <span
          slot="text"
          class="text"
          :class="{ highlight: active === index }"
          >{{ item.name }}</span
        >
        <van-icon class="close" slot="icon" name="close" v-if="isShow && !check.includes(item.id)" />
      </van-grid-item>
    </van-grid>
    <!-- 我的频道 -->

    <!-- 频道推荐 -->
    <van-cell center class="recommend_top">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in recommendList"
        :key="index"

        class="grid-item grid-item-recommend"
        @click="addList(item)"
      >
      <span slot="text">{{item.name}} </span>
        <van-icon slot="icon" name="plus" />
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
import { allchannel } from '@/api/allchannel'
export default {
  name: 'ChannelIndex',
  props: {
    MychannelList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      AllChannelList: [],
      isShow: false,
      check: [0]
    }
  },
  methods: {
    taggle () {
      this.isShow = !this.isShow
    },
    addList (item) {
      this.$emit('addchannel', item)
    },
    changed (index, item) {
      if (this.isShow) {
        this.$emit('remove', index, this.active, item.id, this.check)
      } else {
        this.$emit('changed', index)
      }
    }
  },
  async created () {
    const { data } = await allchannel()
    // console.log(data.data.channels)
    this.AllChannelList = data.data.channels
  },
  computed: {
    recommendList () {
      return this.AllChannelList.filter(item => {
        return !this.MychannelList.find(value => value.id === item.id)
      })
      // const newarr = []
      // this.AllChannelList.forEach((item) => {
      //   if (this.MychannelList.indexOf(item) === -1) {
      //     newarr.push(item)
      //   }
      // })
      // return newarr
    }
  }
}
</script>

<style lang="less">
.channel-box {
  padding-top: 90px;
  .van-grid-item__content {
    background-color: #f4f5f6;
    font-size: 28px;
    color: #222;
    .highlight {
      color: orange;
    }
  }
  // .grid-item-recommend{
  //   font-size: 28px;
  //   color: #222;
  // }
  .grid-item {
    width: 160px;
    height: 86px;
    border-radius: 6px;
    position: relative;
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      font-size: 30px;
    }
  }
  .title {
    font-size: 32px;
    color: #333;
  }
  .change-btn {
    width: 103px;
    height: 48px;
    font-size: 28px;
    color: #f85a5a;
    border: 1px solid #f85a5a;
  }
  .recommend_top {
    margin-top: 75px;
  }
  .van-grid-item__text {
    // line-height: unset;
    padding-top: 10px;   //推荐文字样式
  }
  .van-grid-item__content {
    flex-direction: row;
    white-space: nowrap;
    .van-icon-plus {
      font-size: 28px;
      margin-right: 3px;
    }
  }
}
</style>
