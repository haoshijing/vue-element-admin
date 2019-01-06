import http from '@/utils/fetch'

export function queryConfigData() {
  return http({
    url: '/config/obtainData',
    method: 'get'
  })
}
export function updateConfigData(updateData) {
  const url = '/config/updateData'
  return http.post(url, JSON.stringify(updateData))
}