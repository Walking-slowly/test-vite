import request from '@/utils/request.js'

export function getMenuListBySubsystem(data) {
  return request({
    url: '/api/getMenuListBySubsystem',
    method: 'get',
    data
  })
}