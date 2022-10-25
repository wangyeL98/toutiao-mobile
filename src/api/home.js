import request from '@/utils/request'
export const channel = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}
export const mychannels = (channel) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

export const delUserChannels = (channel) => {
  return request({
    url: `/v1_0/user/channels/${channel}`,
    method: 'DELETE'
  })
}
