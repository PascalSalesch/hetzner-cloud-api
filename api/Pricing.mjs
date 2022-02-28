import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'

/**
 * @see https://docs.hetzner.cloud/#pricing
 */
export default class Pricing extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#pricing-get-all-prices
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'pricing', {}, params)) {
      if (data.pricing) {
        const pricing = new Pricing(hetznerCloud, data.pricing, { fetch: false })
        yield pricing
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancers-get-a-load-balancer
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('pricing')).pricing); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }
}
