<!-- 列表 -->

<script lang="tsx">
import type { Column } from 'element-plus';

export default defineComponent({
  name: 'DefaultTable',
  inheritAttrs: false,

  props: {
    data: {
      type: Array,
      default: () => [],
    },
    // 多选
    isSelect: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { attrs }) {
    const { columns = [], ...other } = attrs;

    return () => (
      <el-table
        height={'100%'}
        {...props}
        {...other}>
        {props.isSelect && (
          <el-table-column
            type="selection"
            align="center"
            width="45"
          />
        )}
        {(columns as Column).map((i: Column) => (
          <el-table-column
            show-overflow-tooltip={true}
            {...i}
            label={i.title}
            v-slots={{
              default: (res: any) => i.cellRenderer && i.cellRenderer({ ...res, rowData: res.row }),
              header: (res: any) =>
                i.headerCellRenderer ? i.headerCellRenderer({ ...res, rowData: res.row }) : <span>{i.title}</span>,
            }}
          />
        ))}
      </el-table>
    );
  },
});
</script>
