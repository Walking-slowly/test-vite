<template>
  <common-form
    v-model="formModel"
    label-width="120px"
    ref="common-form"
    :rules="rules"
    :cols="cols"
  />

  <el-button type="primary">测试</el-button>
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
          label: '姓名'
        },
        {
          elType: 'el-input',
          span: 8,
          prop: 'b',
          label: '性别'
        },
        {
          elType: 'el-select',
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
        {
          elType: '',
          span: 24,
          prop: 'K',
          label: 'AAA',
        },
        {
          elType: '',
          span: 24,
          prop: 'm',
          label: 'AAA',
        }
      ]
    },

    rules() {
      return {
        a: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
        ],
      }
    }
  },

  mounted() {
    console.log(this.$route, 'ss')
  },

  methods: {
    a() {
      this.$refs['common-form'].validate().then(() => {
        console.log('111111')
      })
    },

    b() {
      this.$refs['common-form'].resetFields()
    }
  }
}
</script>