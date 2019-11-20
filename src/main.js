import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vant, { Lazyload } from 'vant'
import 'amfe-flexible'
import 'vant/lib/index.css'

import './styles/index.less'
// 自己的插件
import plugin from '@/utils/plugin'
Vue.use(plugin)
Vue.use(Lazyload)

Vue.config.productionTip = false

Vue.use(vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
