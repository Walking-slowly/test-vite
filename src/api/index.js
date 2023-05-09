import request from '@/utils/request.js'

export function getMenuListBySubsystem(data) {
  return request({
    url: 'getMenuListBySubsystem',
    method: 'get',
    data
  })
}

export function getList(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(request({
        url: 'getList',
        method: 'get',
        data
      }));
    }, 3000);
  });
}