<template>
  <div style="width: 100%; height: 99%">
    <vc-config-provider :cesium-path="vcConfig.cesiumPath">
      <vc-viewer :show-credit="false" />
    </vc-config-provider>
  </div>
</template>

<script setup>
import { VcConfigProvider, VcViewer } from 'vue-cesium';

const vcConfig = reactive({
  cesiumPath: 'https://unpkg.com/cesium@latest/Build/Cesium/Cesium.js',
});
</script>
