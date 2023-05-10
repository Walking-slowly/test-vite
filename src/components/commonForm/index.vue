<template>
  <el-form :model="modelValue" ref="formRef">
    <el-row :gutter="gutter">
      <el-col v-for="{ span, events, ...other } in cols" :key="other.prop" :span="span || 24">
        <el-form-item v-bind="{ ...other }">
          <slot v-if="other.elType === 'custom'" :name="other.prop" />
          <component
            v-else
            :is="pipeComponents(other)"
            v-bind="{
              clearable: true,
              ...other
            }"
            v-on="events || {}"
            v-model="modelValue[other.prop]"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="tsx" setup>
import { OptionItemProps } from 'element-plus/es/components/select-v2/src/select.types'
import type { FormInstance } from 'element-plus'

interface FormItem {
  elType: string // 输入框类型
  span?: number // element 栅格布局,
  prop: string // 表单字段
  label?: string // 表单lebel
  placeholder?: string // 继承element placeholder
  events?: object // 继承element 事件
  options?: Array<OptionItemProps> // select options
}

interface FormProps {
  cols: Array<FormItem>
  modelValue: {
    [key: string]: any
  }
  gutter?: number
}

defineOptions({
  name: 'CommonForm'
})

const props = withDefaults(defineProps<FormProps>(), {
  gutter: () => 20
})

const formRef = ref<FormInstance>()
const { gutter } = toRefs(props)
const slots = useSlots()

const pipeComponents = (item: FormItem): any => {
  if (item.elType !== 'custom') return item.elType
}

// validate
const validate = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    ;(formRef.value as FormInstance).validate((valid, fields) => {
      if (valid) resolve(true)
      reject(false)
    })
  })
}

// resetFields
const resetFields = () => {
  ;(formRef.value as FormInstance).resetFields()
}

defineExpose({
  validate,
  resetFields
})
</script>

<style lang="scss" scoped>
::v-deep {
  .el-select,
  .el-date-editor,
  .el-input__wrapper {
    width: 100%;
  }
}
</style>
