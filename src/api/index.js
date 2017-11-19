import http from '@/utils/fetch'

export function currentDayTotal() {
  return http.get(
    'index/currentDayTotal'
  )
}

export function getCurrentAgentInfo() {
  return http.get(
    'index/currentAgent'
  )
}
