<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('removeall')">全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow=true"/>
    </van-cell>
    <van-cell :title="item" @click="deletesearch(item,index)" v-for="(item, index) in searchHistory" :key="index">
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    deletesearch (item, index) {
      if (this.isDeleteShow) {
        this.searchHistory.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
