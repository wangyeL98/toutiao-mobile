import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: getItem('token')

  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem('token', state.user)
    }
  }
})
export default store
