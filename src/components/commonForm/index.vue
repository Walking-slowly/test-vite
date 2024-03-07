<template>
  <el-form
    ref="formRef"
    :model="modelValue"
  >
    <el-row :gutter="gutter">
      <el-col
        v-for="({ span, events, ...other }, i) in cols"
        :key="i"
        :span="span || 24"
      >
        <el-form-item v-bind="{ ...other }">
          <template v-if="other.elType === 'custom'">
            <component :is="other.cellRenderer && other.cellRenderer()" />
          </template>
          <template v-else>
            <component
              :is="pipeComponents(other)"
              v-bind="{
                clearable: true,
                ...other,
              }"
              v-model="modelValue[other.prop]"
              v-on="events || {}"
            />
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { OptionGroup } from 'element-plus/es/components/select-v2/src/select.types';
import type { FormInstance } from 'element-plus';

interface FormItem {
  elType: string; // 输入框类型
  span?: number; // element 栅格布局,
  prop: string; // 表单字段
  label?: string; // 表单lebel
  placeholder?: string; // 继承element placeholder
  events?: object; // 继承element 事件
  cellRenderer?: Function;
  options?: Array<OptionGroup>; // select options
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

const pipeComponents = (item: FormItem): string | null => {
  // 自定义
  if (item.elType === 'custom') return null;

  //element components
  return item.elType;
};

// validate
const validate = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (formRef.value as FormInstance).validate(valid => {
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
::v-deep(.el-input) {
  .el-input__wrapper {
    .el-input__suffix {
      position: relative;
      border-left: 1px solid #dcdfe6;
      &::before {
        content: '';
        position: absolute;
        background-color: #f9f9f9;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: -10px;
        border-radius: 0 4px 4px 0;
        z-index: 0;
      }
    }
  }
}
::v-deep(.el-select) {
  .el-select__suffix {
    position: absolute;
    right: 11px;
    top: 1px;
    bottom: 1px;
    border-radius: 0 4px 4px 0;
    border-left: 1px solid #dcdfe6;
    .el-select__icon {
      margin-left: 8px;
    }
    &::before {
      content: '';
      position: absolute;
      background-color: #f9f9f9;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: -10px;
      border-radius: 0 4px 4px 0;
      z-index: 0;
    }
  }
}
::v-deep(.el-input__inner) {
  z-index: 1;
  background-color: transparent;
}
::v-deep(.el-divider--horizontal) {
  margin: 0;
}
</style>
