import '@/styles/index.scss'
import App from './App.vue'
import router from './router'

import components from './components'

import icons from './icons'

//引入
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(components)
app.use(ElementPlus)
app.use(icons)
app.use(router)
app.mount('#app')
