<template>
  <el-header>
    <img src="@/assets/img/logo.png"/>
    <div class="common-header-content">
      <div></div>
      <div class="cursor" @click="$router.replace({ name: 'login' })">退出</div>
    </div>
  </el-header>
</template>

