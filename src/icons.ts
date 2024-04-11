import { App } from 'vue';
import { Plus, Moon, Sunny, UploadFilled, ArrowDown } from '@element-plus/icons-vue';

export default {
  install(app: App) {
    let ElementPlusIconsVue = {
      Plus,
      Moon,
      Sunny,
      UploadFilled,
      ArrowDown,
    };
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
