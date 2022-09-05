import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import './assets/style/public.css'
// import './assets/style/compass.scss'

const app = createApp(App)
app.use(router).use(store, key).use(ElementPlus).mount('#app')
router.beforeEach((to:any, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
