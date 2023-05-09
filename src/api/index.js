import request from '@/utils/request.js'

export function getMenuListBySubsystem(params) {
  return request({
    url: '/getMenuListBySubsystem',
    method: 'get',
    params
  })
}

export function getList(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(request({
        url: '/getList',
        method: 'get',
        params
      }));
    }, 3000);
  });
}

// 测试
export function login(data) {
  return request({
    url: '/salary/sysUser/login',
    method: 'post',
    data
  })
}