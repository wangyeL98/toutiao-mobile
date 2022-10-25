import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import store from './store'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.filter('dealtime', value => {
  return dayjs().to(dayjs(value))
})
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
