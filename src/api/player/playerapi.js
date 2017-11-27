import http from '@/utils/fetch'

export function queryPlayerList(playerRequest) {
  const url = '/player/list'
  return http.post(url, JSON.stringify(playerRequest))
}
export function queryPlayerCount(playerRequest) {
  const url = '/player/count'
  return http.post(url, JSON.stringify(playerRequest))
}

export function queryAgentPlayerList(playerRequest) {
  const url = '/player/agentList'
  return http.post(url, JSON.stringify(playerRequest))
}
export function queryAgentPlayerCount(playerRequest) {
  const url = '/player/agentCount'
  return http.post(url, JSON.stringify(playerRequest))
}

export function queryPickList(pickRequest) {
  const url = '/player/queryPickList'
  return http.post(url, JSON.stringify(pickRequest))
}

export function queryPickListForAgent(pickRequest) {
  const url = '/player/queryPickListForAgent'
  return http.post(url, JSON.stringify(pickRequest))
}
