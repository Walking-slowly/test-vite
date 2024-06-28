<template>
  <div
    v-loading="loading"
    :style="attrs.style as string || ''"
    class="default-common-table"
  >
    <component
      :is="isVirtualizedTable ? VirtualizedTable : DefaultTable"
      v-bind="attrs"
      ref="defaultCommonTable"
    />

    <el-pagination
      v-if="isPagination"
      v-model:current-page="current"
      v-model:page-size="pageNum"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="pageSizes"
      :total="total"
      :pager-count="pagerCount"
      class="common-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'CommonTable',
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
const DefaultTable = defineAsyncComponent(() => import('./default-table.vue'));
const VirtualizedTable = defineAsyncComponent(() => import('./virtualized-table.vue'));

interface TableProps {
  isVirtualizedTable?: boolean;
  isPagination?: boolean;
  loading?: boolean;
  currentPage?: number;
  pageSize?: number;
  total?: number;
  pagerCount?: number;
  pageSizes?: any
}

interface Emits {
  (event: 'changePage'): void;
  (event: 'update:currentPage', current: number): void;
  (event: 'update:pageSize', pageNum: number): void;
}

const props = withDefaults(defineProps<TableProps>(), {
  isVirtualizedTable: false,
  isPagination: false,
  loading: false,
  currentPage: 1,
  pageSize: 50,
  total: 0,
  pagerCount: 5,
  pageSizes: [20, 50, 100, 200]
});

type TableComponentInstance = InstanceType<typeof DefaultTable> | InstanceType<typeof VirtualizedTable> | null;

const attrs = useAttrs();

const defaultCommonTable = ref<TableComponentInstance>();

const getInternalTable = () => {
  return defaultCommonTable.value ? (defaultCommonTable.value as any).tableRef : null;
};

const { isVirtualizedTable, isPagination, loading, currentPage, pageSize, pagerCount, pageSizes } = toRefs(props);

const emit = defineEmits<Emits>();

const current = computed({
  get: () => currentPage.value,
  set: val => emit('update:currentPage', val),
});

const pageNum = computed({
  get: () => pageSize.value,
  set: val => emit('update:pageSize', val),
});

const handleCurrentChange = () => {
  emit('changePage');
};

const handleSizeChange = () => {
  current.value = 1;
  emit('changePage');
};

defineExpose({
  getInternalTable,
});
</script>

<style lang="css" scoped>
.default-common-table {
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-flow: column;
  align-items: flex-end;
}
.default-common-table .common-pagination {
  margin: 8px 0;
}
</style>
