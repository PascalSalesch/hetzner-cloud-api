import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'

/**
 * Each Datacenter represents a physical entity where virtual machines are hosted.
 *
 * Note that Datacenters are not guaranteed to be entirely independent failure domains.
 *
 * Datacenters in the same Location are connected by very low latency links.
 *
 * Datacenter names are made up of their Location and Datacenter number, for example fsn1-dc8 means Datacenter 8 in Location fsn1.
 *
 * @see https://docs.hetzner.cloud/#datacenters
 */
export default class Datacenter extends RestApi {
  /**
   * Returns all Datacenter objects.
   *
   * @param {object} hetznerCloud - Parameters required to interact with the Hetzner Cloud API.
   * @param {string} hetznerCloud.token - All requests to the Hetzner Cloud API must be authenticated via a API token.
   *
   * @param {object} params - Query parameters.
   * @param {string} params.name - Can be used to filter Datacenters by their name.
   * The response will only contain the Datacenter matching the specified name.
   * When the name does not match the Datacenter name format, an invalid_input error is returned.
   *
   * @see https://docs.hetzner.cloud/#datacenters-get-all-datacenters
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'datacenters', {}, params)) {
      if (data.datacenters) {
        const datacenter = new Datacenter(hetznerCloud, data.datacenters, { fetch: false })
        yield datacenter
      }
    }
  }

  /**
   * Returns a specific Datacenter object.
   *
   * @param {object} hetznerCloud - Parameters required to interact with the Hetzner Cloud API.
   * @param {string} hetznerCloud.token - All requests to the Hetzner Cloud API must be authenticated via a API token.
   *
   * @param {object} params - Parameters.
   * @param {string} params.id - ID of Datacenter.
   *
   * @property {string} description - Description of the Datacenter.
   * @property {number} id - ID of the Resource.
   * @property {string} name - Name of the Resource. Must be unique per Project.
   * @property {object} location - The Datacenter location.
   * @property {string} location.city - City the Location is closest to.
   * @property {string} location.country - ISO 3166-1 alpha-2 code of the country the Location resides in.
   * @property {string} location.description - Description of the Location.
   * @property {number} location.id - ID of the Location.
   * @property {number} location.latitude - Latitude of the city closest to the Location.
   * @property {number} location.longitude - Longitude of the city closest to the Location.
   * @property {string} location.name - Unique identifier of the Location.
   * @property {string} location.network_zone - Name of network zone this Location resides in.
   * @property {object} server_types - The Server types the Datacenter can handle.
   * @property {number[]} server_types.available - IDs of Server types that are supported and for which the Datacenter has enough resources left
   * @property {number[]} server_types.available_for_migration - IDs of Server types that are supported and for which the Datacenter has enough resources left
   * @property {number[]} server_types.supported - IDs of Server types that are supported in the Datacenter.
   *
   * @see https://docs.hetzner.cloud/#datacenters-get-a-datacenter
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('datacenters/{id}')).datacenter); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }
}
