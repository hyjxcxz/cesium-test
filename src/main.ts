import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import ElementPlus from 'element-plus'
import JsonViewer from 'vue3-json-viewer'
import 'element-plus/theme-chalk/index.css'
import './assets/style/public.css'
import 'vue3-json-viewer/dist/index.css'

const app = createApp(App)
app.use(router).use(store, key).use(ElementPlus).use(JsonViewer).mount('#app')
router.beforeEach((to:any, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
