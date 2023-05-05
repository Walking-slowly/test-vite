<script lang="tsx">
import DefaultTable from './default-table.vue'
import VirtualizedTable from './virtualized-table.vue'

export default defineComponent({
  name: 'CommonTable',

  components: {DefaultTable, VirtualizedTable},

  props: {
    isVirtualizedTable: {
      type: Boolean,
      default: false
    }
  },

  setup({ isVirtualizedTable }, { attrs }) {
    return () => <>{ isVirtualizedTable ? <VirtualizedTable {...attrs}/> : <DefaultTable {...attrs}/> }</>
  }
})
</script>
