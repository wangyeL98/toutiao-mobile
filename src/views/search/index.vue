<template>
  <div class="search_contain">
    <!-- 搜索框 -->
    <form class="search_form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#4fc08d"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShow=false"
      />
    </form>
    <!-- 搜索框 -->

    <!-- 搜索结果 -->
    <search-result v-if="isShow" :searchText="searchText"/>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
     v-else-if="searchText"
      :searchText="searchText"
      @searchs="onSearch"
      />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else :searchHistory="searchHistory" @search="onSearch" @removeall="searchHistory=[]"/>
    <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isShow: false,
      searchHistory: getItem('a') || []
    }
  },
  watch: {
    searchHistory (value) {
      setItem('a', value)
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
      this.isShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search_contain{
  padding-top: 108px;
    .van-search__action{
        color: #fff;
    }
    .search_form{
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: 1;
    }
}
</style>
