import http from '@/utils/fetch'

export function queryAdminData(playerRequest) {
  const url = '/admin/queryAdminData'
  return http.post(url, JSON.stringify(playerRequest))
}

export function delAdminData(playerRequest) {
  const url = '/admin/delAdminData'
  return http.post(url, JSON.stringify(playerRequest))
}

export function createAdminData(playerRequest) {
  const url = '/admin/createAdminData'
  return http.post(url, JSON.stringify(playerRequest))
}

