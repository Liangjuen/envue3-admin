import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginLasting from 'pinia-plugin-lasting'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginLasting)

app.use(pinia)
app.use(router)

app.mount('#app')
