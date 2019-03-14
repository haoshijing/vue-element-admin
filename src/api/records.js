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

