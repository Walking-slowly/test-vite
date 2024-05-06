import { App } from 'vue';
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElRow,
  ElCol,
  ElScrollbar,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElButton,
  ElTabPane,
  ElTabs,
  ElDropdown,
  ElDropdownItem,
  ElOption,
  ElForm,
  ElFormItem,
  ElDivider,
  ElTable,
  ElTableColumn,
  ElBreadcrumbItem,
  ElBreadcrumb,
  ElDropdownMenu,
  ElDialog,
  ElPagination,
  ElSelect,
  ElTag,
  ElInput,
  ElDatePicker,
  ElIcon,
  ElImage,
  ElTableV2,
  ElSelectV2,
  ElTree,
  ElTreeSelect,
  ElUpload,
  ElSwitch,
  ElAutocomplete,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
  ElButtonGroup,
  ElConfigProvider,
  ElCascader,
  ElDescriptions,
  ElDescriptionsItem,
  ElInputNumber,
  ElPopover,
  ElTooltip,
  ElProgress,
  ElCard,
  ElLink,
} from 'element-plus';

export default {
  install(app: App) {
    let ElementComponents = {
      ElContainer,
      ElHeader,
      ElMain,
      ElRow,
      ElCol,
      ElScrollbar,
      ElAside,
      ElMenu,
      ElSubMenu,
      ElMenuItem,
      ElButton,
      ElTabPane,
      ElTabs,
      ElDropdown,
      ElDropdownItem,
      ElOption,
      ElForm,
      ElFormItem,
      ElDivider,
      ElTable,
      ElTableColumn,
      ElBreadcrumb,
      ElDropdownMenu,
      ElBreadcrumbItem,
      ElDialog,
      ElPagination,
      ElSelect,
      ElTag,
      ElInput,
      ElDatePicker,
      ElIcon,
      ElImage,
      ElTableV2,
      ElSelectV2,
      ElTree,
      ElTreeSelect,
      ElUpload,
      ElSwitch,
      ElAutocomplete,
      ElCheckboxGroup,
      ElCheckbox,
      ElRadioGroup,
      ElRadio,
      ElButtonGroup,
      ElConfigProvider,
      ElCascader,
      ElDescriptions,
      ElDescriptionsItem,
      ElInputNumber,
      ElPopover,
      ElTooltip,
      ElProgress,
      ElCard,
      ElLink,
    };
    for (const [key, component] of Object.entries(ElementComponents)) {
      app.component(key, component);
    }
  },
};