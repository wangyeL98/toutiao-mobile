import request from '@/utils/request'
export const getDetails = articleId => {
  return request({
    url: `/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}
