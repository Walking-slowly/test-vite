import request from '@/utils/request.js';

// 获取用户列表
export function getSysUserPage(query) {
  return request({
    url: 'sysUser/page',
    method: 'get',
    params: query,
  });
}

// 删除用户
export function deleteSysUser(id) {
  return request({
    url: `sysUser/${id}`,
    method: 'delete',
  });
}

// 获取详情
export function getObj(id) {
  return request({
    url: 'sysUser/' + id,
    method: 'get',
  });
}

// 查询用户
export function getEmployeeUserPage(params) {
  return request({
    url: 'sysUser/getEmployeeUserPage',
    method: 'get',
    params,
  });
}

// 新增
export function addObj(data) {
  return request({
    url: 'sysUser',
    method: 'post',
    data,
  });
}

// 修改
export function putObj(id, data) {
  return request({
    url: 'sysUser/' + id,
    method: 'put',
    data,
  });
}
