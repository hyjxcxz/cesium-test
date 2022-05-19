import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import './assets/style/public-style.scss'
import './assets/style/element-publice-style.scss'

const app = createApp(App)
app.use(router).use(store).use(ElementPlus).mount('#app')
