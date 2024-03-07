<template>
  <el-header>
    <div class="common-header-content">
      <div class="common-header-content__breadcrumb">
        <span
          style="display: flex"
          @click="isCollapse = !isCollapse"
        >
          <common-icon
            :size="20"
            :name="!isCollapse ? 'icon-fold' : 'icon-expand'"
          />
        </span>

        <el-breadcrumb
          separator="/"
          style="margin-left: 15px"
        >
          <el-breadcrumb-item
            v-for="(item, i) in breadcrumbData"
            :key="i"
            :to="i === breadcrumbData.length - 1 ? null : { path: breadcrumbData[breadcrumbData.length - 1].path }"
            >{{ item.meta.title }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>

      <div
        style="display: flex"
        @click="handleToggleFullscreen"
      >
        <common-icon
          :name="isFullscreen ? 'icon-exitFullscreen' : 'icon-fullscreen'"
          :size="22"
        />
      </div>

      <!-- <el-switch
        v-model="isDarkTheme"
        inline-prompt
        style="margin-left: 15px"
        active-icon="Moon"
        inactive-icon="Sunny"
        @change="toggleDark()"
      /> -->

      <el-dropdown
        :show-timeout="0"
        placement="bottom"
        style="margin-left: 15px"
      >
        <span class="flex-center">
          <common-icon
            name="icon-avatar"
            :size="34"
          />
          <span style="margin-left: 5px; font-size: 16px">{{ formModel.username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.self.stop="updatePassowrdVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.self.stop="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-dialog
      v-model="updatePassowrdVisible"
      :close-on-click-modal="false"
      title="修改密码"
      width="440"
      :before-close="handleClose"
    >
      <common-form
        ref="updatePasswordForm"
        v-model="formModel"
        label-width="80px"
        :rules="rules"
        :cols="[
          {
            elType: 'el-input',
            span: 24,
            prop: 'username',
            disabled: true,
            label: '账号',
          },
          {
            elType: 'el-input',
            span: 24,
            type: 'password',
            prop: 'password',
            label: '原密码',
            placeholder: '请输入',
          },
          {
            elType: 'el-input',
            span: 24,
            type: 'password',
            prop: 'newPassword',
            label: '新密码',
            placeholder: '请输入',
          },
          {
            elType: 'el-input',
            span: 24,
            type: 'password',
            prop: 'confirmPassword',
            label: '确认密码',
            placeholder: '请输入',
          },
        ]"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button
            :loading="loading"
            @click="handleClose"
            >取 消</el-button
          >
          <el-button
            type="primary"
            :loading="loading"
            @click="handleSubmit"
          >
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-header>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common.js';
import { useDark /* useToggle */ } from '@vueuse/core';
import { ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import type { RouteRow } from '@/router/index.ts';

import screenfull from 'screenfull';

import { updatePwd, getCurrentInfo } from '@/api/index.js';

defineOptions({
  name: 'CommonHeader',
});

type RouteRows = typeof RouteRow;

interface RuleForm {
  username: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const router = useRouter();
const route = useRoute();
const useStore = useCommonStore();

let breadcrumbData = ref<RouteRows>([]);
// 面包屑
watch(
  route,
  (newValue, oldValue) => {
    breadcrumbData.value = (newValue.matched || []).filter(i => i.meta.title);
  },
  {
    immediate: true,
  }
);

let formModel = ref({
  username: '',
  password: '',
  newPassword: '',
  confirmPassword: '',
});
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入', trigger: 'blur' }],
  password: [{ required: true, message: '请输入', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (formModel.value.newPassword !== value) {
          callback(new Error('确认密码与新密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
});

// 获取用户信息
const getCurrentInfoFc = () => {
  getCurrentInfo().then(data => {
    formModel.value.username = data.realName || data.username;
    useStore.SET_USERINFO({
      username: data.realName || data.username,
      mobile: data.mobile,
    });
  });
};
getCurrentInfoFc();

// 修改密码
let loading = ref(false);
const updatePasswordForm = ref<FormInstance>();
const updatePassowrdVisible = ref(false);

const handleClose = () => {
  (updatePasswordForm.value as FormInstance).resetFields();
  updatePassowrdVisible.value = false;
};
const handleSubmit = () => {
  (updatePasswordForm.value as FormInstance).validate().then(() => {
    loading.value = true;
    updatePwd({
      password: formModel.value.password,
      newPassword: formModel.value.newPassword,
    })
      .then(() => {
        resetInfo();
        setTimeout(() => {
          loading.value = false;
        }, 500);
      })
      .catch(() => {
        loading.value = false;
      });
  });
};

// 深色切换
const isDarkTheme = computed({
  get: () => useStore.isDarkTheme,
  set: val => useStore.SET_ISTHEME(val),
});
const isDark = useDark();
isDark.value = isDarkTheme.value;
// const toggleDark = useToggle(isDark);

// 是否展开
const isCollapse = computed({
  get: () => useStore.isCollapse,
  set: val => useStore.SET_ISCOLLAPSE(val),
});

//是否全屏
let isFullscreen = computed({
  get: () => useStore.isFullscreen,
  set: val => useStore.SET_FULLSCREEN(val),
});
const handleToggleFullscreen = () => screenfull.toggle();
const handleChange = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const handleLoginOut = () => {
  ElMessageBox.confirm('请确认是否退出?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      resetInfo();
      router.replace({ name: 'login' });
    })
    .catch(() => {});
};

const resetInfo = () => {
  useStore.$reset();
  localStorage.clear();
  sessionStorage.clear();
  router.replace({ name: 'login' });
};

onMounted(() => {
  screenfull.on('change', handleChange);
});

onUnmounted(() => {
  screenfull.off('change', handleChange);
});
</script>
