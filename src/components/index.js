// 封装一个vue插件，完成当前文件夹在所有的组件全局注册
// 当导入这个模块，使用vue.use（使用这个模块）Vue会调用install函数，默认传入Vue对象
import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
