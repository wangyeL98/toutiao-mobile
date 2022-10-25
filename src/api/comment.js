import request from '@/utils/request'
// 获取评论内容
export const comment = params => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

// 对文章评论点赞
export const likeComment = target => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消对文章评论点赞
export const deLikeComment = target => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 发布文章评论
export const postComment = data => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
