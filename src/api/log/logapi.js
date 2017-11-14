import http from '@/utils/fetch'

export function queryLogList(logRequestVo) {
  const url = '/log/list'
  return http.post(url, JSON.stringify(logRequestVo))
}
export function queryLogCount(logRequestVo) {
  const url = '/log/count'
  return http.post(url, JSON.stringify(logRequestVo))
}
