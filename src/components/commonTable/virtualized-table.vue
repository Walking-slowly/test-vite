<!-- 虚拟列表 -->
<script lang="tsx">
import type { Column } from "element-plus";

export default defineComponent({
  name: 'VirtualizedTable',
  inheritAttrs: false,

  props: {
    width: Number,
    height: Number
  },

  setup(props, { attrs }) {
    const { columns, data = [], ...other} = attrs
    
    return () => <>
      <elTableV2
        columns={columns as Column}
        data={data}
        calss="virtualized-common-table"
        header-height={40}
        {...other}
        width={props.width}
        height={props.height}
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
