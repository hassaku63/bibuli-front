import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Mypage from './views/Mypage.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
// import Auth from './services/auth.js'

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
  var loggedIn = store.state.loggedIn
  if (to.matched.some(record => !record.meta.isPublic) && !loggedIn) {
    // if (Auth.isLoggedin()) {
    //   store.commit('login')
    // }
    next({ path: '/login' })
  } else if (to.path === '/login' && loggedIn) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
