import '@/styles/index.scss';
import App from './App.vue';
import router from './router';

// vuex
import { createPinia } from 'pinia';
// 状态持久化
import piniaPersist from 'pinia-plugin-persist';

// ElementPlus-icon
import icons from './icons';

// Components
import components from './components';

//ElementPlus
import ElementPlus from './element';
import { ElLoading } from 'element-plus';
import 'virtual:svg-icons-register';

// 生产使用mock需要
// import { setupProdMockServer } from '../mock/index.ts';
// if (import.meta.env.VITE_MODE === 'production') {
//   setupProdMockServer();
// }

console.log(import.meta.env, 'env');

const app = createApp(App);
app.use(createPinia().use(piniaPersist));
app.directive('loading', ElLoading.directive);
app.use(ElementPlus);
app.use(components);
app.use(icons);
app.use(router);
app.mount('#app');
