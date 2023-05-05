<template>
  <el-tabs tab-position="left" style="height: 200px" class="demo-tabs">
    <el-tab-pane label="普通表格"><commonTable :columns="columns"/></el-tab-pane>
    <el-tab-pane label="虚拟滚动表格"><commonTable :columns="columns" isVirtualizedTable/></el-tab-pane>
  </el-tabs>
</template>

<script lang="tsx" setup>
import { Column } from "element-plus";

const columns = reactive([
  {
    title: 'Date',
    width: 200,
    prop: 'date'
  },
  {
    title: 'Name',
    width: 580,
    prop: 'name'
  },
  {
    title: 'Address',
    width: 0,
    prop: 'address'
  }
])
</script>
