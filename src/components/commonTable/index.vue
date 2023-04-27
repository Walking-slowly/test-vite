<script lang="tsx">
import type { TableColumnInstance } from 'element-plus'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'CommonTable',

  props: {
    cols: {
      type: Array as PropType<TableColumnInstance[]>,
      default: () => [],
      required: true
    },

    tableData: {
      type: Array,
      default: () => [],
    }
  },

  setup(props) {
    const { cols, tableData } = props

    return () => <>
      <el-table 
        data={tableData} 
      > 
        { (cols || []).map((item: TableColumnInstance) => <el-table-column {...item} />) }
      </el-table>
    </>
  }
})
</script>