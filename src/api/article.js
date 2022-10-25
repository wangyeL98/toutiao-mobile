import request from '@/utils/request'
export const article = params => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params
  })
}
