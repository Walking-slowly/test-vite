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

<script lang="ts" setup>
import { OptionItemProps } from 'element-plus/es/components/select-v2/src/select.types';
import type { FormInstance } from 'element-plus';

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

const formRef = ref<FormInstance>();
const { gutter, modelValue } = toRefs(props);

const pipeComponents = (item: FormItem): any => {
  // 自定义
  if (item.elType === 'custom') return;

  //element components
  return item.elType;
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
