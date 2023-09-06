import 'element-plus/theme-chalk/dark/css-vars.css'
// 解决 el-message 组件样式丢失问题
import 'element-plus/theme-chalk/src/message.scss'
import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginLasting from 'pinia-plugin-lasting'
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'
import directives from '@/directives/index'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginLasting)

app.use(pinia)
app.use(router)
app.use(directives)

app.mount('#app')
