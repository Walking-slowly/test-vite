<template>
  <el-header>
    <div class="common-header-content">
      <div class="common-header-content__breadcrumb">
        <el-icon :size="28" class="cursor" @click="isCollapse = !isCollapse">
          <Fold v-if="!isCollapse" />
          <Expand v-else />
        </el-icon>
      </div>
      <el-color-picker v-model="color" @change="handleChange" />
      <div class="cursor" @click="handleLoginOut" style="margin-left: 10px">退出</div>
    </div>
  </el-header>
</template>

<script lang="ts">
import { useCommonStore } from '@/store/common.js'

export default defineComponent({
  setup() {
    const router = useRouter()
    const useStore = useCommonStore()

    const color = ref<string>('#008000')

    const isCollapse = computed({
      get: () => useStore.isCollapse,
      set: (val) => useStore.C_SET_ISCOLLAPSE(val)
    })

    const handleLoginOut = () => {
      sessionStorage.clear()
      router.replace({ name: 'login' })
    }

    const mix = (color1: string, color2: string, weight: number) => {
      weight = Math.max(Math.min(Number(weight), 1), 0)
      const r1 = parseInt(color1.substring(1, 3), 16)
      const g1 = parseInt(color1.substring(3, 5), 16)
      const b1 = parseInt(color1.substring(5, 7), 16)
      const r2 = parseInt(color2.substring(1, 3), 16)
      const g2 = parseInt(color2.substring(3, 5), 16)
      const b2 = parseInt(color2.substring(5, 7), 16)
      const r = Math.round(r1 * (1 - weight) + r2 * weight)
      const g = Math.round(g1 * (1 - weight) + g2 * weight)
      const b = Math.round(b1 * (1 - weight) + b2 * weight)
      const _r = ('0' + (r || 0).toString(16)).slice(-2)
      const _g = ('0' + (g || 0).toString(16)).slice(-2)
      const _b = ('0' + (b || 0).toString(16)).slice(-2)
      return '#' + _r + _g + _b
    }

    const handleChange = (value: string) => {
      const node = document.documentElement
      const pre = '--el-color-primary'
      // 源码中的$color-white，也就是白色
      const mixWhite = '#ffffff'

      color.value = value

      node.style.setProperty(pre, color.value as any)

      for (let i = 1; i < 10; i += 1) {
        // 同理
        node.style.setProperty(`${pre}-light-${i}`, mix(color.value as any, mixWhite, i * 0.1))
        node.style.setProperty(`${pre}-dark-${i}`, mix(color.value as any, mixWhite, i * 0.1))
      }
    }

    return {
      color,
      isCollapse,
      handleLoginOut,
      handleChange
    }
  }
})
</script>
