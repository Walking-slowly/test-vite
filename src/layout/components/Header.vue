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
      <!-- <el-color-picker
        v-model="color"
        @change="handleChange"
      /> -->
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

const isDarkTheme = ref(localStorage.getItem('useDarkKEY') === 'dark');

const isDark = useDark({ storageKey: 'useDarkKEY' });
const toggleDark = useToggle(isDark);

// const color = ref<string>('#008000');

const isCollapse = computed({
  get: () => useStore.isCollapse,
  set: (val) => useStore.C_SET_ISCOLLAPSE(val),
});

const handleLoginOut = () => {
  ElMessageBox.confirm('请确认是否退出?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      localStorage.clear();
      router.replace({ name: 'login' });
    })
    .catch(() => {});
};

// const mix = (color1: string, color2: string, weight: number) => {
//   weight = Math.max(Math.min(Number(weight), 1), 0);
//   const r1 = parseInt(color1.substring(1, 3), 16);
//   const g1 = parseInt(color1.substring(3, 5), 16);
//   const b1 = parseInt(color1.substring(5, 7), 16);
//   const r2 = parseInt(color2.substring(1, 3), 16);
//   const g2 = parseInt(color2.substring(3, 5), 16);
//   const b2 = parseInt(color2.substring(5, 7), 16);
//   const r = Math.round(r1 * (1 - weight) + r2 * weight);
//   const g = Math.round(g1 * (1 - weight) + g2 * weight);
//   const b = Math.round(b1 * (1 - weight) + b2 * weight);
//   const _r = ('0' + (r || 0).toString(16)).slice(-2);
//   const _g = ('0' + (g || 0).toString(16)).slice(-2);
//   const _b = ('0' + (b || 0).toString(16)).slice(-2);
//   return '#' + _r + _g + _b;
// };

// const handleChange = (value: string) => {
//   const node = document.documentElement;
//   const pre = '--el-color-primary';
//   // 源码中的$color-white，也就是白色
//   const mixWhite = '#ffffff';

//   color.value = value;

//   node.style.setProperty(pre, color.value as any);

//   for (let i = 1; i < 10; i += 1) {
//     // 同理
//     node.style.setProperty(`${pre}-light-${i}`, mix(color.value as any, mixWhite, i * 0.1));
//     node.style.setProperty(`${pre}-dark-${i}`, mix(color.value as any, mixWhite, i * 0.1));
//   }
// };

// handleChange('#008000');
</script>
