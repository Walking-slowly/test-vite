<template>
  <el-tabs
    style="height: calc(100vh - 70px); overflow: hidden"
    class="demo-tabs"
  >
    <el-tab-pane label="普通表格">
      <commonTable
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :columns="columns"
        :data="data"
        :loading="loading"
        :border="true"
        is-select
        :is-pagination="true"
        :total="total"
        @on-change-select="onSelectChange"
        @on-change-page="onChangePage"
      />
    </el-tab-pane>
    <el-tab-pane label="虚拟滚动表格">
      <commonTable
        :columns="columns"
        :is-virtualized-table="true"
        :loading="loading"
        :data="data"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="tsx" setup>
import type { Column } from 'element-plus';
import { VNode } from 'vue';
import { getList } from '@/api/index.js';
import { useTable } from '@/hook/useTable.ts';

const columns = computed(
  () =>
    [
      {
        title: 'Date',
        width: 200,
        key: 'date',
        dataKey: 'date',
        prop: 'date',
      },
      {
        title: 'Name',
        width: 580,
        key: 'name',
        dataKey: 'name',
        prop: 'name',
        cellRenderer: ({ rowData }): VNode => {
          return (
            <el-button
              text
              type="primary"
            >
              {rowData.name || ''}
            </el-button>
          );
        },
      },
      {
        title: 'Address',
        width: 0,
        key: 'address',
        dataKey: 'address',
        prop: 'address',
      },
    ] as Column<any>[]
);

// let a = ref(null);
let data = ref([]);

const onSelectChange = (val: any) => {
  console.log(1111, val);
};

const search = () => {
  loading.value = true;
  getList({ currentPage: currentPage.value, pageSize: pageSize.value }).then((res: any) => {
    data.value = res;
    total.value = 200;
    loading.value = false;
  });
};

let { currentPage, pageSize, total, loading, onChangePage } = useTable(search);

search();
</script>
