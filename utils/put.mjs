import fetch from 'node-fetch'

import * as utils from './utils.mjs'

/**
 * RESTful PUT request.
 *
 * @param {object} meta - Meta information.
 * @param {string} route - The route to the resource.
 * @param {object|object[]} macros - A map of macros to replace in the path.
 * @param {string[]} keys - The properties to update. Values are taken from macros.
 */
export default async function PUT (meta, route, macros, keys) {
  const headers = { 'Content-Type': 'application/json' }
  if (meta.token) headers.Authorization = `Bearer ${meta.token}`

  const body = {}
  for (const key of keys) {
    for (const macro of macros) {
      if (key in macro) {
        body[key] = macro[key]
        break
      }
    }
  }

  const response = await fetch(`${utils.ENDPOINT}/${utils.replaceMacros(route, macros)}`, {
    method: 'GET',
    headers,
    body: JSON.stringify(body)
  })

  return await response.json()
}
