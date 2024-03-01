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
      login({
        captcha: '',
        password: 'a123456',
        username: 'admin',
        uuid: '',
      }).then((data) => {
        sessionStorage.setItem('token', data.token);
        router.push({ name: 'home' });
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
