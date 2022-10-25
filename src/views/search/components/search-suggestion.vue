<template>
  <div class="search-suggestion">
    <van-cell
     icon="search"
     v-for="(item,index) in suggestList"
     :key="index"
     @click="$emit('searchs',item)"
     >
     <div slot="title" v-html="high(item)"></div>
     </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { suggest } from '@/api/suggest'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestList: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadingSuggest(val)
      }, 300),
      immediate: true

    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadingSuggest (q) {
      const { data } = await suggest(q)
      this.suggestList = data.data.options
    },
    high (item) {
      const newStr = `<span class="high_text">${this.searchText}</span>`
      const str = new RegExp(this.searchText, 'gi')
      if (item == null) {
        return item
      }
      return item.replace(str, newStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion{
  /deep/ .high_text{
    color: red;
  }
}
</style>
