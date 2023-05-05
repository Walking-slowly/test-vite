<!-- 列表 -->

<script lang="tsx">
import type { Column } from "element-plus";

export default defineComponent({
  name: 'VirtualizedTable',

  setup(props, { attrs }) {
    const { columns } = attrs
     return () => <>
      <el-table data={[]} height={'calc(100% - 0px)'}>
        { (columns as Column).map((i : any) => <el-table-column {...i} label={i.title}/>)}
      </el-table>
    </>
  }
})
</script>
