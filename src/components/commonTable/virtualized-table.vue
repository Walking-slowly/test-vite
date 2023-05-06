<!-- 虚拟列表 -->
<script lang="tsx">
import type { Column } from "element-plus";

export default defineComponent({
  name: 'VirtualizedTable',
  inheritAttrs: false,

  setup(props, { attrs }) {
    const { columns, data = [], ...other} = attrs
    
    const width = ref<Number>(200)
    const height = ref<Number>(100)

    onMounted(() => {
      nextTick(() => {
        const { offsetHeight, offsetWidth} = document.querySelector('.default-common-table') as HTMLElement
        width.value = offsetWidth
        height.value = offsetHeight
      })
    })

    return () => <>
      <elTableV2
        columns={columns as Column}
        data={data}
        calss="virtualized-common-table"
        header-height={40}
        {...other}
        width={width.value}
        height={height.value}
        fixed
      >
        {{
          empty: () => <div class="el-table__empty-block"><span class="el-table__empty-text">暂无数据</span></div>
        }}
      </elTableV2>
    </>
  }
})
</script>

<style lang="scss" scoped>
.virtualized-common-table {
  ::v-deep {
    .el-table-v2__empty {
      height: calc(100% - 50px);
      display: flex;
    }
    .el-table-v2 {
      height: 100% !important;
    }
  } 
}
</style>
