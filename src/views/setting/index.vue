<script lang="tsx">

export default defineComponent({
  setup() {
    const a = reactive({})
    const cols = reactive([{
      elType: 'el-input',
      span: 8,
      prop: 'name',
      label: '姓名',
      placeholder: '请输入'
    }])
    return () => (<>
      <el-button>111</el-button>

      <common-form v-model={a} cols={cols}/>

      <el-tag>Tag 1</el-tag>
    </>)
  }
})
</script>
