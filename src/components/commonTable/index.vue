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
    />

    <el-pagination
      v-if="isPagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[100, 200, 300, 400]"
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

const emit = defineEmits(['onChangePage', 'update:currentPage', 'update:pageSize']);

const handleCurrentChange = (val: number) => {
  emit('update:currentPage', val);
  emit('onChangePage');
};

const handleSizeChange = (val: number) => {
  emit('update:pageSize', val);
  emit('onChangePage');
};

const props = withDefaults(defineProps<TableProps>(), {
  isVirtualizedTable: false,
  isPagination: false,
  loading: false,
  currentPage: 1,
  pageSize: 100,
});

const attrs = useAttrs();

const { isVirtualizedTable, isPagination, loading, currentPage, pageSize } = toRefs(props);
</script>

<style lang="scss" scoped>
.default-common-table {
  background-color: #fff;
  display: flex;
  height: 100%;
  flex-flow: column;
  align-items: flex-end;
  .common-pagination {
    margin: 8px 0;
  }
}
</style>
