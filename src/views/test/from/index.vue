<template>
  <div>
    <common-form
      ref="common-form"
      v-model="formModel"
      label-position="left"
      label-width="80px"
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
  </div>
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
          events: {
            input: (val) => console.log(val, '11'),
          },
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
          events: {
            change: (val) => console.log(val, 'change'),
          },
        },
        {
          elType: 'el-date-picker',
          span: 8,
          prop: 'i',
          labelWidth: '0px',
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
          isTree: true,
          showCheckbox: true,
          options: [
            {
              value: '1',
              label: 'Level one 1',
              children: [
                {
                  value: '1-1',
                  label: 'Level two 1-1',
                  children: [
                    {
                      value: '1-1-1',
                      label: 'Level three 1-1-1',
                    },
                  ],
                },
              ],
            },
            {
              value: '2',
              label: 'Level one 2',
              children: [
                {
                  value: '2-1',
                  label: 'Level two 2-1',
                  children: [
                    {
                      value: '2-1-1',
                      label: 'Level three 2-1-1',
                    },
                  ],
                },
                {
                  value: '2-2',
                  label: 'Level two 2-2',
                  children: [
                    {
                      value: '2-2-1',
                      label: 'Level three 2-2-1',
                    },
                  ],
                },
              ],
            },
            {
              value: '3',
              label: 'Level one 3',
              children: [
                {
                  value: '3-1',
                  label: 'Level two 3-1',
                  children: [
                    {
                      value: '3-1-1',
                      label: 'Level three 3-1-1',
                    },
                  ],
                },
                {
                  value: '3-2',
                  label: 'Level two 3-2',
                  children: [
                    {
                      value: '3-2-1',
                      label: 'Level three 3-2-1',
                    },
                  ],
                },
              ],
            },
          ],
          events: {
            change: (val) => console.log(val, '树下拉'),
          },
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
