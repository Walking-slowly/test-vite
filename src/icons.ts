import { App } from "vue"

import { 
  House,
  Setting
} from "@element-plus/icons-vue";

const componentFiles = [
  House,
  Setting
]

export default {
  install(app: App) {
    componentFiles.forEach(item => {
      app.component(item.name, item)
    })
  }
}