import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const a = 123
const app = createApp(App)
app.use(router).use(store).mount('#app')
