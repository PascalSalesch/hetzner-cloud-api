import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

/**
 * @see https://docs.hetzner.cloud/#networks
 */
export default class Network extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#networks-create-a-network
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'networks', {}, params))
    const network = new Network(hetznerCloud, response.network, { fetch: false })
    return network
  }

  /**
   * @see https://docs.hetzner.cloud/#networks-get-all-networks
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'networks', {}, params)) {
      if (data.networks) {
        const network = new Network(hetznerCloud, data.networks, { fetch: false })
        yield network
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#networks-get-a-network
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('networks/{id}')).network); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * @see https://docs.hetzner.cloud/#networks-delete-a-network
   */
  async delete () {
    await this.fetch
    await this._delete('networks/{id}')
    this.fetch = Promise.reject(new Error(`The Network "${this.name || this.id}" was already deleted.`))
  }

  /**
   * @see https://docs.hetzner.cloud/#networks-update-a-network
   */
  async update () {
    await this.fetch
    const { network } = await this._update('networks/{id}', {}, ['name', 'labels'])
    Object.assign(this, network)
  }

  /**
   * @see https://docs.hetzner.cloud/#network-actions
   * @see https://docs.hetzner.cloud/#network-actions-get-all-actions-for-a-network
   */
  async * actions (params) {
    await this.fetch
    for await (const data of this._iterator('networks/{id}/actions', {}, params)) {
      if (data.actions) for (const action of data.actions) yield await this._action(action, { fetch: false })
      if (data.action) yield await this._action(data.action, { fetch: false })
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#network-actions-get-an-action-for-a-network
   */
  async action (params) {
    await this.fetch
    const { action } = (await this._get('networks/{id}/actions/{action_id}', { action_id: params.action_id }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#network-actions-add-a-route-to-a-network
   */
  async addRoute (body) {
    await this.fetch
    const { action } = (await this._post('networks/{id}/actions/add_route', {}, {
      destination: body.destination,
      gateway: body.gateway
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#network-actions-add-a-subnet-to-a-network
   */
  async addSubnet (body) {
    await this.fetch
    const { action } = (await this._post('networks/{id}/actions/add_subnet', {}, {
      ip_range: body.ip_range,
      network_zone: body.network_zone,
      type: body.type,
      vswitch_id: body.vswitch_id
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#network-actions-change-ip-range-of-a-network
   */
  async changeIpRange (body) {
    await this.fetch
    const { action } = (await this._post('networks/{id}/actions/change_ip_range', {}, {
      ip_range: body.ip_range
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#network-actions-change-network-protection
   */
  async changeProtection (body) {
    await this.fetch
    const { action } = (await this._post('networks/{id}/actions/change_protection', {}, {
      delete: body.delete
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#network-actions-delete-a-route-from-a-network
   */
  async deleteRoute (body) {
    await this.fetch
    const { action } = (await this._post('networks/{id}/actions/delete_route', {}, {
      destination: body.destination,
      gateway: body.gateway
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#network-actions-delete-a-subnet-from-a-network
   */
  async deleteSubnet (body) {
    await this.fetch
    const { action } = (await this._post('networks/{id}/actions/delete_subnet', {}, {
      ip_range: body.ip_range
    }))
    return await this._action(action, { fetch: false })
  }
}
