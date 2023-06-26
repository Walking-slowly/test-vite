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
      <>
        <el-table
          {...props}
          {...other}
          height={'100%'}>
          {props.isSelect && (
            <el-table-column
              type="selection"
              align="center"
              width="55"
            />
          )}
          {(columns as Column).map((i: Column) => (
            <el-table-column
              {...i}
              label={i.title}
              v-slots={{
                default: (res: any) =>
                  i.cellRenderer && i.cellRenderer({ ...res, rowData: res.row }),
              }}
            />
          ))}
        </el-table>
      </>
    );
  },
});
</script>
