import { App } from "vue"

import {
  ElInput, 
  ElForm, 
  ElRow, 
  ElCol, 
  ElFormItem, 
  ElDatePicker,
  ElContainer,
  ElHeader,
  ElAside,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElSubMenu,
  ElOption,
  ElSelect,
  ElMain,
  ElButton,
  ElTable,
  ElTableColumn
} from "element-plus"

const componentFiles = [
  ElInput,
  ElForm,
  ElRow,
  ElCol,
  ElFormItem,
  ElDatePicker,
  ElContainer,
  ElHeader,
  ElAside,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElSubMenu,
  ElOption,
  ElSelect,
  ElMain,
  ElButton,
  ElTable,
  ElTableColumn
]

export default {
  install(app: App) {
    componentFiles.forEach(item => {
      app.component(item.name, item)
    })
  }
}