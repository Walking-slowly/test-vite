<template>
  <div class="default-common-table" v-loading="loading">
    <VirtualizedTable v-bind="attrs" v-if="isVirtualizedTable" />
    <DefaultTable v-bind="attrs" v-else />

    <el-pagination
      v-if="isPagination"
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[100, 200, 300, 400]"
      :total="pageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="common-pagination"
    />
  </div>
</template>

<script lang="tsx" setup>
import DefaultTable from './default-table.vue'
import VirtualizedTable from './virtualized-table.vue'

interface FormProps {
  isVirtualizedTable?: boolean
  isPagination?: boolean
  loading?: boolean
}

interface PageInfo {
  pageSize: number
  currentPage: number
  total: number
}

defineOptions({
  name: 'CommonTable',
  inheritAttrs: false
})

const emit = defineEmits<{
  (event: 'onChangePage', params: object): null
}>()

const handleCurrentChange = (val: number) => {
  pageInfo.currentPage = val
  emit('onChangePage', pageInfo)
}

const handleSizeChange = (val: number) => {
  pageInfo.pageSize = val
  emit('onChangePage', pageInfo)
}

const props = withDefaults(defineProps<FormProps>(), {
  isVirtualizedTable: () => false,
  isPagination: () => false,
  loading: () => false
})

const attrs = useAttrs()

const { isVirtualizedTable, isPagination, loading } = toRefs(props)

const pageInfo = reactive<PageInfo>({
  pageSize: 100,
  currentPage: 1,
  total: 20
})
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
