import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

/**
 * @see https://docs.hetzner.cloud/#floating-ips
 */
export default class FloatingIP extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#floating-ips-create-a-floating-ip
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'floating_ips', {}, params))
    const floatingIP = new FloatingIP(hetznerCloud, response.floating_ip, { fetch: false })
    return floatingIP
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ips-get-all-floating-ips
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'floating_ips', {}, params)) {
      if (data.floating_ips) {
        const floatingIP = new FloatingIP(hetznerCloud, data.floating_ips, { fetch: false })
        yield floatingIP
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ips-get-a-floating-ip
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('floating_ips/{id}')).floating_ip); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ips-delete-a-floating-ip
   */
  async delete () {
    await this.fetch
    await this._delete('floating_ips/{id}')
    this.fetch = Promise.reject(new Error(`The Floating IP "${this.name}" was already deleted.`))
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ips-update-a-floating-ip
   */
  async update () {
    await this.fetch
    const response = await this._update('floating_ips/{id}', {}, ['description', 'labels', 'name'])
    Object.assign(this, response.floating_ip)
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ip-actions
   * @see https://docs.hetzner.cloud/#floating-ip-actions-get-all-actions-for-a-floating-ip
   */
  async * actions (params) {
    await this.fetch
    for await (const data of this._iterator('floating_ips/{id}/actions', {}, params)) {
      if (data.actions) for (const action of data.actions) yield await this._action(action, { fetch: false })
      if (data.action) yield await this._action(data.action, { fetch: false })
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ip-actions-get-an-action-for-a-floating-ip
   */
  async action (params) {
    await this.fetch
    const { action } = (await this._get('floating_ips/{id}/actions/{action_id}', { action_id: params.action_id }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ip-actions-assign-a-floating-ip-to-a-server
   */
  async assign (body) {
    await this.fetch
    const { action } = (await this._post('floating_ips/{id}/actions/assign', {}, {
      server: body.server
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ip-actions-unassign-a-floating-ip
   */
  async unassign () {
    await this.fetch
    const { action } = (await this._post('floating_ips/{id}/actions/unassign'))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ip-actions-change-reverse-dns-entry-for-a-floating-ip
   */
  async changeDnsPtr (body) {
    await this.fetch
    const { action } = (await this._post('floating_ips/{id}/actions/change_dns_ptr', {}, {
      dns_ptr: body.dns_ptr,
      ip: body.ip
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#floating-ip-actions-change-floating-ip-protection
   */
  async changeProtection (body) {
    await this.fetch
    const { action } = (await this._post('floating_ips/{id}/actions/change_protection', {}, {
      delete: body.delete
    }))
    return await this._action(action, { fetch: false })
  }
}
