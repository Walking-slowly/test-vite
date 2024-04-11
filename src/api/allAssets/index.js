import request from '@/utils/request.js';

// 获取列表
export function getAllList(params) {
  return request({
    url: 'assetsInfo/getAllList',
    method: 'get',
    params,
  });
}

// 新增/修改
export function saveAssetInfo(data) {
  return request({
    url: 'assetsInfo/saveAssetInfo',
    method: 'post',
    data,
  });
}

// 车辆型号
export function getBindVehTypes() {
  return request({
    url: 'assetsInfo/getBindVehTypes',
    method: 'get',
  });
}

// 资产负责人
export function getAssetManagerList(params) {
  return request({
    url: 'assetsInfo/getAssetManagerList',
    method: 'get',
    params,
  });
}

// 详情
export function getInfoDetail(id) {
  return request({
    url: `assetsInfo/getInfoDetail/${id}`,
    method: 'get',
  });
}

// 删除
export function deleteAssets(data) {
  return request({
    url: `assetsInfo/deleteAssets`,
    method: 'post',
    data,
  });
}

// 详情和编辑查询对应的资产类型
export function getAssetTypes(params) {
  return request({
    url: `assetsInfo/getAssetTypes`,
    method: 'get',
    params,
  });
}

// 资产履历
export function getAssetLogList(params) {
  return request({
    url: `assetsInfo/getAssetLogList`,
    method: 'get',
    params,
  });
}
