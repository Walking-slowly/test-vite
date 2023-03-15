import request from '@/utils/request.js'

export function getMenuListBySubsystem(data) {
  return request({
    url: 'getMenuListBySubsystem',
    method: 'get',
    data
  })
}