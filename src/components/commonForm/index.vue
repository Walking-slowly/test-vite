<template>
  <el-form
    ref="formRef"
    :model="modelValue"
  >
    <el-row :gutter="gutter">
      <template v-for="({ span, events, cellRenderer, options, vShow = true, ...other }, i) in cols">
        <el-col
          v-if="vShow"
          v-show="isShow && isUp ? i <= showCols || i === cols.length - 1 : true"
          :key="i"
          :span="span || 24"
        >
          <el-form-item v-bind="{ ...other }">
            <template v-if="other.elType === 'custom'">
              <component :is="cellRenderer && cellRenderer()" />
            </template>
            <template v-else>
              <component
                :is="other.elType"
                v-bind="{
                  clearable: true,
                  options,
                  ...other,
                }"
                v-model="modelValue[other.prop]"
                v-on="events || {}"
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
      <el-col
        v-if="isDivider"
        :span="24"
        class="form-divider"
      >
        <div
          :title="isUp ? '展开' : '收起'"
          @click="handleSwitch"
        >
          <common-icon
            v-if="isShow"
            :class="{ downIcon: isUp }"
            :name="isUp ? 'icon-down' : 'icon-up'"
            :font-size="14"
          />
        </div>

        <el-divider />
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
export default {
  name: 'CommonForm',
};
</script>

<script lang="ts" setup>
import { OptionGroup } from 'element-plus/es/components/select-v2/src/select.types';
import type { FormInstance, FormItemProp } from 'element-plus';
import { Arrayable } from 'element-plus/es/utils/typescript';
import { ElMessage } from 'element-plus';

interface FormItem {
  elType: string; // 输入框类型
  span?: number; // element 栅格布局,
  prop: string; // 表单字段
  label?: string; // 表单lebel
  placeholder?: string; // 继承element placeholder
  events?: object; // 继承element 事件
  cellRenderer?: Function;
  vShow?: boolean; // 是否显示
  options?: Array<OptionGroup>; // select options
}

interface FormProps {
  cols: Array<FormItem>;
  modelValue: {
    [key: string]: any;
  };
  gutter?: number;
  isDivider?: Boolean;
}

const props = withDefaults(defineProps<FormProps>(), {
  gutter: () => 10,
  isDivider: () => true,
});

// 收起时显示的Cols
const btnCols = computed(() => props.cols[props.cols.length - 1].span || 0);
const showCols = computed(() => {
  let res = 24 - btnCols.value;

  return props.cols.findIndex(i => {
    res -= i.span || 0;
    if (res === 0) return i;
  });
});

// 是否显示展开收起 >= 24
const isShow = computed(() => {
  return props.cols.map(i => i.span || 0).reduce((a, b) => a + b) > 24;
});
let isUp = ref(false);
const handleSwitch = () => {
  isUp.value = !isUp.value;
};

const formRef = ref<FormInstance>();
const { gutter, modelValue } = toRefs(props);

// validate
const validate = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (formRef.value as FormInstance).validate(valid => {
      if (valid) {
        resolve(true);
      } else {
        ElMessage({
          message: '请填写必填项！',
          type: 'error',
        });

        reject(false);
      }
    });
  });
};

// resetFields
const resetFields = (arr: Arrayable<FormItemProp> | undefined) => {
  (formRef.value as FormInstance).resetFields(arr);
};

defineExpose({
  validate,
  resetFields,
});
</script>

<style lang="scss" scoped>
::v-deep(.el-select),
::v-deep(.el-date-editor),
::v-deep(.el-autocomplete),
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
    .el-select__caret {
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
  margin: 1px 0 8px 0;
}
.form-divider {
  position: relative;
  ::v-deep(.el-icon) {
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
    color: #717377;
  }
  ::v-deep(.svg-icon__icon-down) {
    top: -1px !important;
  }
}
</style>
