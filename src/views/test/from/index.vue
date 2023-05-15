<template>
  <common-form
    ref="common-form"
    v-model="formModel"
    label-position="top"
    label-width="120px"
    :rules="rules"
    :cols="cols"
  >
    <template #K>
      <common-icon
        name="icon-yuan"
        :size="28"
      />
    </template>
  </common-form>

  <el-button
    type="primary"
    @click="a"
  >
    测试
  </el-button>
</template>

<script>
export default {
  data() {
    return {
      formModel: {},
    };
  },

  computed: {
    cols() {
      return [
        {
          elType: 'el-input',
          span: 8,
          prop: 'name',
          label: '姓名',
          placeholder: '请输入',
        },
        {
          elType: 'el-input',
          span: 8,
          prop: 'b',
          label: '性别',
        },
        {
          elType: 'common-select',
          span: 8,
          prop: 'a',
          placeholder: 'BBBB',
          label: '普通下拉',
          options: [
            {
              label: '111',
              value: 1,
            },
            {
              label: '222',
              value: 2,
            },
          ],
        },
        {
          elType: 'el-date-picker',
          span: 8,
          prop: 'i',
          type: 'month',
        },
        {
          elType: 'el-date-picker',
          span: 8,
          prop: 'c',
          label: '测试时间',
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
          elType: 'custom',
          span: 24,
          prop: 'K',
          label: 'AAA',
        },
        {
          elType: 'common-select',
          span: 24,
          prop: 'j',
          label: '树下拉',
          options: [],
        },
      ];
    },

    rules() {
      return {
        a: [{ required: true, message: '请输入', trigger: 'blur' }],
      };
    },
  },

  mounted() {},

  methods: {
    a() {
      this.$refs['common-form'].validate().then(() => {});
    },
  },
};
</script>
