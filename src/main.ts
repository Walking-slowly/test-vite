import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
// import elementPlus from './element'
import icons from './icons'

const app = createApp(App)
// app.use(elementPlus)
app.use(icons)
app.use(router)
app.mount('#app')
