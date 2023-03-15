<template>
  <el-form :model="modelValue" ref="formRef">
    <el-row :gutter="gutter">
      <el-col
        v-for="(item, i) in cols" 
        :key="i" 
        :span="item.span || 24"
      >
        
        <el-form-item v-bind="{...item}">
          <component
            :is="pipeComponents(item)"
            v-bind="{
              clearable: true,
              ...item
            }"
            v-on="item.events || {}"
            v-model="modelValue[item.prop]"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="tsx" setup>
import { OptionItemProps } from "element-plus/es/components/select-v2/src/select.types"
import type { FormInstance } from 'element-plus'
import { VNode } from "vue"

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


const pipeComponents = (item: FormItem): VNode => {
  switch(item.elType) {
    case 'el-input':
      return <el-input placeholder="请输入"/>
    case 'el-select':
      return <el-select placeholder="请选择">
        {(item.options || []).map(i => <el-option { ...i }/>)}
      </el-select>
    case 'el-date-picker':
      return <el-date-picker type='date' placeholder="请选择"/>
    default:
      const type = item.prop as string
      return <slot name={item.prop}>{slots[type] && slots[type]!()}</slot>
  }
}

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