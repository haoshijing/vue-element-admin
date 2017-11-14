import http from '@/utils/fetch'

export function fetchAgentList(query) {
  return http.post(
    'agent/list',
    JSON.stringify(query)
  )
}
export function resetPwd(agentId) {
  return http.get(
    'agent/resetPwd?agentId='.concat(agentId)
  )
}

export function fetchAgentCount(query) {
  return http.post(
    'agent/count',
    JSON.stringify(query)
  )
}
export function obtainUnderPlayer(agentGuid) {
  return http.get('agent/obtainUnderPlayer?agentGuid='.concat(agentGuid))
}
export function obtainUnderAgent(agentId) {
  return http.get('agent/obtainUnderAgent?agentId='.concat(agentId))
}

export function createUpdateAgent(agent) {
  return http.post('agent/createUpdate'
  , JSON.stringify(agent))
}
export function obtainChooseAreaAgentList(currentUserId) {
  return http.get('agent/obtainChooseAreaAgentList?currentAgentId='.concat(currentUserId))
}

export function obtainChooseAgentList() {
  return http.get('agent/obtainChooseAgentList')
}
