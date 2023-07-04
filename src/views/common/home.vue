<template>
  <div
    v-loading="loading"
    style="width: 100%; height: 99%"
  >
    <vc-config-provider
      :cesium-path="vcConfig.cesiumPath"
      :locale="zhHans"
    >
      <vc-viewer
        :show-credit="false"
        @ready="onViewerReady"
      >
        <vc-primitive-tileset
          ref="primitive"
          url="https://zouyaoji.top/vue-cesium/SampleData/Cesium3DTiles/Tilesets/dayanta/tileset.json"
          @ready="onReady"
        />

        <vc-layer-imagery :sort-order="20">
          <vc-imagery-provider-tianditu
            map-style="cva_c"
            token="436ce7e50d27eede2f2929307e6b33c0"
          />
        </vc-layer-imagery>
        <vc-layer-imagery :sort-order="10">
          <vc-imagery-provider-tianditu
            ref="provider"
            token="436ce7e50d27eede2f2929307e6b33c0"
          />
        </vc-layer-imagery>

        <vc-datasource-geojson
          ref="datasourceRef"
          data="https://zouyaoji.top/vue-cesium/SampleData/geojson/china.json"
          :show="true"
        />
      </vc-viewer>
    </vc-config-provider>
  </div>
</template>

<script setup>
import zhHans from 'vue-cesium/es/locale/lang/zh-hans';
import {
  VcConfigProvider,
  VcViewer,
  VcLayerImagery,
  VcImageryProviderTianditu,
  VcPrimitiveTileset,
  VcDatasourceGeojson,
} from 'vue-cesium';

const loading = ref(true);
let CesiumRef = null;

const vcConfig = reactive({
  cesiumPath: 'https://unpkg.com/cesium@latest/Build/Cesium/Cesium.js',
});

const onViewerReady = ({ Cesium, viewer }) => {
  CesiumRef = Cesium;

  // 左键平移，右键旋转
  viewer.scene.screenSpaceCameraController.zoomEventTypes = [
    Cesium.CameraEventType.WHEEL,
    Cesium.CameraEventType.PINCH,
  ];
  viewer.scene.screenSpaceCameraController.tiltEventTypes = [
    Cesium.CameraEventType.PINCH,
    Cesium.CameraEventType.RIGHT_DRAG,
  ];

  loading.value = false;
};

const onReady = ({ cesiumObject: tileset, viewer }) => {
  const cartographic = CesiumRef.Cartographic.fromCartesian(tileset.boundingSphere.center);
  const surface = CesiumRef.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    cartographic.height
  );
  const offset = CesiumRef.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
  const translation = CesiumRef.Cartesian3.subtract(offset, surface, new CesiumRef.Cartesian3());
  tileset.modelMatrix = CesiumRef.Matrix4.fromTranslation(translation);
  // viewer.zoomTo(tileset);
  setTimeout(() => {
    viewer.flyTo(tileset, {
      duration: 4,
    });
  }, 5500);
};
</script>
