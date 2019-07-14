import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome }
      ] },
    { name: '404', path: '*', component: NotFound }
  ]// 配置路由规则
})
router.beforeEach((to, form, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('hm-toutiao')
  if (user) return next()
  next('/login')
})
export default router
