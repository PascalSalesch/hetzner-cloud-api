import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'

/**
 * @see https://docs.hetzner.cloud/#server-types
 */
export default class ServerType extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#server-types-get-all-server-types
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'server_types', {}, params)) {
      if (data.server_types) {
        const serverType = new ServerType(hetznerCloud, data.server_types, { fetch: false })
        yield serverType
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#server-types-get-a-server-type
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('server_types/{id}')).server_type); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }
}
