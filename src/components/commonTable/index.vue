<template>
  <div
    v-loading="loading"
    class="default-common-table"
  >
    <VirtualizedTable
      v-if="isVirtualizedTable"
      v-bind="attrs"
    />
    <DefaultTable
      v-else
      v-bind="attrs"
      @selection-change="handleSelectionChange"
    />

    <el-pagination
      v-if="isPagination"
      v-model:current-page="current"
      v-model:page-size="pageNum"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[50, 100, 200, 300]"
      :total="total"
      class="common-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="tsx" setup>
import DefaultTable from './default-table.vue';
import VirtualizedTable from './virtualized-table.vue';

interface TableProps {
  isVirtualizedTable?: boolean;
  isPagination?: boolean;
  loading?: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
}

defineOptions({
  name: 'CommonTable',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TableProps>(), {
  isVirtualizedTable: false,
  isPagination: false,
  loading: false,
  currentPage: 1,
  pageSize: 50,
});

const attrs = useAttrs();

const { isVirtualizedTable, isPagination, loading, currentPage, pageSize } = toRefs(props);

const emit = defineEmits([
  'onChangePage',
  'onChangeSelect',
  'update:currentPage',
  'update:pageSize',
]);

const current = computed({
  get: () => currentPage.value,
  set: (val) => emit('update:currentPage', val),
});

const pageNum = computed({
  get: () => pageSize.value,
  set: (val) => emit('update:pageSize', val),
});

const handleCurrentChange = () => {
  emit('onChangePage');
};

const handleSizeChange = () => {
  current.value = 1;
  emit('onChangePage');
};

const handleSelectionChange = (val: any[]) => {
  emit('onChangeSelect', val);
};
</script>

<style lang="scss" scoped>
.default-common-table {
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-flow: column;
  align-items: flex-end;
  .common-pagination {
    margin: 8px 0;
  }
}
</style>
