import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'

/**
 * @see https://docs.hetzner.cloud/#actions
 */
export default class Action extends RestApi {
  /**
   * Returns all Action objects.
   *
   * @param {object} hetznerCloud - Parameters required to interact with the Hetzner Cloud API.
   * @param {string} hetznerCloud.token - All requests to the Hetzner Cloud API must be authenticated via a API token.
   *
   * @param {object} params - Parameters.
   * @param {string|string[]} params.id - The response will contain only Actions with specified IDs.
   * @param {string|string[]} params.status - The response will contain only Actions with specified statuses.
   *   Possible enum values: `running`, `success`, `error`
   * @param {string|string[]} params.sort - Sort the results by one or more of the following attributes.
   *   Possible enum values:
   *     `id`, `id:asc`, `id:desc`,
   *     `command`, `command:asc`, command:desc`,
   *     `status`, status:asc`, status:desc`,
   *     `progress`, `progress:asc`, `progress:desc`,
   *     `started`, started:asc`, started:desc`,
   *     `finished`, `finished:asc`, finished:desc`
   *
   * @see https://docs.hetzner.cloud/#actions-get-all-actions
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'actions', {}, params)) {
      if (data.actions) {
        const action = new Action(hetznerCloud, data.actions, { fetch: false })
        yield action
      }
    }
  }

  /**
   * Returns a specific Action object.
   *
   * @param {object} hetznerCloud - Parameters required to interact with the Hetzner Cloud API.
   * @param {string} hetznerCloud.token - All requests to the Hetzner Cloud API must be authenticated via a API token.
   *
   * @param {object} params - Parameters.
   * @param {string} params.id - ID of the Resource.
   *
   * @see https://docs.hetzner.cloud/#actions-get-an-action
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('actions/{id}')).action); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }
}
