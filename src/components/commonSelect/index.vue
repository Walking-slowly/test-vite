<script lang="tsx">
import { SelectOptionProxy } from "element-plus"


export default defineComponent({
  name: 'CommonSelect',

  setup(props, { attrs }) {

    const { 
      options,
      ...other
    } = attrs

    return () => (
      <el-select {...other}>
        { (options as Array<SelectOptionProxy>).map(i => <el-option {...i}/>)}
      </el-select>
    )
  }
})
</script>