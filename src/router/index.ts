import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     redirect: { name: 'index' },
//   },
  {
    path: '/control',
    name: 'control',
    component: () => import('@/views/servercontrol/control-page.vue'),
    meta: {
      title: '服务管理'
    }
  },
  {
    path: '/support',
    name: 'home1',
    component: () => import('@/views/support/guide-page.vue'),
    meta: {
      title: '分析决策服务'
    }
  }, {
    path: '/support-guide',
    name: 'support-guide',
    component: () => import('@/views/support/guide-page.vue'),
    meta: {
      title: '分析决策服务-开发指南'
    }
  },
  {
    path: '/support-about',
    name: 'support-about',
    component: () => import('@/views/support/about-page.vue'),
    meta: {
      title: '分析决策服务-关于'
    }
  },
  {
    path: '/basedata',
    name: 'home',
    component: () => import('@/views/basedata/guide-page.vue'),
    meta: {
      title: '基础数据服务'
    }
  }, {
    path: '/basedata-guide',
    name: 'basedata-guide',
    component: () => import('@/views/basedata/guide-page.vue'),
    meta: {
      title: '基础数据服务-开发指南'
    }
  },
  {
    path: '/basedata-about',
    name: 'basedata-about',
    component: () => import('@/views/basedata/about-page.vue'),
    meta: {
      title: '基础数据服务-关于'
    }
  }
]
const router = createRouter({
  history,
  routes
})
export default router
