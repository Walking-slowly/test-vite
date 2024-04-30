<template>
  <div class="login-page">
    <div class="login-page__logo" />

    <div class="login-page__title">
      <h2>资产管理系统</h2>
      <div>盈峰中联推出的资产一站式管理平台</div>
    </div>

    <div class="login-page__form">
      <div class="login-page__form-content">
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="扫码登录"
            name="second"
            lazy
          >
            <div class="login-page__code">
              <canvas
                ref="QRCodeRef"
                class="qrcodeImgArea"
              />
              <div
                v-if="reloadQrCodeVisible"
                class="reload_login_qrcode"
              >
                <span class="qr_span_title">二维码失效</span>
                <button
                  class="refQrCode"
                  @click="handleGetQrCode"
                >
                  请点击刷新
                </button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="密码登录"
            name="first"
            lazy
          >
            <el-form
              ref="ruleFormRef"
              :model="formValue"
              :rules="rules"
              status-icon
              size="large"
              @keyup.enter="handleLogin()"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="formValue.username"
                  clearable
                  placeholder="账号"
                  @change="handleUserChange"
                >
                  <template #prefix>
                    <common-icon name="icon-user" />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="formValue.password"
                  type="password"
                  clearable
                  placeholder="密码"
                >
                  <template #prefix>
                    <common-icon name="icon-lock" />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="isCaptchaVisiable"
                prop="captcha"
              >
                <el-row :gutter="10">
                  <el-col :span="16">
                    <el-input
                      v-model="formValue.captcha"
                      clearable
                      placeholder="验证码"
                    >
                      <template #prefix>
                        <common-icon name="icon-code" />
                      </template>
                    </el-input>
                  </el-col>
                  <el-col
                    :span="8"
                    class="login-captcha"
                  >
                    <img
                      style="width: 100%; height: 100%"
                      :src="`/assets/sysUser/captcha.jpg?uuid=${formValue.uuid}`"
                      alt=""
                      @click="getCaptcha"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  :loading="loading"
                  class="login-page__formSubmit"
                  @click.prevent="handleLogin"
                  >登 录</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="login-page__footer">
      <div>版权所有：COPYRIGHT © 2020 盈峰环境科技集团股份有限公司</div>
      <div>浙ICP备16025887号-1</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login',
};
</script>

<script lang="ts" setup>
import QRCode from 'qrcode';
import { login, getVerifStatus, getQrCode, checkQrCodeLogin, qrCodeLogin } from '@/api/index.js';
import { getUUID } from '@/utils/index.js';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

interface RuleForm {
  username: string;
  password: string;
  uuid: string;
  captcha: string;
}

const router = useRouter();

let activeName = ref('second');
let isCaptchaVisiable = ref(false);

const QRCodeRef = ref<HTMLCanvasElement>();
const checkQrCodeTimer = ref();
const reloadQrCodeVisible = ref(false);

const ruleFormRef = ref<FormInstance>();
let loading = ref(false);
const formValue = ref<RuleForm>({
  username: '',
  password: '',
  captcha: '',
  uuid: '',
});

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});

const handleLogin = () => {
  (ruleFormRef.value as FormInstance).validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      login({ ...formValue.value })
        .then(({ token }) => {
          sessionStorage.setItem('token', token);
          router.push({ name: 'home' });
          setTimeout(() => {
            loading.value = false;
          }, 500);
        })
        .catch(e => {
          loading.value = false;
          if (e && !['ERR_BAD_RESPONSE', 'ECONNABORTED'].includes(e.code)) getVerifStatusFc(formValue.value.username);
        });
    } else {
      console.log('error submit!', fields);
    }
  });
};

const handleUserChange = val => {
  getVerifStatusFc(val);
};

watch(activeName, newValue => {
  if (newValue === 'second') {
    getQrCodeFc();
  } else {
    clearInterval(checkQrCodeTimer.value);
  }
});

const getQrCodeFc = () => {
  getQrCode().then(({ content, uuid }) => {
    QRCode.toCanvas(QRCodeRef.value, content, function (error) {
      if (error) {
        console.log(error);
      } else {
        checkQrCodeTimer.value = setInterval(() => {
          checkQrCodeLoginFc(uuid);
        }, 3000);
      }
    });
  });
};

const checkQrCodeLoginFc = uniqueCode => {
  checkQrCodeLogin({ uniqueCode }).then(({ flag, loginBean }) => {
    if (flag === 1) {
      qrCodeLogin(loginBean).then(({ token }) => {
        ElMessage.success('扫码登录成功');
        clearInterval(checkQrCodeTimer.value);
        sessionStorage.setItem('token', token);
        router.push({ name: 'home' });
      });
    } else if (flag === 2) {
      clearInterval(checkQrCodeTimer.value);
      reloadQrCodeVisible.value = true;
    }
  });
};

const handleGetQrCode = () => {
  reloadQrCodeVisible.value = false;
  getQrCodeFc();
};

const getVerifStatusFc = userName => {
  getVerifStatus({ userName }).then(data => {
    isCaptchaVisiable.value = data === 1;
    getCaptcha();
  });
};

const getCaptcha = () => {
  formValue.value.uuid = getUUID();
};

getQrCodeFc();
</script>

<style scoped lang="scss">
.login-page {
  background-image: url(@/assets/img/login/banner.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  position: relative;
  &::before {
    position: absolute;
    content: '';
    background-image: url(@/assets/img/login/big-logo.png);
    width: 647.57px;
    height: 666.4px;
    top: 50%;
    transform: translateY(-50%);
    left: 213px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  &__title {
    position: absolute;
    right: 570px;
    color: #ebeef5;
    font-size: 16px;
    text-align: center;
    top: 23%;
    h2 {
      color: #ffffff;
      font-size: 48px;
      line-height: 1;
      margin: 0;
      padding: 0;
      margin-bottom: 15px;
    }
  }
  &__footer {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 22.5px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    line-height: 25px;
  }
  &__logo {
    background-image: url(@/assets/img/login/logo.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    top: 41px;
    left: 45px;
    width: 156.96px;
    height: 38.66px;
  }
  &__form {
    overflow-y: auto;
    position: absolute;
    background-color: #fff;
    right: 0;
    top: 0;
    bottom: 0;
    width: 475px;
  }
  &__formSubmit {
    width: 100%;
    border-radius: 40px;
    font-size: 16px;
  }
  &__form-content {
    width: 350px;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
  &__code {
    width: 390px;
    height: 394px;
    background-image: url('@/assets/img/login/qr_code.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .qrcodeImgArea {
      border: 1px solid #e9e9e9;
      width: 185px;
      height: 200px;
      margin-top: 100px;
      margin-left: 10px;
      position: absolute;
      z-index: 2;
    }
    .reload_login_qrcode {
      margin-top: 100px;
      width: 185px;
      margin-left: 10px;
      position: absolute;
      z-index: 3;
      height: 200px;
      background-color: #e9e9e9;
      filter: alpha(Opacity=90);
      -moz-opacity: 0.9;
      opacity: 0.9;
      .qr_span_title {
        color: #7f9927;
        top: 29%;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        z-index: 1111;
        font-weight: bold;
        font-size: 16px;
      }
      .refQrCode {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        cursor: pointer;
        transform: translate(-50%, -50%);
      }
    }
  }
  ::v-deep(.el-input__inner) {
    font-size: 16px !important;
  }
  ::v-deep(.el-form-item) {
    margin-bottom: 25px;
  }
  ::v-deep(.el-tabs__header),
  ::v-deep(.el-tabs__nav-scroll) {
    margin: 0;
    height: 49px;
  }
  ::v-deep(.el-tabs__item) {
    font-size: 18px;
    color: #383842;
    font-weight: bold;
  }
  ::v-deep(.el-tabs__nav-wrap)::after {
    display: none;
  }
  ::v-deep(.el-tabs__header) {
    margin-bottom: 30px;
  }
  ::v-deep(.el-tabs__active-bar) {
    background-color: transparent;
    height: 5px;
    bottom: -9px;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 40px;
      left: 50%;
      transform: translateX(-50%);
      padding: 0 17px 0 17px;
      background-color: var(--el-color-primary);
      bottom: 0;
      border-radius: 40px;
    }
  }
  ::v-deep(.el-input-group__append),
  ::v-deep(.el-input-group__prepend) {
    background-color: #fff;
    padding: 0 15px;
  }
  ::v-deep(.el-icon) {
    color: #383842 !important;
  }
  ::v-deep(.el-input__prefix-inner > :last-child) {
    margin-right: 10px;
  }
}
</style>
