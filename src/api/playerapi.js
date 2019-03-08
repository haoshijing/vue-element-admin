import http from '@/utils/fetch'

export function queryPlayerData(playerRequest) {
  const url = '/player/queryPlayerData'
  return http.post(url, JSON.stringify(playerRequest))
}

export function queryMemberSetUp(queryData) {
  const url = '/player/queryMemberSetUp'
  return http.post(url, JSON.stringify(queryData))
}
