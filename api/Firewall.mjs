import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

/**
 * Firewalls can limit the network access to or from your resources.
 *
 * - When applying a firewall with no in rule all inbound traffic will be dropped. The default for `in` is `DROP`.
 *
 * - When applying a firewall with no out rule all outbound traffic will be accepted. The default for `out` is `ACCEPT`.
 *
 * @see https://docs.hetzner.cloud/#firewalls
 */
export default class Firewall extends RestApi {
  /**
   * Creates a new Firewall.
   *
   * @see https://docs.hetzner.cloud/#firewalls-create-a-firewall
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'firewalls', {}, params))
    const firewall = new Firewall(hetznerCloud, response.firewall, { fetch: false })
    return firewall
  }

  /**
   * Returns all Firewall objects.
   *
   * @see https://docs.hetzner.cloud/#firewalls-get-all-firewalls
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'firewall', {}, params)) {
      if (data.firewalls) {
        const firewall = new Firewall(hetznerCloud, data.firewalls, { fetch: false })
        yield firewall
      }
    }
  }

  /**
   * Gets a specific Firewall object.
   *
   * @see https://docs.hetzner.cloud/#firewalls-get-a-firewall
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('firewalls/{id}')).firewall); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * Deletes a Firewall.
   *
   * @see https://docs.hetzner.cloud/#firewalls-delete-a-firewall
   */
  async delete () {
    await this.fetch
    await this._delete('firewalls/{id}')
    this.fetch = Promise.reject(new Error(`The Firewall "${this.name}" was already deleted.`))
  }

  /**
   * Updates the Firewall.
   *
   * Note that when updating labels, the Firewall's current set of labels will be replaced with the labels provided in the request body.
   * So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.
   *
   * Note: if the Firewall object changes during the request, the response will be a “conflict” error.
   *
   * @see https://docs.hetzner.cloud/#firewalls-update-a-firewall
   */
  async update () {
    await this.fetch
    const { firewall } = await this._update('firewalls/{id}', {}, ['labels', 'name'])
    Object.assign(this, firewall)
  }

  /**
   * Returns all Action objects for a Firewall. You can sort the results by using the sort URI parameter, and filter them with the status parameter.
   *
   * @see https://docs.hetzner.cloud/#firewall-actions
   * @see https://docs.hetzner.cloud/#firewall-actions-get-all-actions-for-a-firewall
   */
  async * actions (params) {
    await this.fetch
    for await (const data of this._iterator('firewalls/{id}/actions', {}, params)) {
      if (data.actions) for (const action of data.actions) yield await this._action(action, { fetch: false })
      if (data.action) yield await this._action(data.action, { fetch: false })
    }
  }

  /**
   * Returns a specific Action for a Firewall.
   *
   * @see https://docs.hetzner.cloud/#firewall-actions-get-an-action-for-a-firewall
   */
  async action (params) {
    await this.fetch
    const { action } = (await this._get('firewalls/{id}/actions/{action_id}', { action_id: params.action_id }))
    return await this._action(action, { fetch: false })
  }

  /**
   * Applies one Firewall to multiple resources.
   *
   * Currently servers (public network interface) and label selectors are supported.
   *
   * @see https://docs.hetzner.cloud/#firewall-actions-apply-to-resources
   */
  async applyToResources (body) {
    await this.fetch
    const { actions } = (await this._post('firewalls/{id}/actions/apply_to_resources', {}, {
      apply_to: body.apply_to
    }))
    return await Promise.all(actions.map(action => this._action(action, { fetch: false })))
  }

  /**
   * Removes one Firewall from multiple resources.
   *
   * Currently only Servers (and their public network interfaces) are supported.
   *
   * @see https://docs.hetzner.cloud/#firewall-actions-remove-from-resources
   */
  async removeFromResources (body) {
    await this.fetch
    const { actions } = (await this._post('firewalls/{id}/actions/remove_from_resources', {}, {
      remove_from: body.remove_from
    }))
    return await Promise.all(actions.map(action => this._action(action, { fetch: false })))
  }

  /**
   * Sets the rules of a Firewall.
   *
   * All existing rules will be overwritten. Pass an empty rules array to remove all rules.
   *
   * @see https://docs.hetzner.cloud/#firewall-actions-set-rules
   */
  async setRules (body) {
    await this.fetch
    const { actions } = (await this._post('firewalls/{id}/actions/set_rules', {}, {
      rules: body.rules
    }))
    return await Promise.all(actions.map(action => this._action(action, { fetch: false })))
  }
}
