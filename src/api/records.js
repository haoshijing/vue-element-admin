import http from '@/utils/fetch'

export function queryRechargeData(playerRequest) {
  const url = '/recharge/queryRechargeData'
  return http.post(url, JSON.stringify(playerRequest))
}

export function queryRmoneyChangeData(playerRequest) {
  const url = '/recharge/queryRmoneyChangeData'
  return http.post(url, JSON.stringify(playerRequest))
}

