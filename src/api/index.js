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

// 二维码
export function getQrCode() {
  return request({
    url: 'qrCode/getQrCode',
    method: 'get',
  });
}

// 扫码登陆
export function checkQrCodeLogin(params) {
  return request({
    url: 'qrCode/checkQrCodeLogin',
    method: 'get',
    params,
  });
}

export function qrCodeLogin(data) {
  return request({
    url: 'sysUser/qrCodeLogin',
    method: 'post',
    data,
  });
}

// 用户信息
export function getCurrentInfo() {
  return request({
    url: 'sysUser/info',
    method: 'get',
  });
}

// 项目
export function getAuthProjectList(params) {
  return request({
    url: 'report/org/authProjectList',
    method: 'get',
    params,
  });
}

// 项目公司
export function getCompanyList(params) {
  return request({
    url: 'report/baseCompany/list',
    method: 'get',
    params,
  });
}

// 资产类型
export function getSapType(params) {
  return request({
    url: 'assetsInfo/getSapType',
    method: 'get',
    params,
  });
}

// 设施
export function getFacilityForSap(params) {
  return request({
    url: 'assetsInfo/getFacilityForSap',
    method: 'get',
    params,
  });
}

// 车辆
export function getVehInfoForSap(params) {
  return request({
    url: 'assetsInfo/getVehInfoForSap',
    method: 'get',
    params,
  });
}

// 车辆型号
export function getBindVehTypes(params) {
  return request({
    url: 'assetsInfo/getBindVehTypes',
    method: 'get',
    params,
  });
}

// 字典
export function sysDictionary(params) {
  return request({
    url: 'sysDictionary/page',
    method: 'get',
    params,
  });
}

// 查询流程审批人
export function getManagerList(data) {
  return request({
    url: 'process/processBussiness/getManagerList',
    method: 'post',
    data,
  });
}

// 查询流程日志
export function getHisTaskList(data) {
  return request({
    url: 'process/processBusTask/getHisTaskList',
    method: 'post',
    data,
  });
}

// 查询组织树
export function orgTree(params) {
  return request({
    url: 'report/org/orgTree',
    method: 'get',
    params
  });
}