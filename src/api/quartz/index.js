import request from '@/utils/request.js';

// 获取列表
export function listQuery(params) {
  return request({
    url: 'job/listQuery',
    method: 'get',
    params,
  });
}

// 删除列表
export function delObj(jobName, jobGroup) {
  return request({
    url: 'job/' + jobName + '/' + jobGroup,
    method: 'delete',
  });
}

export function addObj(data) {
  return request({
    url: 'job',
    method: 'post',
    data
  })
}

export function putObj(data) {
  return request({
    url: 'job',
    method: 'post',
    data
  })
}

// 关闭
export function pause(data) {
  return request({
    url: 'job/pause',
    method: 'post',
    data
  })
}

// 开启
export function resume(data) {
  return request({
    url: 'job/resume',
    method: 'post',
    data
  })
}

export function trigger(data) {
  return request({
    url: 'job/trigger',
    method: 'post',
    data
  })
}

export function scheduleJobLog(params) {
  return request({
      url: 'scheduleJobLog/page',
      method: 'get',
      params
  })
}
