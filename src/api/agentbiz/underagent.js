import http from '@/utils/fetch'

export function queryUnderAgentList(playerQueryVo) {
  const url = '/agentbiz/queryUnderAgentList'
  return http.post(url, JSON.stringify(playerQueryVo))
}
export function queryUnderAgentCount(playerQueryVo) {
  const url = '/agentbiz/queryUnderAgentCount'
  return http.post(url, JSON.stringify(playerQueryVo))
}
