<template>
  <el-container style="background-color: #efefef">
    <CommonAside />
    <el-container style="display: flex; flex-flow: column; margin: 0 8px">
      <CommonHeader />
      <CommonMain />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { CommonHeader, CommonAside, CommonMain } from './components';
export default defineComponent({
  components: { CommonHeader, CommonAside, CommonMain },
});
</script>
