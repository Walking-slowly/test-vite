import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index.ts';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASIC_API,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

service.interceptors.request.use(
  config => {
    config.headers['timestamp'] = new Date().getTime();
    // JWT鉴权处理
    if (sessionStorage.getItem('token')) {
      config.headers['token'] = sessionStorage.getItem('token');
    }
    return config;
  },
  error => {
    console.error(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 200 || res.code === 0) {
      return res.data;
    } else {
      showError(res);
      return Promise.reject(res);
    }
  },
  error => {
    console.error(error); // for debug
    const badMessage = error.message || error;
    const code = parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''));
    showError({ code, message: badMessage });
    return Promise.reject(error);
  }
);

function showError(error) {
  // token失效
  if (error.code === 401) {
    ElMessage({
      message: '登录已过期，请重新登录！',
      type: 'error',
      duration: 3 * 1000,
    });
    sessionStorage.clear();
    router.replace({ name: 'login' });
  } else {
    ElMessage({
      message: error.msg || error.message || '服务异常',
      type: 'error',
      duration: 3 * 1000,
    });
  }
}

export default service;
