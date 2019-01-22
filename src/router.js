import Vue from 'vue'
import Router from 'vue-router'
import Mypage from './views/Mypage.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: '/login'
    }
  ]
})
