<script lang="ts" setup>
import lang from 'element-plus/lib/locale/lang/zh-cn';

onMounted(() => {
  // const link = document.createElement('link');
  // link.rel = 'stylesheet';
  // link.href = '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
  // link.crossOrigin = 'anonymous';
  // document.getElementsByTagName('head')[0].appendChild(link);
});
</script>

<template>
  <el-config-provider :locale="lang">
    <router-view />
  </el-config-provider>
</template>
