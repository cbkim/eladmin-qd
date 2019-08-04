import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/nwIncidents',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/nwIncidents/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/nwIncidents',
    method: 'put',
    data
  })
}
