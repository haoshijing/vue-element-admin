import http from '@/utils/fetch'

export function queryRobotData(query) {
  return http.post(
    'robot/queryRobotData',
    JSON.stringify(query)
  )
}