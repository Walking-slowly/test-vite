<template>
  <el-header>
    <div class="common-header-content">
      <div class="common-header-content__breadcrumb">
        <common-icon
          class="cursor"
          :size="28"
          :name="!isCollapse ? 'el-fold' : 'el-expand'"
          @click="isCollapse = !isCollapse"
        />
      </div>
      <el-switch
        v-model="isDarkTheme"
        inline-prompt
        active-icon="Moon"
        inactive-icon="Sunny"
        @change="toggleDark()"
      />
      <div
        class="cursor"
        style="margin-left: 10px"
        @click="handleLoginOut"
      >
        退出
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common.js';
import { useDark, useToggle } from '@vueuse/core';
import { ElMessageBox } from 'element-plus';

defineOptions({
  name: 'CommonHeader',
});

const router = useRouter();
const useStore = useCommonStore();

const isDarkTheme = computed({
  get: () => useStore.isDarkTheme,
  set: (val) => useStore.SET_ISTHEME(val),
});

const isDark = useDark();
isDark.value = isDarkTheme.value;
const toggleDark = useToggle(isDark);

const isCollapse = computed({
  get: () => useStore.isCollapse,
  set: (val) => useStore.SET_ISCOLLAPSE(val),
});

const handleLoginOut = () => {
  ElMessageBox.confirm('请确认是否退出?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      useStore.$reset();
      localStorage.clear();
      sessionStorage.clear();
      router.replace({ name: 'login' });
    })
    .catch(() => {});
};
</script>
