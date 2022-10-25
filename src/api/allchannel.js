import request from '@/utils/request'
export const allchannel = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
