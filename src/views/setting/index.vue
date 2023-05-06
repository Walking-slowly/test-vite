<template>
  <el-tabs style="height: calc(100vh - 70px); overflow: hidden;" class="demo-tabs">
    <el-tab-pane label="普通表格">
      <commonTable 
        :columns="columns" 
        :data="data"
        border
        isPagination/>
      </el-tab-pane>
    <el-tab-pane label="虚拟滚动表格"><commonTable :columns="columns" isVirtualizedTable :data="data"/></el-tab-pane>
  </el-tabs>
</template>

<script lang="tsx" setup>
import type { Column } from 'element-plus'
import { CellRendererParams } from 'element-plus/es/components/table-v2/src/types'

const columns: Column<any>[] = ([
  {
    title: 'Date',
    width: 200,
    key: 'date',
    dataKey: 'date',
    prop: 'date'
  },
  {
    title: 'Name',
    width: 580,
    key: 'name',
    dataKey: 'name',
    prop: 'name',
    cellRenderer: ({rowData}: any) => {
      return <el-button text type="primary">{ rowData.name || '' }</el-button>
    }
  },
  {
    title: 'Address',
    width: 0,
    key: 'address',
    dataKey: 'address',
    prop: 'address'
  }
])

const data = reactive([
  {
    date: '1111',
    name: 1111,
    address: '测试测试测试测试'
  },
  {
    date: '2222',
    name: 2222,
    address: '测试测试测试测试'
  },
  {
    date: '3333',
    name: 3333,
    address: '测试测试测试测试'
  },
  {
    date: '4444',
    name: 444444,
    address: '测试测试测试测试'
  },
  {
    date: '55555',
    name: 55555,
    address: '测试测试测试测试'
  },
  {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
  {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
  {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
  {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
  {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
  {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
  {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
  {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
   {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
   {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
   {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
   {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  },
   {
    date: '66666',
    name: 66666,
    address: '测试测试测试测试'
  }
])
</script>
