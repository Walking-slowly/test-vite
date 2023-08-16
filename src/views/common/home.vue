<!-- <template>
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
</script> -->

<template>
  <div id="cesiumContainer" />
</template>

<script setup lang="ts">
import * as Cesium from 'cesium';

onMounted(async () => {
  // 相当于密钥，申请使用下边链接中的数据时需要用到
  // Cesium.Ion.defaultAccessToken = '你的token';
  // Cesium.ArcGisMapService.defaultAccessToken = '你的token';

  const viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    //动画小部件
    baseLayerPicker: false,
    //地图图层组件
    fullscreenButton: false,
    //全屏组件
    geocoder: false,
    //地理编码搜索组件
    homeButton: false,
    //首页组件
    infoBox: false,
    //信息框
    sceneModePicker: false,
    //场景模式
    selectionIndicator: false,
    //选取指示器组件
    timeline: false,
    //时间轴
    navigationHelpButton: false,
    //帮助按钮
    navigationInstructionsInitiallyVisible: false,

    // 三维立体效果、水波纹
    // terrainProvider: await Cesium.createWorldTerrainAsync({
    //   requestVertexNormals: true,
    //   requestWaterMask: true,
    // }),
  });

  //利用三维坐标来设置摄像头位置
  viewer.camera.setView({
    // 初始的相机的定位
    destination: Cesium.Cartesian3.fromDegrees(112.721591, 27.794044, 15000),
    orientation: {
      heading: Cesium.Math.toRadians(15), // 水平旋转  -正北方向
      pitch: Cesium.Math.toRadians(-25), // 上下旋转  --俯视朝向
      roll: 0, // 视口翻滚角度
    },
  });

  // viewer.camera.setView({
  //   // 初始的相机的定位
  //   destination: Cesium.Cartesian3.fromDegrees(112.911591, 28.213044, 80000.0),
  //   //方向、视角角度的配置(可以直接用0-1进行设置)
  //   orientation: {
  //     heading: 1,
  //     // 视角
  //     pitch: -1.7,
  //     roll: -45,
  //   },
  // });

  //引入Cesium官方自带的模型（引入自定义的模型需要注意格式）
  // let city = viewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(75343, {}));

  // // 定义建筑的3D样式 层次分明
  // city.style = new Cesium.Cesium3DTileStyle({
  //   color: {
  //     // 条件判断建筑具体的颜色
  //     conditions: [
  //       ['${Height} >= 300', 'rgba(45,0,75,1)'],
  //       ['${Height} >= 200', 'rgb(102,71,151, 1)'],
  //       ['${Height} >= 100', 'rgba(170,162,204,1)'],
  //       ['${Height} >= 50', 'rgba(224,226,238,1)'],
  //       ['${Height} >= 25', 'rgba(252,230,200,1)'],
  //       ['${Height} >= 10', 'rgba(248,176,87,1)'],
  //       ['true', 'rgb(127,59,8, 1)'],
  //     ],
  //   },
  // });

  // 从 GeoJson 文件加载邻域边界
  // Data from : https://data.cityofnewyork.us/City-Government/Neighborhood-Tabulation-Areas/cpf4-rkhq
  //GeoJSON是一种对各种地理数据结构进行编码的格式，基于Javascript对象表示法
  //(JavaScript Object Notation, 简称JSON)的地理空间信息数据交换格式。
  // GeoJSON对象可以表示几何、特征或者特征集合。
  //GeoJSON支持下面几何类型：点、线、面、多点、多线、多面和几何集合
  let geocachePromise = Cesium.GeoJsonDataSource.load(
    'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=430104'
  );
  geocachePromise.then((dataSource) => {
    viewer.dataSources.add(dataSource);
    console.log(dataSource.entities.values, '1');
  });
});
</script>

<style lang="scss">
.cesium-widget-credits {
  display: none !important;
}
</style>
