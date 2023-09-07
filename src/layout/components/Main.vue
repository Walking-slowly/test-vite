<template>
  <el-tabs
    v-model="route.path"
    type="card"
    class="main-tabs"
    @tab-click="handleSelectedTab"
    @tab-remove="handleRemoveTab"
  >
    <el-tab-pane
      v-for="item in useStore.routeTabs"
      :key="item.url"
      :label="item.name"
      :name="item.url"
      :closable="!item.noClose"
    />
  </el-tabs>
  <el-scrollbar
    style="width: 100%"
    view-style="min-height: 100%; display: flex;"
  >
    <el-main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            v-if="$route.meta.keepAlive"
          />
        </keep-alive>
        <component
          :is="Component"
          v-if="!$route.meta.keepAlive"
        />
      </router-view>
    </el-main>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common.js';
import type { TabsPaneContext } from 'element-plus';
const route = useRoute();
const router = useRouter();
const useStore = useCommonStore();

const handleSelectedTab = (tab: TabsPaneContext) => {
  const row = useStore.routeTabs.filter(
    <T, K extends keyof T>(i: { url: K }) => i.url === tab.paneName
  );
  if (!row.length) return;
  router.push({
    path: row[0].url,
  });
};

const handleRemoveTab = (url: string) => {
  const i = useStore.routeTabs.findIndex(<T, K extends keyof T>(i: { url: K }) => i.url === url);
  if (i < 0) return;
  if (url === route.path) {
    router.push({
      path: useStore.routeTabs[0].url,
    });
  }
  useStore.routeTabs.splice(i, 1);
};
</script>

<style scoped lang="scss">
.main-tabs {
  padding: 0 8px;
  background-color: #efefef;
  ::v-deep {
    .el-tabs__content {
      display: none;
    }
    .el-tabs__nav,
    .el-tabs__item,
    .el-tabs__header {
      border: 0 !important;
    }

    .el-tabs__item {
      background: #ffffff;
      margin: 0 3px;
      border-radius: 4px;
      color: #333;
    }
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      background: #ffffff;
      border-radius: 4px;
      color: #333;
    }
    .el-tabs__header {
      margin: 5px 0 8px 0;
    }
    .el-tabs__item.is-active {
      background: var(--el-color-primary);
      color: #fff;
    }
  }
}
</style>
