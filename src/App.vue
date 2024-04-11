<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
onMounted(() => {
  // const link = document.createElement('link');
  // link.rel = 'stylesheet';
  // link.href = '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
  // link.crossOrigin = 'anonymous';
  // document.getElementsByTagName('head')[0].appendChild(link);
});
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
