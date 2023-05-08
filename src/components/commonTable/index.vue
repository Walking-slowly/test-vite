<template>
  <div class="default-common-table">
    <VirtualizedTable v-bind="attrs" v-if="isVirtualizedTable" :width="width" :height="height"/>
    <DefaultTable v-bind="attrs" v-else/>  

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
  isVirtualizedTable?: Boolean,
  isPagination?: Boolean,
}

interface PageInfo {
  pageSize: Number,
  currentPage: Number,
  total: Number
}

defineOptions({
  name: 'CommonTable',
  inheritAttrs: false
})

const emit = defineEmits<{
  (event: 'changeCallBack', params: Object): null
}>()

const handleCurrentChange = (val: number) => {
  pageInfo.currentPage = val
  emit('changeCallBack', pageInfo)
}

const handleSizeChange = (val: number) => {
  pageInfo.pageSize = val
  emit('changeCallBack', pageInfo)
}

onMounted(() => {
  nextTick(() => {
    const { offsetHeight, offsetWidth } = document.querySelector('.default-common-table') as HTMLElement
    width.value = offsetWidth || 200
    height.value = offsetHeight || 100
  })
})

const props = withDefaults(defineProps<FormProps>(), {
  isVirtualizedTable: () => false,
  isPagination: () => false
})

const attrs =  useAttrs()

const { isVirtualizedTable, isPagination } = toRefs(props)

const pageInfo = reactive<PageInfo>({
  pageSize: 100,
  currentPage: 1,
  total: 20,
})

const width = ref<Number>(200)
const height = ref<Number>(100)

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
