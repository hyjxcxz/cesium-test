import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: { name: 'index' }
  // },
  {
    path: '/GOLDMAP-ServerControl',
    name: 'GOLDMAP-ServerControl',
    component: () => import('@/views/servercontrol/control-page.vue'),
    meta: {
      title: '后台管理'
    }
  },
  {
    path: '/GOLDMAP-MapServer',
    name: 'GOLDMAP-MapServer',
    component: () => import('@/views/mapserver/guide-page.vue'),
    meta: {
      title: '地图服务'
    }
  },
  {
    path: '/GOLDMAP-MapServer-guide',
    name: 'GOLDMAP-MapServer-guide',
    component: () => import('@/views/mapserver/guide-page.vue'),
    meta: {
      title: '开发指南'
    }
  },
  {
    path: '/GOLDMAP-MapServer-about',
    name: 'GOLDMAP-MapServer-about',
    component: () => import('@/views/mapserver/about-page.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/GOLDMAP-SupportServer',
    name: 'GOLDMAP-SupportServer',
    component: () => import('@/views/support/guide-page.vue'),
    meta: {
      title: '分析决策服务'
    }
  }, {
    path: '/GOLDMAP-SupportServer-guide',
    name: 'GOLDMAP-SupportServer-guide',
    component: () => import('@/views/support/guide-page.vue'),
    meta: {
      title: '分析决策服务-开发指南'
    }
  },
  {
    path: '/GOLDMAP-SupportServer-about',
    name: 'GOLDMAP-SupportServer-about',
    component: () => import('@/views/support/about-page.vue'),
    meta: {
      title: '分析决策服务-关于'
    }
  },
  {
    path: '/GOLDMAP-BasedataServer',
    name: 'GOLDMAP-BasedataServer',
    component: () => import('@/views/basedata/guide-page.vue'),
    meta: {
      title: '基础数据服务'
    }
  }, {
    path: '/GOLDMAP-BasedataServer-guide',
    name: 'GOLDMAP-BasedataServer-guide',
    component: () => import('@/views/basedata/guide-page.vue'),
    meta: {
      title: '基础数据服务-开发指南'
    }
  },
  {
    path: '/GOLDMAP-BasedataServer-about',
    name: 'GOLDMAP-BasedataServer-about',
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
