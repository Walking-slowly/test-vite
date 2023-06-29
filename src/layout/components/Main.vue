<template>
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
