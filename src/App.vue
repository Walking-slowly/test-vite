<script lang="ts" setup>
import lang from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="lang">
    <router-view />
  </el-config-provider>
</template>
