<template>
  <el-header>
    <img src="@/assets/img/logo.png"/>
    <div class="common-header-content">
      <div></div>
      <div class="cursor" @click="handleLoginOut">退出</div>
    </div>
  </el-header>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter()

    const handleLoginOut = () => {
      sessionStorage.clear()
      router.replace({ name: 'login' })
    }

    return { handleLoginOut }
  },
})
</script>


