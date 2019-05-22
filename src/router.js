import Vue from 'vue'
import Router from 'vue-router'
import Mypage from './views/Mypage.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
import store from './store.js'

Vue.use(Router)

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
  // public or not
  if (to.matched.some(record => !record.meta.isPublic)) {
    // confirm login
    if (!store.state.loggedIn) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  } else if (to.name === 'login' && store.state.loggedIn) {
    next({ path: '/' })
  }
  next()
})

export default router
