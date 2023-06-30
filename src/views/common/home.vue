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

        <vc-layer-imagery
          :alpha="alpha"
          :brightness="brightness"
          :contrast="contrast"
          :sort-order="20"
        >
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

        <!-- <vc-layer-imagery>
          <vc-imagery-provider-amap
            ref="provider"
            :map-style="6"
            :projection-transforms="projectionTransforms"
            :minimum-level="0"
            :maximum-level="18"
          />
        </vc-layer-imagery> -->
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
} from 'vue-cesium';

const loading = ref(true);
const CesiumRef = ref(null);

const vcConfig = reactive({
  cesiumPath: 'https://unpkg.com/cesium@latest/Build/Cesium/Cesium.js',
});

const onViewerReady = ({ Cesium, viewer }) => {
  CesiumRef.value = Cesium;
  console.log(Cesium, viewer, '222');
  loading.value = false;
};

const onReady = ({ cesiumObject: tileset, viewer }) => {
  const cartographic = CesiumRef.value.Cartographic.fromCartesian(tileset.boundingSphere.center);
  const surface = CesiumRef.value.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    cartographic.height
  );
  const offset = CesiumRef.value.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    0
  );
  const translation = CesiumRef.value.Cartesian3.subtract(
    offset,
    surface,
    new CesiumRef.value.Cartesian3()
  );
  tileset.modelMatrix = CesiumRef.value.Matrix4.fromTranslation(translation);
  viewer.zoomTo(tileset);
};
</script>
