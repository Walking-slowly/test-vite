<template>
  <common-form
    v-model="formModel"
    label-width="120px"
    ref="common-form"
    :rules="rules"
    :cols="cols"
  />

  <el-button type="primary" @click="a">测试</el-button>
</template>

<script>
export default {
  data() {
    return {
      formModel: {}
    }
  },

  computed: {
    cols() {
      return [
        {
          elType: 'el-input',
          span: 8,
          prop: 'name',
          label: '姓名',
          placeholder: '请输入'
        },
        {
          elType: 'el-input',
          span: 8,
          prop: 'b',
          label: '性别'
        },
        {
          elType: 'common-select',
          span: 8,
          prop: 'a',
          label: '测试下拉',
          options: [
            {
              label: '111',
              value: 1
            },
            {
              label: '222',
              value: 2,
              disabled: true
            }
          ]
        },
        {
          elType: 'el-date-picker',
          span: 8,
          prop: 'i',
          type: 'month'
        },
        {
          elType: 'el-date-picker',
          span: 8,
          prop: 'c',
          label: '测试时间'
        },
        {
          elType: 'el-input',
          span: 24,
          prop: 'c',
          type: 'textarea',
          rows: 4,
          label: '打打',
        },
        // {
        //   elType: '',
        //   span: 24,
        //   prop: 'K',
        //   label: 'AAA',
        // },
        // {
        //   elType: '',
        //   span: 24,
        //   prop: 'm',
        //   label: 'AAA',
        // }
      ]
    },

    rules() {
      return {
        a: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
      }
    }
  },

  mounted() {},

  methods: {
    a() {
      this.$refs['common-form'].validate().then(() => { })
    },

    b() {
      this.$refs['common-form'].resetFields()
    }
  }
}
</script>