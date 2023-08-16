import '@/styles/index.scss';
import App from './App.vue';
import router from './router';

// vuex
import { createPinia } from 'pinia';
// 状态持久化
import piniaPersist from 'pinia-plugin-persist';

// components
import components from './components';

// ElementPlus-icon
import icons from './icons';

//ElementPlus
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'virtual:svg-icons-register';

// 生产使用mock需要
// import { setupProdMockServer } from '../mock/index.ts';
// if (import.meta.env.VITE_MODE === 'production') {
//   setupProdMockServer();
// }

console.log(import.meta.env, 'env');

const app = createApp(App);
app.use(createPinia().use(piniaPersist));
app.use(components);
app.use(ElementPlus, { locale: zhCn });
app.use(icons);
app.use(router);
app.mount('#app');
