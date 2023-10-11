<template>
  <el-form
    ref="formRef"
    :model="modelValue"
  >
    <el-row :gutter="gutter">
      <el-col
        v-for="{ span, events, ...other } in cols"
        :key="other.prop"
        :span="span || 24"
      >
        <el-form-item v-bind="{ ...other }">
          <slot
            v-if="other.elType === 'custom'"
            :name="other.prop"
          />
          <component
            :is="pipeComponents(other)"
            v-else
            v-bind="{
              clearable: true,
              ...other,
            }"
            v-model="modelValue[other.prop]"
            v-on="events || {}"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="tsx" setup>
import { OptionItemProps } from 'element-plus/es/components/select-v2/src/select.types';
import type { FormInstance } from 'element-plus';
import { toHump } from '@/utils/utils.js';

interface FormItem {
  elType: string; // 输入框类型
  span?: number; // element 栅格布局,
  prop: string; // 表单字段
  label?: string; // 表单lebel
  placeholder?: string; // 继承element placeholder
  events?: object; // 继承element 事件
  options?: Array<OptionItemProps>; // select options
}

interface FormProps {
  cols: Array<FormItem>;
  modelValue: {
    [key: string]: any;
  };
  gutter?: number;
}

defineOptions({
  name: 'CommonForm',
});

const props = withDefaults(defineProps<FormProps>(), {
  gutter: () => 10,
});

const modules = import.meta.glob('../**/*.vue', { eager: true }) as Record<string, any>;

const formRef = ref<FormInstance>();
const { gutter, modelValue } = toRefs(props);

const pipeComponents = (item: FormItem): any => {
  // 自定义
  if (item.elType === 'custom') return;
  // element-plus
  if (item.elType.indexOf('el') === 0) return item.elType;
  // 公共组件
  const component = modules[`../${toHump(item.elType)}/index.vue` as keyof typeof modules];
  return component ? component.default : console.error(`无法找到${item.elType}组件！`);
};

// validate
const validate = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (formRef.value as FormInstance).validate((valid) => {
      if (valid) resolve(true);
      reject(false);
    });
  });
};

// resetFields
const resetFields = () => {
  (formRef.value as FormInstance).resetFields();
};

defineExpose({
  validate,
  resetFields,
});
</script>

<style lang="scss" scoped>
::v-deep(.el-select),
::v-deep(.el-date-editor),
::v-deep(.el-input__wrapper) {
  width: 100%;
}
::v-deep(.el-form-item) {
  margin-bottom: 8px;
}
</style>
