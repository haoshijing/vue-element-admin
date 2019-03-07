import fetch from '@/utils/fetch'

export function loginByUsername(name, password) {
  const data = {
    name,
    password
  }
  return fetch({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return fetch({
    url: '/user/info',
    method: 'get'
  })
}

