export const ENDPOINT = 'https://api.hetzner.cloud/v1'

/**
 * Replaces macros in a string.
 *
 * @param {string} str - The route to the resource.
 * @param {object|object[]} macros - A map of macros to replace in the path.
 *
 * @returns {string} The string with macros replaced.
 */
export function replaceMacros (str, macros) {
  if (!Array.isArray(macros)) macros = [macros]
  macros = macros.reverse()
  return str.replace(/\{([^}]+)\}/g, (match, key) => {
    for (const macro of macros) {
      if (typeof macro !== 'object') continue
      if (key in macro) return macro[key]
    }
    return match
  })
}

/**
 * Get a querystring from an object.
 *
 * @param {object} [params={}] - A map of query parameters to send with the request.
 *
 * @returns {string} The querystring.
 */
export function getQueryString (params = {}) {
  return Object.keys(params).reduce((acc, key) => {
    if (params[key]) acc += `${key}=${params[key]}&`
    return acc
  }, '').slice(0, -1)
}
