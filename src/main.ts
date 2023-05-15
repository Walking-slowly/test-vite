import '@/styles/index.scss';
import App from './App.vue';
import router from './router';

// vuex
import { createPinia } from 'pinia';

// components
import components from './components';

// ElementPlus-icon
import icons from './icons';

//ElementPlus
import ElementPlus from 'element-plus';
import 'virtual:svg-icons-register';

// 生产使用mock需要
import { setupProdMockServer } from '../mock/index.ts';
if (import.meta.env.VITE_MODE === 'production') {
  setupProdMockServer();
}

console.log(import.meta.env, 'env');

const app = createApp(App);
app.use(createPinia());
app.use(components);
app.use(ElementPlus);
app.use(icons);
app.use(router);
app.mount('#app');
