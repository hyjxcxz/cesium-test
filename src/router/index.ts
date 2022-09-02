import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     redirect: { name: 'index' },
//   },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/guide-page.vue'),
    meta: {
      title: '首页'
    }
  }, {
    path: '/summary',
    name: 'summary',
    component: () => import('../views/summary-page.vue'),
    meta: {
      title: '概述'
    }
  }, {
    path: '/guide',
    name: 'guide',
    component: () => import('../views/guide-page.vue'),
    meta: {
      title: '开发指南'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about-page.vue'),
    meta: {
      title: '关于'
    }
  }
]
const router = createRouter({
  history,
  routes
})
export default router
