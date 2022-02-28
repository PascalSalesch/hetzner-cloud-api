import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

/**
 * @see https://docs.hetzner.cloud/#load-balancers
 */
export default class LoadBalancer extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#load-balancers-create-a-load-balancer
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'load_balancers', {}, params))
    const loadBalancer = new LoadBalancer(hetznerCloud, response.load_balancer, { fetch: false })
    return loadBalancer
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancers-get-all-load-balancers
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'load_balancers', {}, params)) {
      if (data.load_balancers) {
        const loadBalancer = new LoadBalancer(hetznerCloud, data.load_balancers, { fetch: false })
        yield loadBalancer
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancers-get-a-load-balancer
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('load_balancers/{id}')).load_balancer); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancers-delete-a-load-balancer
   */
  async delete () {
    await this.fetch
    await this._delete('load_balancers/{id}')
    this.fetch = Promise.reject(new Error(`The LoadBalancer "${this.name || this.id}" was already deleted.`))
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancers-update-a-load-balancer
   */
  async update () {
    await this.fetch
    const response = await this._update('load_balancers/{id}', {}, ['name', 'labels'])
    Object.assign(this, response.load_balancer)
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancers-get-metrics-for-a-loadbalancer
   */
  async metrics (params) {
    await this.fetch
    const { metrics } = (await this._get('load_balancers/{id}/metrics', {}, {
      type: params.type,
      start: params.start,
      end: params.end,
      step: params.step
    }))
    return metrics
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions
   * @see https://docs.hetzner.cloud/#load-balancer-actions-get-all-actions-for-a-load-balancer
   */
  async * actions (params) {
    await this.fetch
    for await (const data of this._iterator('load_balancers/{id}/actions', {}, params)) {
      if (data.actions) for (const action of data.actions) yield await this._action(action, { fetch: false })
      if (data.action) yield await this._action(data.action, { fetch: false })
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-get-an-action-for-a-load-balancer
   */
  async action (params) {
    await this.fetch
    const { action } = (await this._get('load_balancers/{id}/actions/{action_id}', { action_id: params.action_id }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-add-service
   */
  async addService (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/add_service', {}, {
      destination_port: body.destination_port,
      health_check: body.health_check,
      http: body.http,
      listen_port: body.listen_port,
      protocol: body.protocol,
      proxyprotocol: body.proxyprotocol
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-delete-service
   */
  async deleteService (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/delete_service', {}, {
      listen_port: body.listen_port
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-update-service
   */
  async updateService (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/update_service', {}, {
      destination_port: body.destination_port,
      health_check: body.health_check,
      http: body.http,
      listen_port: body.listen_port,
      protocol: body.protocol,
      proxyprotocol: body.proxyprotocol
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-add-target
   */
  async addTarget (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/add_target', {}, {
      ip: body.ip,
      label_selector: body.label_selector,
      server: body.server,
      listen_port: body.listen_port,
      type: body.type,
      use_private_ip: body.use_private_ip
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-remove-target
   */
  async removeTarget (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/remove_target', {}, {
      ip: body.ip,
      label_selector: body.label_selector,
      server: body.server,
      type: body.type
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-attach-a-load-balancer-to-a-network
   */
  async attachToNetwork (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/attach_to_network', {}, {
      ip: body.ip,
      network: body.network
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-detach-a-load-balancer-from-a-network
   */
  async detachFromNetwork (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/detach_from_network', {}, {
      network: body.network
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-enable-the-public-interface-of-a-load-balancer
   */
  async enablePublicInterface () {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/enable_public_interface', {}, {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-disable-the-public-interface-of-a-load-balancer
   */
  async disablePublicInterface () {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/disable_public_interface', {}, {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-change-algorithm
   */
  async changeAlgorithm (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/change_algorithm', {}, {
      type: body.type
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-change-reverse-dns-entry-for-this-load-balancer
   */
  async changeDnsPtr (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/change_dns_ptr', {}, {
      dns_ptr: body.dns_ptr,
      ip: body.ip
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-change-load-balancer-protection
   */
  async changeProtection (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/change_protection', {}, {
      delete: body.delete
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#load-balancer-actions-change-the-type-of-a-load-balancer
   */
  async changeType (body) {
    await this.fetch
    const { action } = (await this._post('load_balancers/{id}/actions/change_type', {}, {
      load_balancer_type: body.load_balancer_type
    }))
    return await this._action(action, { fetch: false })
  }
}
