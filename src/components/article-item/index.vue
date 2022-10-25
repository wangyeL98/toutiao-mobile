<template>
  <div class="article-item">
    <van-cell v-for="(item, index) in arr" :key="index" :to="'/article/'+item.art_id">
      <div slot="title" class="title van-multi-ellipsis--l2" >{{ item.title }}</div>
      <div slot="label" class="imgs" v-if="item.cover.type === 3">
        <div v-for="(args, index) in item.cover.images" :key="index" class="imgs-item">
          <van-image  fit="cover" :src="args" class="van-item-imgs"/>
        </div>
      </div>
      <div slot="label" class="desc">
        <span>{{ item.aut_name }}</span>
        <span>{{ item.comm_count }}评论</span>
        <span>{{ item.pubdate | dealtime}}</span>
      </div>
      <div slot="default" class="right" v-if="item.cover.type === 1">
        <van-image class="right-img" fit="cover" :src="item.cover.images[0]" />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  props: ['arr'],
  created () {
    // console.log(this.arr)
  }
}
</script>

<style lang="less">
.article-item {
  .van-cell__value {
    flex: unset;
  }
  .right {
    margin-left: 25px;
    .right-img {
      width: 232px;
      height: 146px;
    }
  }
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .desc span {
    margin-right: 24px;
  }
  .imgs{
    display: flex;
    margin: 30px 0;
    .imgs-item{
        flex: 1;
        height: 146px;
        .van-item-imgs{
            width: 100%;
            height: 100%;
        }
        &:not(:last-child) {
            padding-right: 5px;
        }
    }
    // .imgs-item:first-child{
    //     margin-left: 0;
    // }
  }
}
</style>
