import fetch from 'node-fetch'

import * as utils from './utils.mjs'

/**
 * Iterable GET request.
 *
 * @param {object} meta - Meta information.
 * @param {string} route - The route to the resource.
 * @param {object|object[]} macros - A map of macros to replace in the path.
 * @param {object} params - A map of query parameters to send with the request.
 * @param {number} params.page - Specifies the page to fetch. The number of the first page is 1.
 * @param {number} params.per_page - Specifies the number of items returned per page. The default value is 25, the maximum value is 50.
 */
export default async function * iterator (meta, route, macros, params = {}) {
  const headers = {}
  if (meta.token) headers.Authorization = `Bearer ${meta.token}`

  if (!params.page) params.page = 1

  while (true) {
    const response = await fetch(`${utils.ENDPOINT}/${utils.replaceMacros(route, macros)}?${utils.getQueryString(params)}`, {
      method: 'GET',
      headers
    })

    const data = await response.json()
    for (const type of Object.keys(data)) {
      if (Array.isArray(data[type])) {
        for (const item of data[type]) yield { type, [type]: item }
      } else {
        const item = data[type]
        yield { type, [type]: item }
      }
    }

    if (!(data.meta && data.meta.pagination)) break
    if (data.meta.pagination.page === data.meta.pagination.last_page) break
    params.page++
  }
}
