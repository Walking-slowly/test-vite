<!-- 虚拟列表 -->
<script lang="tsx">
import type { Column } from 'element-plus';

export default defineComponent({
  name: 'VirtualizedTable',
  inheritAttrs: false,

  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { attrs }) {
    const { columns, ...other } = attrs;

    const slots = {
      default: ({ height, width }: any) => (
        <>
          <elTableV2
            columns={columns as Column}
            class="virtualized-common-table"
            header-height={40}
            {...other}
            {...props}
            height={height}
            width={width}
            fixed
          >
            {{
              empty: () => (
                <div class="el-table__empty-block">
                  <span class="el-table__empty-text">暂无数据</span>
                </div>
              ),
            }}
          </elTableV2>
        </>
      ),
    };

    return () => <el-auto-resizer v-slots={slots} />;
  },
});
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
