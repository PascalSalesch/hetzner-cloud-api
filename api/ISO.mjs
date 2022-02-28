import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'

/**
 * @see https://docs.hetzner.cloud/#isos
 */
export default class ISO extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#isos-get-all-isos
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'isos', {}, params)) {
      if (data.isos) {
        const iso = new ISO(hetznerCloud, data.isos, { fetch: false })
        yield iso
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#isos-get-an-iso
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('isos/{id}')).iso); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }
}
