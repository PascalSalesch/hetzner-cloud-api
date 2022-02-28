import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'

/**
 * @see https://docs.hetzner.cloud/#locations
 */
export default class Location extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#locations-get-all-locations
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'locations', {}, params)) {
      if (data.locations) {
        const location = new Location(hetznerCloud, data.locations, { fetch: false })
        yield location
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#locations-get-a-location
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('locations/{id}')).location); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }
}
