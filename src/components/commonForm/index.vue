<template>
  <el-form :model="modelValue" ref="formRef">
    <el-row :gutter="gutter">
      <el-col
        v-for="({span, prop, events, ...other}, i) in cols" 
        :key="i" 
        :span="span || 24"
      >
        
        <el-form-item v-bind="{...other, prop}">
          <component
            :is="pipeComponents(other)"
            v-bind="{
              clearable: true,
              ...other
            }"
            v-on="events || {}"
            v-model="modelValue[prop]"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="tsx" setup>
import { OptionItemProps } from "element-plus/es/components/select-v2/src/select.types"
import type { FormInstance } from 'element-plus'

interface FormItem {
  elType: String, // 输入框类型
  span?: Number, // element 栅格布局,
  prop: String, // 表单字段
  label?: String, // 表单lebel
  placeholder?: String, // 继承element placeholder
  events?: Object, // 继承element 事件
  options?: Array<OptionItemProps>, // select options
}

interface FormProps {
  cols: Array<FormItem>,
  modelValue: Object,
  gutter?: Number
}

const props = withDefaults(defineProps<FormProps>(), {
  gutter: () => 20
})

const formRef = ref<FormInstance>()
const { gutter } = toRefs(props)
const slots = useSlots()


const pipeComponents = (item: FormItem): String => item.elType

// validate
const validate = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (formRef.value as FormInstance).validate((valid, fields) => {
      if (valid) resolve(true)
      reject(false)
    })
  })
}

// resetFields
const resetFields = () => {
  (formRef.value as FormInstance).resetFields()
}

defineExpose({
  validate,
  resetFields
})

</script>

<style lang="scss" scoped>
::v-deep {
  .el-select, .el-date-editor, .el-input__wrapper{
    width: 100%;
  }
}
</style>