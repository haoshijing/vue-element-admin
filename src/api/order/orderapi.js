import http from '@/utils/fetch'

export function queryOrderList(orderRequestVo) {
  const url = '/order/list'
  return http.post(url, JSON.stringify(orderRequestVo))
}
export function queryOrderCount(orderRequestVo) {
  const url = '/order/count'
  return http.post(url, JSON.stringify(orderRequestVo))
}
