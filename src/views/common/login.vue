<template>
  <el-button @click="handleLogin">登录</el-button>
</template>

<script lang="ts">
import { login } from '@/api/index.js'
export default defineComponent({
  setup() {
    const router = useRouter()

    const handleLogin = () => {
      sessionStorage.setItem(
        'token',
        JSON.stringify(
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMzgyOTI0ODU1MSIsInN5c3RlbUNvZGUiOiJTMTAwOCIsInl5eXlNTWRkIjoiMTY3ODg0NTg2MzQzMSIsImV4cCI6MTY3ODkzMjI2M30.zOA1vB4rnkTI-m-3eMSYpk9S3BwOuIgorHUgxNykGO8'
        )
      )
      router.push({ name: 'home' })

      login({ captcha: '', password: 'a123456', username: 'admin', uuid: '' }).then((data: any) => {
        console.log('真实后端接口代理请求成功！')
      })
    }

    return {
      handleLogin
    }
  }
})
</script>
