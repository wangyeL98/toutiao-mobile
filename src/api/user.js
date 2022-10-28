import request from '@/utils/request'
// import store from '@/store'
export const login = data => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data
})
export const send = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET'
})

export const getData = () => request({
  url: '/v1_0/user',
  method: 'GET'
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})

// 关注用户
export const followedUser = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POSt',
    data: {
      target
    }
  })
}

// 取消关注
export const deletedUser = target => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 收藏文章
export const saveArticle = target => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const deSaveArticle = target => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

// 点赞文章
export const loveArticle = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消点赞文章
export const deLoveArticle = target => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

// 获取用户个人信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

// 修改用户资料
export const fixUserInfo = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 修改用户头像
export const fixUserPhoto = data => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
