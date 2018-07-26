// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false

//注册一个全局守卫 作用是在路由跳转前 对路由进行判断 防止未登录的用户跳到其他页面
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('mytoken')
  //如果已经登陆，那我不干涉你
  if(token){
    next()
  }else{
    if(to.path !== '/login'){
      //如果没有登陆 但你访问其他需要登陆的页面 那就跳转到登陆页面
      next({path:'/login'})
    }else{
      //如果没有登陆 你访问login 不干涉
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
