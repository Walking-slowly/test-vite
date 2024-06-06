import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index.ts';
import { useCommonStore } from '@/store/common.ts';

const downloadErrorLog = (content, filename) => {
  // 创建隐藏的可下载链接
  let eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  let blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

const service = axios.create({
  baseURL: import.meta.env.VITE_BASIC_API,
  timeout: 60000,
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
    const badMessage = error.message || error;
    const code = parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''));
    showError({ code, message: badMessage });
    return Promise.reject(error);
  }
);

function showError(error) {
  // token失效
  if (error.code === 401 || error.code === 401044) {
    const useStore = useCommonStore();
    ElMessage.error('登录已过期，请重新登录！');
    useStore.$reset();
    sessionStorage.clear();
    localStorage.clear();
    router.replace({ name: 'login' });
  } else if (error.code === 80000) {
    downloadErrorLog(error.msg || error.message, '错误信息');
  } else {
    ElMessage.error(error.msg || error.message || '服务异常');
  }
}

export default service;
