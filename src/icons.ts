import { App } from 'vue';
import { Plus, Moon, Sunny } from '@element-plus/icons-vue';

export default {
  install(app: App) {
    let ElementPlusIconsVue = {
      Plus,
      Moon,
      Sunny,
    };
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
