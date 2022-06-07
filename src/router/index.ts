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
    component: () => import('../views/home-page.vue')
  }, {
    path: '/project',
    name: 'project',
    component: () => import('../views/project/project-page.vue')
  }
]
const router = createRouter({
  history,
  routes
})
export default router
