import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'

/**
 * @see https://docs.hetzner.cloud/#images
 */
export default class Image extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#images-get-all-images
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'images', {}, params)) {
      if (data.images) {
        const image = new Image(hetznerCloud, data.images, { fetch: false })
        yield image
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#images-get-an-image
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('images/{id}')).image); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * @see https://docs.hetzner.cloud/#images-delete-an-image
   */
  async delete () {
    await this.fetch
    await this._delete('images/{id}')
    this.fetch = Promise.reject(new Error(`The Image "${this.name}" was already deleted.`))
  }

  /**
   * @see https://docs.hetzner.cloud/#images-update-an-image
   */
  async update () {
    await this.fetch
    const { image } = await this._update('images/{id}', {}, ['description', 'labels'])
    Object.assign(this, image)
  }

  /**
   * @see https://docs.hetzner.cloud/#image-actions
   * @see https://docs.hetzner.cloud/#image-actions-get-all-actions-for-an-image
   */
  async * actions (params) {
    await this.fetch
    for await (const data of this._iterator('images/{id}/actions', {}, params)) {
      if (data.actions) for (const action of data.actions) yield await this._action(action, { fetch: false })
      if (data.action) yield await this._action(data.action, { fetch: false })
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#image-actions-get-an-action-for-an-image
   */
  async action (params) {
    await this.fetch
    const { action } = (await this._get('images/{id}/actions/{action_id}', { action_id: params.action_id }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#image-actions-change-image-protection
   */
  async changeProtection (body) {
    await this.fetch
    const { action } = (await this._post('images/{id}/actions/change_protection', {}, {
      delete: body.delete
    }))
    return await this._action(action, { fetch: false })
  }
}
