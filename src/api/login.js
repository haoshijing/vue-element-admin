import fetch from '@/utils/fetch'

export function loginByUsername(name, password) {
  const data = {
    name,
    password
  }
  return fetch({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return fetch({
    url: '/user/info',
    method: 'get'
  })
}

