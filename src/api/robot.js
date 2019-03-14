import http from '@/utils/fetch'

export function queryRobotData(query) {
  return http.post(
    'robot/queryRobotData',
    JSON.stringify(query)
  )
}

export function updateRobotConfig(query) {
  return http.post(
    'robot/updateRobotConfig',
    JSON.stringify(query)
  )
}

export function createRobotPlayer(data) {
  return http.post(
    'robot/createRobotPlayer',
    JSON.stringify(data)
  )
}
