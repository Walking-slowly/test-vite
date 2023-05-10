<!-- 列表 -->

<script lang="tsx">
import type { Column } from 'element-plus'

export default defineComponent({
	name: 'defaultTable',
	inheritAttrs: false,

	props: {
		data: {
			type: Array,
			default: () => []
		}
	},

	setup(props, { attrs }) {
		const { columns = [], ...other } = attrs

		return () => (
			<>
				<el-table {...props} {...other} height={'100%'}>
					{(columns as Column).map((i: Column) => (
						<el-table-column
							{...i}
							label={i.title}
							v-slots={{
								default: (res: any) =>
									i.cellRenderer && i.cellRenderer({ ...res, rowData: res.row })
							}}
						/>
					))}
				</el-table>
			</>
		)
	}
})
</script>
