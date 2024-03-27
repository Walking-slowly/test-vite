import request from '@/utils/request.js';

// 获取角色列表
export function getSysRolePage(query) {
  return request({
    url: 'sysRole/page',
    method: 'get',
    params: query,
  });
}

// 删除角色
export function deleteSysRole(id) {
  return request({
    url: `sysRole/${id}`,
    method: 'delete',
  });
}

// 新增角色
export function addObj(data) {
  return request({
    url: 'sysRole',
    method: 'post',
    data,
  });
}

// 修改角色
export function putObj(id, data) {
  return request({
    url: 'sysRole/' + id,
    method: 'put',
    data,
  });
}

// 所有菜单，按钮树
export function getRoleMenuTree() {
  return request({
    url: 'sysMenu/tree',
    method: 'get',
  });
}

// 权限菜单
export function getRoleMenu(params) {
  return request({
    url: 'sysrolemenu/getRoleMenu',
    method: 'get',
    params,
  });
}

// 设置权限
export function bind(data) {
  return request({
    url: 'sysrolemenu/bind',
    method: 'post',
    data,
  });
}
