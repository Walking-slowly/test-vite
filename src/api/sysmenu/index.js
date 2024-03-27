import request from '@/utils/request.js';

// 菜单详情
export function getSysMenuDetails(id) {
  return request({
    url: `sysMenu/${id}`,
    method: 'get',
  });
}

// 菜单列表
export function getAllMenuList() {
  return request({
    url: `sysMenu/getAllMenuList`,
    method: 'get',
  });
}

// 更新菜单 / 按钮
export function putObj(id, obj) {
  return request({
    url: 'sysMenu/' + id,
    method: 'put',
    data: obj,
  });
}

// 新增菜单 / 按钮
export function addObj(data) {
  return request({
    url: 'sysMenu/save',
    method: 'post',
    data,
  });
}

// 删除
export function delObj(id) {
  return request({
    url: 'sysMenu/' + id,
    method: 'delete',
  });
}

// 按钮权限列表
export function getList(params) {
  return request({
    url: 'sysMenu/getList',
    method: 'get',
    params,
  });
}
