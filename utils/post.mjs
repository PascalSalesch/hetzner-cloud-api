import fetch from 'node-fetch'

import * as utils from './utils.mjs'

/**
 * RESTful POST request.
 *
 * @param {object} meta - Meta information.
 * @param {string} route - The route to the resource.
 * @param {object|object[]} macros - A map of macros to replace in the path.
 * @param {object} body - The body to send with the request.
 */
export default async function POST (meta, route, macros, body) {
  const headers = { 'Content-Type': 'application/json' }
  if (meta.token) headers.Authorization = `Bearer ${meta.token}`

  const response = await fetch(`${utils.ENDPOINT}/${utils.replaceMacros(route, macros)}`, {
    method: 'GET',
    headers,
    body: JSON.stringify(body)
  })

  return await response.json()
}
