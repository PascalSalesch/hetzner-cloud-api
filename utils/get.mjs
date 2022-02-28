import fetch from 'node-fetch'

import * as utils from './utils.mjs'

/**
 * RESTful GET method.
 *
 * @param {object} meta - Meta information.
 * @param {string} route - The route to the resource.
 * @param {object|object[]} macros - A map of macros to replace in the path.
 * @param {object} params - A map of query parameters to send with the request.
 */
export default async function GET (meta, route, macros, params) {
  const headers = {}
  if (meta.token) headers.Authorization = `Bearer ${meta.token}`

  const response = await fetch(`${utils.ENDPOINT}/${utils.replaceMacros(route, macros)}?${utils.getQueryString(params)}`, {
    method: 'GET',
    headers
  })

  return await response.json()
}
