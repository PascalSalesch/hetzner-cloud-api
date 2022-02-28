import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'

/**
 * @see https://docs.hetzner.cloud/#load-balancer-types
 */
export default class LoadBalancerType extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#load-balancer-types-get-all-load-balancer-types
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'load_balancer_types', {}, params)) {
      if (data.load_balancer_types) {
        const loadBalancerType = new LoadBalancerType(hetznerCloud, data.load_balancer_types, { fetch: false })
        yield loadBalancerType
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-types-get-a-load-balancer-type
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('load_balancer_types/{id}')).load_balancer_type); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }
}
