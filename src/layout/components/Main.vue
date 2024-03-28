<template>
  <div style="display: flex; align-items: center; margin: 5px 0 8px 0">
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

    <el-dropdown
      style="height: 100%"
      @command="handleCommand"
    >
      <div class="delete-tab">
        <common-icon
          name="icon-delete"
          :size="20"
        />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item command="b">关闭其它标签页</el-dropdown-item>
          <el-dropdown-item command="c">关闭全部标签页</el-dropdown-item>
          <el-dropdown-item command="d">刷新当前标签页</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
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
    <el-main v-if="isShow">
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

const isShow = ref<boolean>(true);

const currentPath = computed({
  get: () => route.path,
  set: val => router.replace({ path: val }),
});

const routeTabs = computed({
  get: () => useStore.routeTabs,
  set: val => useStore.SET_ROUTETABS(val),
});

const handleSelectedTab = (tab: TabsPaneContext) => {
  // const row = useStore.routeTabs.filter(
  //   <T, K extends keyof T>(i: { path: K }) => i.path === tab.paneName
  // );
  // if (!row.length) return;
  currentPath.value = tab.paneName as string;
};

const handleRemoveTab = (path: TabPaneName) => {
  const i = routeTabs.value.findIndex(<T, K extends keyof T>(i: { path: K }) => i.path === path);
  if (i < 0) return;
  if (path === route.path) {
    router.replace({
      path: routeTabs.value[i - 1].path,
      force: true,
    });
  }
  routeTabs.value.splice(i, 1);
};

const handleCommand = (command: string | number | object) => {
  if (command === 'a') {
    handleRemoveTab(route.path);
  } else if (command === 'b') {
    const i = routeTabs.value.findIndex(<T, K extends keyof T>(i: { path: K }) => i.path === route.path);
    if (i >= 0) {
      routeTabs.value = i === 0 ? [routeTabs.value[0]] : [routeTabs.value[0], routeTabs.value[i]];
    }
  } else if (command === 'c') {
    routeTabs.value.splice(1, routeTabs.value.length - 1);
    router.replace({
      path: routeTabs.value[0].path,
      force: true,
    });
  } else if (command === 'd') {
    handleRefresh();
  }
};

const handleRefresh = () => {
  isShow.value = false;
  nextTick(() => {
    isShow.value = true;
  });
};
</script>

<style scoped lang="scss">
.main-tabs {
  flex: 1;
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
    margin: 0;
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
.delete-tab {
  height: 100%;
  color: #383842;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 6px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 6px;
}
</style>
