<template>
  <div class="assets-404">
    <el-button
      type="primary"
      style="position: absolute; left: 50%; top: calc(50% + 180px); transform: translate(-50%, -50%);"
      @click="goHome"
    >返回首页</el-button>
  </div>
</template>

<script setup>
const router = useRouter();

const goHome = () => {
  router.replace({ name: 'home'})
}
</script>

<style scoped lang="css">
.assets-404 {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(@/assets/img/404/null.png);
  background-repeat: no-repeat;
  background-size: 20% auto;
  background-position: center;
}
</style>
