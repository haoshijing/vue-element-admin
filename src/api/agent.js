import http from '@/utils/fetch'

export function queryAgentData(query) {
  return http.post(
    'agent/queryAgentData',
    JSON.stringify(query)
  )
}
