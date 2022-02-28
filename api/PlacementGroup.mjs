import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

/**
 * @see https://docs.hetzner.cloud/#placement-groups
 */
export default class PlacementGroup extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#placement-groups-create-a-placementgroup
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'placement_groups', {}, params))
    const placementGroup = new PlacementGroup(hetznerCloud, response.placement_group, { fetch: false })
    return placementGroup
  }

  /**
   * @see https://docs.hetzner.cloud/#placement-groups-get-all-placementgroups
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'placement_groups', {}, params)) {
      if (data.placement_groups) {
        const placementGroup = new PlacementGroup(hetznerCloud, data.placement_groups, { fetch: false })
        yield placementGroup
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#placement-groups-get-a-placementgroup
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('placement_groups/{id}')).placement_group); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * @see https://docs.hetzner.cloud/#placement-groups-delete-a-placementgroup
   */
  async delete () {
    await this.fetch
    await this._delete('placement_groups/{id}')
    this.fetch = Promise.reject(new Error(`The PlacementGroup "${this.id}" was already deleted.`))
  }

  /**
   * @see https://docs.hetzner.cloud/#placement-groups-update-a-placementgroup
   */
  async update () {
    await this.fetch
    const response = await this._update('placement_groups/{id}', {}, ['name', 'labels'])
    Object.assign(this, response.placement_group)
  }
}
