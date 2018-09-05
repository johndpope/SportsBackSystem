// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
// import router from './router'
import createRouter from './router/index' // 路由配置
import createStore from './store/store' // 状态管理
import bus from './model/bus'
import Notification from './components/notification' // 提示消息弹框组件
import Tabs from './components/tabs' // tab组件
import {addRouter, routerMap, routerOther} from './router/routes'
import {itemNav, item, navMap} from './_nav'
import 'babel-polyfill' // 适配IE11浏览器

Vue.use(Vuex)
Vue.use(VueRouter)
// Vue.use(axios)
Vue.use(BootstrapVue)
Vue.use(Notification)
Vue.use(Tabs)

Vue.prototype.$axios = axios

const router = createRouter()
const store = createStore()

// register global progress.
const whiteList = ['/login']// 不重定向白名单

function AuthorityFn () {
  let isToken = store.state.token
  let tokenArr
  if (typeof isToken === 'string') {
    tokenArr = JSON.parse(isToken)
  } else {
    tokenArr = isToken
  }
  addRouter.length = 0
  itemNav.length = 0
  itemNav.push(item)
  for (let menuOut of tokenArr) {
    if (menuOut.pid === 1) {
      let main = routerMap.get(menuOut.id)
      let nav = navMap.get(menuOut.id)
      main.children = []
      nav.children = []
      if (main != null) {
        if (menuOut.id === 4) {
          main.children = [
            {
              path: 'volume',
              name: 'Volume',
              component: () => import('@/views/operate/volume.vue')
            }
          ]
        }
        let itemArr = []
        for (let menuIn of tokenArr) {
          if (menuIn.pid === menuOut.id) {
            if (routerMap.get(menuIn.id) != null) {
              itemArr.push(menuIn.id)
              const itemRouter = routerMap.get(menuIn.id)
              main.children.push(itemRouter)
            }
          }
        }
        const itemFirst = routerMap.get(itemArr[0])
        main.redirect = main.redirect + itemFirst.path
        addRouter.push(main)
      }
      if (nav != null) {
        for (let menuIn of tokenArr) {
          if (menuIn.pid === menuOut.id) {
            if (navMap.get(menuIn.id) != null) {
              nav.children.push(navMap.get(menuIn.id))
            }
          }
        }
        itemNav.push(nav)
      }
    }
  }
  store.commit('SET_addRouters', addRouter)

  function itemFn (item, index) {
    store.commit('SET_siderbarArr', item)
  }
  itemNav.forEach(itemFn)
  // store.commit('SET_siderbarArr', ...itemNav)
  let addRouterArr = store.state.addRouters
  router.addRoutes(addRouterArr)
  router.options.routes.push(...addRouterArr)
  router.addRoutes(routerOther)
  router.options.routes.push(...routerOther)
}

router.beforeEach(function (to, from, next) {
  if (store.state.token) { // 判断是否有token
    if (to.path === '/login') {
      next({path: '/index'})
    } else {
      if (from.path === '/login' && to.path === '/index') {
        AuthorityFn()
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

router.afterEach(function (to, from) {
  window.scrollTo(0, 0)
})

bus.$on('auth', () => {
  store.state.siderbarArr = []
  // window.location.reload()
  router.push('/login')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  created () {
    if (store.state.token) {
      AuthorityFn()
    }
  }
}
)
