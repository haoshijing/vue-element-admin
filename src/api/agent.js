import http from '@/utils/fetch'

export function queryAgentList(query) {
  return http.post(
    'agent/queryList',
    JSON.stringify(query)
  )
}
