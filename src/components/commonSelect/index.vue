<script lang="tsx">
export default defineComponent({
	name: 'CommonSelect',
	inheritAttrs: false,

	props: {
		// 下拉数据源
		options: {
			type: Array,
			required: true
		},
		value: [String, Number],
		// 是否展示树形结构
		isTree: {
			type: Boolean,
			default: false
		}
	},

	emits: ['update:value'],

	setup(props, { attrs }) {
		return () => (
			<el-select v-model={[props.value, 'value']} {...attrs}>
				{(props.options || []).map((option: any) => (
					<el-option {...option} />
				))}
			</el-select>
		)
	}
})
</script>
