import Vue from 'vue'
import Router from 'vue-router'
import Mypage from './views/Mypage.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'

Vue.use(Router)

var Auth = {
  loggedIn: false
}

var routes = [
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
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/logout',
    name: 'logout',
    redirect: '/login'
  }
]

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.isPublic) && !Auth.loggedIn) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
