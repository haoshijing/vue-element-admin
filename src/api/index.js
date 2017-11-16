import http from '@/utils/fetch'

export function currentDayTotal() {
  return http.get(
    'index/currentDayTotal'
  )
}
