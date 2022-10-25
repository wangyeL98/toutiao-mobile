import request from '@/utils/request'
export const searchResult = params => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
