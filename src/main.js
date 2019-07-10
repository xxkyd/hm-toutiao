import Vue from 'vue'
import App from './App.vue'

// 导入样式包
import ElementUI from 'element-ui'
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
// 注册到Vue实例
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
