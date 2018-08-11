import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import User from '@/views/user/User'
import Rights from '@/views/right/Rights'
import Roles from '@/views/right/Roles'
import Category from '@/views/category/Category'
import Goods from '@/views/goods/Goods'
import AddGoods from '@/views/goods/AddGoods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/',
      name:'Home',
      component:Home,
      children:[
        {path:'welcome',
        name:'Welcome',
        component:Welcome},
        {
          path:'users',
          name:'Users',
          component:User
        },
        {
          name:'Rights',
          path:'rights',
          component:Rights
        },
        {
          name: 'Roles',
          path: 'roles',
          component: Roles
        },
        {
          name:'Category',
          path:'categories',
          component:Category
        },
        {
          name:'Goods',
          path:'goods',
          component:Goods
        },
        {
          name:'AddGoods',
          path:'toadd',
          component:AddGoods
        }
      ]
    }
    
  ]
})

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('mytoken');
//   if(token) {
//     next()
//   }else{
//     if(to.path !== '/login'){
//       next({path:'/login'})
//     }else{
//       next()
//     }
//   }
// })

// export default router;
