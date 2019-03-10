import http from '@/utils/fetch'

export function queryRoomData(query) {
  return http.post(
    'room/queryRoomData',
    JSON.stringify(query)
  )
}
