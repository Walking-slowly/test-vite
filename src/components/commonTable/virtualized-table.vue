<!-- 虚拟列表 -->
<script lang="tsx">
import type { Column } from "element-plus";

export default defineComponent({
  name: 'VirtualizedTable',

  setup(props, { attrs }) {
    const { columns } = attrs
    
    const width = ref<Number>(200)
    const height = ref<Number>(100)

    onMounted(() => {
      const { offsetHeight, offsetWidth} = document.querySelector('.el-main') as HTMLElement
      width.value = offsetWidth
      height.value = offsetHeight
    })

    return () => <>
      <elTableV2
        class="common-table-v2"
        columns={columns as Column}
        data={[]}
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
.common-table-v2 {
  ::v-deep .el-table-v2__empty {
    height: 100%;
    display: flex;
    top: 0 !important;
  } 
}
</style>
