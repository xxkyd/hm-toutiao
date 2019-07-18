import Vue from 'vue'
import App from './App.vue'

// 导入样式包
import ElementUI from 'element-ui'
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
// 引入axios
import axios from './api/axios'
import componnets from '@/components'
// 导入全局样式
import '@/styles/index.less'
Vue.use(componnets)
// 基准路径
/* axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// token认证
axios.defaults.headers = {
  Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
} */
Vue.prototype.$http = axios
// 注册到Vue实例
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
