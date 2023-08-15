<template>
  <el-button
    type="primary"
    plain
    class="login"
    @click="handleLogin"
  >
    登录
  </el-button>
</template>

<script lang="ts">
import { login } from '@/api/index.js';
export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();

    const handleLogin = () => {
      localStorage.setItem(
        'token',
        JSON.stringify(
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMzgyOTI0ODU1MSIsInN5c3RlbUNvZGUiOiJTMTAwOCIsInl5eXlNTWRkIjoiMTY3ODg0NTg2MzQzMSIsImV4cCI6MTY3ODkzMjI2M30.zOA1vB4rnkTI-m-3eMSYpk9S3BwOuIgorHUgxNykGO8'
        )
      );
      router.push({ name: 'home' });

      login({ captcha: '', password: 'a123456', username: 'admin', uuid: '' }).then(() => {
        console.log('真实后端接口代理请求成功！');
      });
    };

    return {
      handleLogin,
    };
  },
});
</script>

<style scoped lang="scss">
.webgl {
  position: relative;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
</style>
