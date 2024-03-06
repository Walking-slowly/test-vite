import request from '@/utils/request.js';

// 登陆
export function login(data) {
  return request({
    url: 'sysUser/login',
    method: 'post',
    data,
  });
}

// 菜单
export function nav(params) {
  return request({
    url: 'sysMenu/nav',
    method: 'get',
    params,
  });
}

// 修改密码
export function updatePwd(data) {
  return request({
    url: 'sysUser/updatePwd',
    method: 'put',
    data: data,
  });
}

// 是否填写验证码
export function getVerifStatus(params) {
  return request({
    url: 'sysUser/getVerifStatus',
    method: 'get',
    params,
  });
}

// 用户信息
export function getCurrentInfo() {
  return request({
    url: 'sysUser/info',
    method: 'get',
  });
}
