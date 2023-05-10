<template>
  <el-container>
    <Aside />
    <el-container style="display: flex; flex-flow: column">
      <Header />
      <Main />
    </el-container>
  </el-container>
</template>

<script lang="tsx">
import { Header, Aside, Main } from './components'
export default defineComponent({
  components: { Header, Aside, Main }
})
</script>
