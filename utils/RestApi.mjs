import get from './get.mjs'
import del from './delete.mjs'
import post from './post.mjs'
import update from './put.mjs'
import iterator from './iterator.mjs'

const actionPromise = import('../api/Action.mjs')
const imagePromise = import('../api/Image.mjs')

export default class RestApi {
  constructor (hetznerCloud) {
    /**
     * Creates an Action instance.
     *
     * @param {object} params - Action parameters.
     * @param {object} options - Action constructor options.
     *
     * @returns {Promise<Action>} An Action instance.
     */
    this._action = async (params, options) => {
      const Action = await actionPromise
      const action = new Action(hetznerCloud, params, options)
      return action
    }

    /**
     * Creates an Image instance.
     *
     * @param {object} params - Image parameters.
     * @param {object} options - Image constructor options.
     *
     * @returns {Promise<Image>} An Image instance.
     */
    this._image = async (params, options) => {
      const Image = await imagePromise
      const image = new Image(hetznerCloud, params, options)
      return image
    }

    /**
     * Makes a GET request to the given path.
     *
     * @param {string} endpoint - The path to the resource.
     * @param {object} macros - A map of macros to replace in the path.
     * @param {object} params - A map of query parameters to send with the request.
     *
     * @returns {Promise<Response>}
     */
    this._get = (endpoint, macros, params) => get(hetznerCloud, endpoint, [this, macros], params)

    /**
     * Makes a POST request to the given path.
     *
     * @param {string} endpoint - The path to the resource.
     * @param {object} macros - A map of macros to replace in the path.
     * @param {object} body - A map of body parameters to send with the request.
     *
     * @returns {Promise<Response>}
     */
    this._post = (endpoint, macros, body) => post(hetznerCloud, endpoint, [this, macros], body)

    /**
     * Makes a DELETE request to the given path.
     *
     * @param {string} endpoint - The path to the resource.
     * @param {object} macros - A map of macros to replace in the path.
     * @param {object} params - A map of query parameters to send with the request.
     *
     * @returns {Promise<Response>}
     */
    this._delete = (endpoint, macros, params) => del(hetznerCloud, endpoint, [this, macros], params)

    /**
     * Makes a PUT request to the given path.
     *
     * @param {string} endpoint - The path to the resource.
     * @param {object} macros - A map of macros to replace in the path.
     * @param {string[]} keys - A list of properties to update.
     *
     * @returns {Promise<Response>}
     */
    this._update = (endpoint, macros, keys) => update(hetznerCloud, endpoint, [this, macros], keys)

    /**
     * Creates an asynchronous iterator for resources on the given GET endpoint.
     *
     * @param {string} endpoint - The path to the resource.
     * @param {object} macros - A map of macros to replace in the path.
     * @param {object} params - A map of query parameters to send with the request.
     *
     * @returns {AsyncIterator<object>}
     */
    this._iterator = (endpoint, macros, params) => iterator(hetznerCloud, endpoint, [this, macros], params)
  }
}
