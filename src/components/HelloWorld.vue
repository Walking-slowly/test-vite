
<script lang="tsx">
import styles from './helloWorld.module.scss'

export default {
  name: 'HelloWorld',

  props: {
    a: Number
  },
  
  setup(props): Function {
    let fildValue = ref<String>('1111')
    let fildValue2 = ref<String>('')
    
    return () => <>
      <el-input v-model={ fildValue.value } />
      <div class={styles.a}>{ props.a }</div>
      <el-date-picker
        v-model={fildValue2.value}
        type="year"
      />
      <ep-edit />
    </>
  } 
  
}
</script>



