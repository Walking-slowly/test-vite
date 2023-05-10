import '@/styles/index.scss'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import components from './components'

import icons from './icons'

//引入
import ElementPlus from 'element-plus'

// 生产使用mock需要
import { setupProdMockServer } from '../mock/index.ts'
if (import.meta.env.VITE_MODE === 'production') {
  setupProdMockServer()
}

console.log(import.meta.env, 'env')

const app = createApp(App)
app.use(createPinia())
app.use(components)
app.use(ElementPlus)
app.use(icons)
app.use(router)
app.mount('#app')
