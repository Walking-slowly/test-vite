import { App } from 'vue';
import { Search } from '@element-plus/icons-vue';

export default {
  install(app: App) {
    let ElementPlusIconsVue = {
      Search,
    };
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
