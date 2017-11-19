import http from '@/utils/fetch'

export function queryOrderList(orderRequestVo) {
  const url = '/agentbiz/order/agentorderlist'
  return http.post(url, JSON.stringify(orderRequestVo))
}
export function queryOrderCount(orderRequestVo) {
  const url = '/agentbiz/order/agentordercount'
  return http.post(url, JSON.stringify(orderRequestVo))
}

