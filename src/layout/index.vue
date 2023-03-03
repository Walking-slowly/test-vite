<template>
  <el-container style="flex-flow: column;">
    <Header/>
    <el-container>
      <Aside/>
      <Main/>
    </el-container>
  </el-container>
</template>

<script lang="tsx">
import { Header, Aside, Main } from './components'
export default defineComponent({
    components: { Header, Aside, Main }
})

</script>