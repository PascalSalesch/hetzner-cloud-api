import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

/**
 * @see https://docs.hetzner.cloud/#volumes
 */
export default class Volume extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#volumes-create-a-volume
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'volumes', {}, params))
    const volume = new Volume(hetznerCloud, response.volume, { fetch: false })
    return volume
  }

  /**
   * @see https://docs.hetzner.cloud/#volumes-get-all-volumes
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'volumes', {}, params)) {
      if (data.volumes) {
        const volume = new Volume(hetznerCloud, data.volumes, { fetch: false })
        yield volume
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#volumes-get-a-volume
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('volumes/{id}')).volume); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * @see https://docs.hetzner.cloud/#volumes-delete-a-volume
   */
  async delete () {
    await this.fetch
    await this._delete('volumes/{id}')
    this.fetch = Promise.reject(new Error(`The Volume "${this.name || this.id}" was already deleted.`))
  }

  /**
   * @see https://docs.hetzner.cloud/#volumes-update-a-volume
   */
  async update () {
    await this.fetch
    const { volume } = await this._update('volumes/{id}', {}, ['name', 'labels'])
    Object.assign(this, volume)
  }

  /**
   * @see https://docs.hetzner.cloud/#volume-actions
   * @see https://docs.hetzner.cloud/#volume-actions-get-all-actions-for-a-volume
   */
  async * actions (params) {
    await this.fetch
    for await (const data of this._iterator('volumes/{id}/actions', {}, params)) {
      if (data.actions) for (const action of data.actions) yield await this._action(action, { fetch: false })
      if (data.action) yield await this._action(data.action, { fetch: false })
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#volume-actions-get-an-action-for-a-volume
   */
  async action (params) {
    await this.fetch
    const { action } = (await this._get('volumes/{id}/actions/{action_id}', { action_id: params.action_id }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#volume-actions-attach-volume-to-a-server
   */
  async attach (body) {
    await this.fetch
    const { action } = (await this._post('volumes/{id}/actions/attach', {}, {
      automount: body.automount,
      server: body.server
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#volume-actions-detach-volume
   */
  async detach () {
    await this.fetch
    const { action } = (await this._post('volumes/{id}/actions/detach', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#volume-actions-change-volume-protection
   */
  async changeProtection (body) {
    await this.fetch
    const { action } = (await this._post('volumes/{id}/actions/change_protection', {}, {
      delete: body.delete
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#volume-actions-resize-volume
   */
  async resize (body) {
    await this.fetch
    const { action } = (await this._post('volumes/{id}/actions/resize', {}, {
      size: body.size
    }))
    return await this._action(action, { fetch: false })
  }
}
