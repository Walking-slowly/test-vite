<template>
  <div class="default-common-table">
    <!-- <VirtualizedTable {...attrs} v-if="isVirtualizedTable"/>
    <DefaultTable {...attrs} v-else/>   -->

    <el-pagination
      v-if="isPagination"
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[100, 200, 300, 400]"
      :total="pageInfo.total"
      class="common-pagination"
    />
  </div>
</template>

<script lang="tsx" setup>
import DefaultTable from './default-table.vue'
import VirtualizedTable from './virtualized-table.vue'

interface FormProps {
  isVirtualizedTable?: Boolean,
  isPagination?: Boolean,
}

interface PageInfo {
  pageSize: Number,
  currentPage: Number,
  total: Number
}

const props = withDefaults(defineProps<FormProps>(), {
  isVirtualizedTable: () => false,
  isPagination: () => false
})

// const attrs =  useAttrs()
// console.log(attrs, 'sss')
const { isVirtualizedTable, isPagination } = toRefs(props)
let pageInfo = reactive<PageInfo>({
  pageSize: 100,
  currentPage: 1,
  total: 20,
})

</script>

<style lang="scss" scoped>
.default-common-table {
  background-color: #FFF;
  display: flex;
  height: 100%;
  flex-flow: column;
  align-items: flex-end;
  .common-pagination {
    margin: 8px 0;
  }
}
</style>
