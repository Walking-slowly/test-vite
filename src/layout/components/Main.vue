<template>
  <el-tabs
    v-model="currentPath"
    type="card"
    class="main-tabs"
    @tab-click="handleSelectedTab"
    @tab-remove="handleRemoveTab"
  >
    <el-tab-pane
      v-for="item in useStore.routeTabs"
      :key="item.path"
      :label="item.name"
      :name="item.path"
      :closable="!!item.type"
    />
  </el-tabs>
  <el-scrollbar
    max-height="100%"
    style="
      width: 100%;
      border-radius: 4px;
      height: auto;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    "
    view-style="height: 100%; display: flex;"
    wrap-style="max-height: 100%; height: auto"
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
import type { TabsPaneContext, TabPaneName } from 'element-plus';
const route = useRoute();
const router = useRouter();
const useStore = useCommonStore();

const currentPath = computed({
  get: () => route.path,
  set: val => router.push({ path: val }),
});

const handleSelectedTab = (tab: TabsPaneContext) => {
  // const row = useStore.routeTabs.filter(
  //   <T, K extends keyof T>(i: { path: K }) => i.path === tab.paneName
  // );
  // if (!row.length) return;
  currentPath.value = tab.paneName as string;
};

const handleRemoveTab = (path: TabPaneName) => {
  const i = useStore.routeTabs.findIndex(<T, K extends keyof T>(i: { path: K }) => i.path === path);
  if (i < 0) return;
  if (path === route.path) {
    router.push({
      path: useStore.routeTabs[0].path,
    });
  }
  useStore.routeTabs.splice(i, 1);
};
</script>

<style scoped lang="scss">
.main-tabs {
  ::v-deep(.el-tabs__content) {
    display: none;
  }
  ::v-deep(.el-tabs__nav),
  ::v-deep(.el-tabs__item),
  ::v-deep(.el-tabs__header) {
    border: 0 !important;
  }

  ::v-deep(.el-tabs__item) {
    background: #ffffff;
    margin: 0 3px;
    border-radius: 4px;
  }
  & ::v-deep(.el-tabs__item):first-child {
    margin-left: 0;
  }
  & ::v-deep(.el-tabs__item):last-child {
    margin-right: 0;
  }
  ::v-deep(.el-tabs__nav-prev),
  ::v-deep(.el-tabs__nav-next) {
    background: #ffffff;
    border-radius: 4px;
    color: #333;
  }
  ::v-deep(.el-tabs__header) {
    margin: 5px 0 8px 0;
  }
  ::v-deep(.el-tabs__item.is-active) {
    background: var(--el-color-primary);
    color: #fff;
  }
  ::v-deep(.el-tabs__nav-wrap.is-scrollable .el-tabs__nav-scroll) {
    margin: 0 5px;
  }

  ::v-deep(.el-tabs__nav-next),
  ::v-deep(.el-tabs__nav-prev) {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>
