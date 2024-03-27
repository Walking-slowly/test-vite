import { App } from 'vue';
import { Plus } from '@element-plus/icons-vue';

export default {
  install(app: App) {
    let ElementPlusIconsVue = {
      Plus,
    };
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
