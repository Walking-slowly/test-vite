<template>
  <div
    v-loading="loading"
    class="common-map"
  >
    <div
      id="container"
      style="width: 100%; height: 100%"
    />

    <el-autocomplete
      v-if="isSearch"
      v-model="searchValue"
      placeholder="请输入"
      popper-class="common-map__search"
      :fetch-suggestions="querySearch"
      clearable
      :trigger-on-focus="false"
      @select="handleSelect"
      @clear="handleClear"
    >
      <template #suffix>
        <el-icon>
          <location />
        </el-icon>
      </template>
      <template #default="{ item }">
        <div class="name">{{ item.name }}</div>
        <span class="addr">{{ item.address }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { Location } from '@element-plus/icons-vue';

window._AMapSecurityConfig = {
  securityJsCode: '5f731c2508a53d424cbdbc27753a0136',
};

let map = null;
let placeSearch = null;
let marker = null;

const props = defineProps({
  // 创建时的扩展属性
  mapParams: {
    type: Object,
    default: () => {},
  },

  // 是否显示搜索
  isSearch: {
    type: Boolean,
    default: false,
  },

  // 画点
  drawMarker: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['complete', 'update:modelValue']);

const { mapParams, isSearch, drawMarker } = toRefs(props);
const searchValue = ref();
const loading = ref(true);

const querySearch = (queryString, cb) => {
  if (!queryString || !placeSearch) {
    cb([]);
  } else {
    placeSearch.search(queryString, (status, { info, poiList }) => {
      if (info === 'OK') {
        cb(poiList.pois || []);
      } else {
        cb([]);
      }
    });
  }
};

const handleSelect = ({ name, location }) => {
  searchValue.value = name;
  if (!map) return;

  map.panTo(location);
  if (marker) marker.setMap(null);
  marker = new AMap.Marker({
    map: map,
    position: location,
    anchor: 'bottom-center',
    icon: new AMap.Icon({
      image: 'https://a.amap.com/jsapi/static/image/plugin/marker_red.png',
      imageSize: [26, 30],
    }),
  });

  if (drawMarker.value) emit('update:modelValue', { lng: location.getLng(), lat: location.getLat(), address: name });
};

const handleClear = () => {
  if (marker) marker.setMap(null);
  emit('update:modelValue', {});
};

onMounted(() => {
  AMapLoader.load({
    key: '62c0f918ee3e13d0ea18e4e38b1b2ade', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then(AMap => {
      map = new AMap.Map('container', {
        zoom: 13,
        mapStyle: 'amap://styles/a8e0a56b55f9e3cc29507acba41504c7',
        ...mapParams,
      });

      // 地图加载完成
      map.on('complete', () => {
        loading.value = false;
        emit('complete', map);
      });

      // 地图是否支持搜索
      if (isSearch.value) {
        AMap.plugin(['AMap.PlaceSearch'], () => {
          //构造地点查询类
          placeSearch = new AMap.PlaceSearch({
            pageSize: 90, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: '010', // 兴趣点城市
            citylimit: false, //是否强制限制在设置的城市内搜索
          });
        });
      }

      // 点击画点
      if (drawMarker.value) {
        map.plugin(['AMap.MouseTool', 'AMap.Geocoder'], function () {
          map.setDefaultCursor('crosshair');
          let mousetool = new AMap.MouseTool(map);

          // 使用鼠标工具，在地图上画标记点
          mousetool.marker({
            icon: new AMap.Icon({
              image: 'https://a.amap.com/jsapi/static/image/plugin/marker_red.png',
              imageSize: [26, 30],
            }),
          });
          mousetool.on('draw', ({ obj }) => {
            const LngLat = obj.getPosition();
            handleClear();
            marker = new AMap.Marker({
              map: map,
              position: LngLat,
              anchor: 'bottom-center',
              icon: new AMap.Icon({
                image: 'https://a.amap.com/jsapi/static/image/plugin/marker_red.png',
                imageSize: [26, 30],
              }),
            });

            const Geocoder = new AMap.Geocoder();
            Geocoder.getAddress(LngLat, (status, res) => {
              if (status === 'complete' && res.info === 'OK') {
                emit('update:modelValue', {
                  lng: LngLat.getLng(),
                  lat: LngLat.getLat(),
                  address: res.regeocode.formattedAddress,
                });
              } else {
                emit('update:modelValue', { lng: LngLat.getLng(), lat: LngLat.getLat(), address: '' });
              }
            });

            obj.setMap(null);
          });
        });
      }
    })
    .catch(e => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.clearMap();
  map?.destroy();
});
</script>

<style scoped lang="scss">
.common-map {
  position: relative;
  width: 100%;
  height: 100%;
  ::v-deep(.el-autocomplete) {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 240px !important;
  }
}
</style>

<style lang="scss">
.common-map__search {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}
</style>
