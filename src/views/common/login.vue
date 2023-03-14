<template>
    <el-button @click="handleLogin">登录</el-button>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter()

    const handleLogin = () => {
      sessionStorage.setItem('token', JSON.stringify('ABCDEFGHIJKL'))
      router.push({ name: 'home' })
    }

    return {
      handleLogin
    }
  }
})
</script>
