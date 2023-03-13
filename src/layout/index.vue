<template>
  <el-container style="flex-flow: column;">
    <Header/>
    <el-container style="height: 100%;overflow: hidden;">
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