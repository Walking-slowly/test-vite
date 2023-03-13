import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import elementPlus from './element'

const app = createApp(App)
app.use(elementPlus)
app.use(router)
app.mount('#app')
