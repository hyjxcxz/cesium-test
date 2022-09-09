import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const history = createWebHashHistory()
const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     redirect: { name: 'index' },
//   },
  {
    path: '/support',
    name: 'home1',
    component: () => import('@/views/support/guide-page.vue'),
    meta: {
      title: '首页'
    }
  }, {
    path: '/support-guide',
    name: 'support-guide',
    component: () => import('@/views/support/guide-page.vue'),
    meta: {
      title: '开发指南'
    }
  },
  {
    path: '/support-about',
    name: 'support-about',
    component: () => import('@/views/support/about-page.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/basedata',
    name: 'home',
    component: () => import('@/views/basedata/guide-page.vue'),
    meta: {
      title: '首页'
    }
  }, {
    path: '/basedata-summary',
    name: 'basedata-summary',
    component: () => import('@/views/basedata/summary-page.vue'),
    meta: {
      title: '概述'
    }
  }, {
    path: '/basedata-guide',
    name: 'basedata-guide',
    component: () => import('@/views/basedata/guide-page.vue'),
    meta: {
      title: '开发指南'
    }
  },
  {
    path: '/basedata-about',
    name: 'basedata-about',
    component: () => import('@/views/basedata/about-page.vue'),
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
