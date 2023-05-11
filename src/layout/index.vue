<template>
  <el-container>
    <CommonAside />
    <el-container style="display: flex; flex-flow: column">
      <CommonHeader />
      <CommonMain />
    </el-container>
  </el-container>
</template>

<script lang="tsx">
import { CommonHeader, CommonAside, CommonMain } from './components';
export default defineComponent({
  components: { CommonHeader, CommonAside, CommonMain },
});
</script>
