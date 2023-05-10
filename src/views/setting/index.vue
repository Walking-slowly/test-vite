<template>
	<el-tabs style="height: calc(100vh - 70px); overflow: hidden" class="demo-tabs">
		<el-tab-pane label="虚拟滚动表格">
			<commonTable :columns="columns" :isVirtualizedTable="true" :loading="loading" :data="data" />
		</el-tab-pane>
		<el-tab-pane label="普通表格">
			<commonTable
				:columns="columns"
				:data="data"
				:loading="loading"
				:border="true"
				@onChangePage="onChangePage"
				:isPagination="true"
			/>
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="tsx" setup>
import type { Column } from 'element-plus'
import { VNode } from 'vue'
import { getList } from '@/api/index.js'

const columns: Column[] = [
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
		cellRenderer: ({ rowData }: any): VNode => {
			return (
				<el-button text type="primary">
					{rowData.name || ''}
				</el-button>
			)
		}
	},
	{
		title: 'Address',
		width: 0,
		key: 'address',
		dataKey: 'address',
		prop: 'address'
	}
]

let loading = ref<boolean>(false)
let a = ref(null)
let data = ref<any[]>([])

const search = () => {
	loading.value = true
	getList().then((res: any) => {
		data.value = res
		loading.value = false
	})
}

const onChangePage = <T, U>(params: T) => {
	console.log(params, 'paramsparamsparamsparams')
}

search()
</script>
