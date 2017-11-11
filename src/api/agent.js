import fetch from '@/utils/fetch'

export function fetchAgentList(query) {
  return fetch({
    url: '/agent/list',
    method: 'post',
    params: query
  })
}
