import fetch from 'node-fetch'

import * as utils from './utils.mjs'

/**
 * RESTful DELETE method.
 *
 * @param {object} meta - Meta information.
 * @param {string} route - The route to the resource.
 * @param {object|object[]} macros - A map of macros to replace in the path.
 * @param {object} params - A map of query parameters to send with the request.
 */
export default function DELETE (meta, route, macros, params) {
  const headers = {}
  if (meta.token) headers.Authorization = `Bearer ${meta.token}`

  return fetch(`${utils.ENDPOINT}/${utils.replaceMacros(route, macros)}?${utils.getQueryString(params)}`, {
    method: 'DELETE',
    headers
  })
}
