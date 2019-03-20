import http from '@/utils/fetch'

export function queryRAccountRecords(playerRequest) {
  const url = '/record/queryRAccountRecords'
  return http.post(url, JSON.stringify(playerRequest))
}

export function queryRechargeData(playerRequest) {
  const url = '/record/queryRechargeData'
  return http.post(url, JSON.stringify(playerRequest))
}

export function queryRmoneyChangeData(playerRequest) {
  const url = '/record/queryRmoneyChangeData'
  return http.post(url, JSON.stringify(playerRequest))
}

export function queryDailyList(request) {
  const url = '/daily/queryDailyRecords'
  return http.post(url, JSON.stringify(request))
}

export function queryRechargeSum(request) {
  const url = '/record/queryRechargeSum'
  return http.post(url, JSON.stringify(request))
}
