import request from '@/utils/request.js';

// 获取列表
export function getSapAssetsPage(params) {
  return request({
    url: 'assetsInfo/page',
    method: 'get',
    params,
  });
}

// 获取统计
export function getSapTotal(params) {
  return request({
    url: 'assetsInfo/getSapTotal',
    method: 'get',
    params,
  });
}

// 获取详情
export function getSapDetail(id) {
  return request({
    url: `assetsInfo/getSapDetail/${id}`,
    method: 'get',
  });
}

// 保存
export function saveSapBind(data) {
  return request({
    url: `assetsInfo/saveSapBind`,
    method: 'post',
    data,
  });
}
