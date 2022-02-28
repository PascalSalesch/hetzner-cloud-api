import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

/**
 * TLS/SSL Certificates prove the identity of a Server and are used to encrypt client traffic.
 *
 * @see https://docs.hetzner.cloud/#certificates
 */
export default class Certificate extends RestApi {
  /**
   * Creates a new Certificate.
   *
   * The default type `uploaded` allows for uploading your existing `certificate` and `private_key` in PEM format.
   * You have to monitor its expiration date and handle renewal yourself.
   *
   * In contrast, type managed requests a new Certificate from Let's Encrypt for the specified `domain_names`.
   * Only domains managed by Hetzner DNS are supported. We handle renewal and timely alert the project owner via email if problems occur.
   *
   * For type `managed` Certificates the action key of the response contains the Action that allows for tracking the issuance process.
   * For type `uploaded` Certificates the action is always null.
   *
   * @see https://docs.hetzner.cloud/#certificates-create-a-certificate
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'certificates', {}, params))
    const certificate = new Certificate(hetznerCloud, response.certificate, { fetch: false })
    return certificate
  }

  /**
   * Returns all Certificate objects.
   *
   * @param {object} hetznerCloud - Parameters required to interact with the Hetzner Cloud API.
   * @param {string} hetznerCloud.token - All requests to the Hetzner Cloud API must be authenticated via a API token.
   *
   * @param {object} params - Query parameters.
   * @param {string} params.name - The response will only contain the resources matching the specified name.
   * @param {string} params.label_selector -  The response will only contain resources matching the label selector.
   * @param {string|string[]} params.type - The response will only contain Certificates matching the type. Possible enum values: `uploaded`, `managed`.
   * @param {string|string[]} params.sort - Sort the results by one or more of the following attributes.
   *   Possible enum values:
   *     `id`, `id:asc`, `id:desc`,
   *     `name`, `name:asc`, `name:desc`,
   *     `created`, `created:asc`, `created:desc`
   *
   * @see https://docs.hetzner.cloud/#certificates-get-all-certificates
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'certificates', {}, params)) {
      if (data.certificates) {
        const certificate = new Certificate(hetznerCloud, data.certificates, { fetch: false })
        yield certificate
      }
    }
  }

  /**
   * Gets a specific Certificate object.
   *
   * @param {object} hetznerCloud - Parameters required to interact with the Hetzner Cloud API.
   * @param {string} hetznerCloud.token - All requests to the Hetzner Cloud API must be authenticated via a API token.
   *
   * @param {object} params - Parameters.
   * @param {string} params.id - ID of the Resource.
   *
   * @property {string|null} certificate - Certificate and chain in PEM format, in order so that each record directly certifies the one preceding.
   * @property {string} created - Point in time when the Resource was created (in ISO-8601 format).
   * @property {string[]} domain_names - Domains and subdomains covered by the Certificate.
   * @property {string|null} fingerprint - SHA256 fingerprint of the Certificate.
   * @property {number} id - ID of the Resource.
   * @property {object} labels - User-defined labels (key-value pairs).
   * @property {string} name - Name of the Resource. Must be unique per Project.
   * @property {string|null} not_valid_after - Point in time when the Certificate stops being valid (in ISO-8601 format).
   * @property {string|null} not_valid_before - Point in time when the Certificate becomes valid (in ISO-8601 format).
   * @property {object|null} status - Current status of a type managed Certificate, always null for type uploaded Certificates.
   * @property {string} type - Possible enum values: `uploaded`, `managed`. Type of the Certificate.
   * @property {object[]} used_by - Resources currently using the Certificate.
   * @property {number} used_by.id - ID of resource referenced.
   * @property {string} used_by.type - Type of resource referenced.
   *
   * @see https://docs.hetzner.cloud/#certificates-get-a-certificate
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('certificates/{id}')).certificate); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * Deletes a Certificate.
   *
   * @see https://docs.hetzner.cloud/#certificates-delete-a-certificate
   */
  async delete () {
    await this.fetch
    await this._delete('certificates/{id}')
    this.fetch = Promise.reject(new Error(`The Certificate "${this.name}" was already deleted.`))
  }

  /**
   * Updates the Certificate properties.
   *
   * Note that when updating labels, the Certificate’s current set of labels will be replaced with the labels provided in the request body.
   * So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.
   *
   * Note: if the Certificate object changes during the request, the response will be a “conflict” error.
   *
   * @returns {Promise<Certificate>} - The updated Certificate object.
   *
   * @see https://docs.hetzner.cloud/#certificates-update-a-certificate
   */
  async update () {
    await this.fetch
    const { certificate } = await this._update('certificates/{id}', {}, ['labels', 'name'])
    Object.assign(this, certificate)
  }

  /**
   * Returns all Action objects for a Certificate.
   *
   * You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
   *
   * Only type `managed` Certificates can have Actions. For type `uploaded` Certificates the `actions` key will always contain an empty array.
   *
   * @param {object} params - Query parameters.
   * @param {string|string[]} params.status - The response will contain only Actions with specified statuses: `running`, `success`, `error`.
   * @param {string|string[]} params.sort - Sort the results by one or more of the following attributes.
   *   Possible enum values:
   *     `id`, `id:asc`, `id:desc`,
   *     `command`, `command:asc`, command:desc`,
   *     `status`, status:asc`, status:desc`,
   *     `progress`, `progress:asc`, `progress:desc`,
   *     `started`, started:asc`, started:desc`,
   *     `finished`, `finished:asc`, finished:desc`
   *
   * @see https://docs.hetzner.cloud/#certificate-actions
   * @see https://docs.hetzner.cloud/#certificate-actions-get-all-actions-for-a-certificate
   */
  async * actions (params) {
    await this.fetch
    for await (const data of this._iterator('certificates/{id}/actions', {}, params)) {
      if (data.actions) for (const action of data.actions) yield await this._action(action, { fetch: false })
      if (data.action) yield await this._action(data.action, { fetch: false })
    }
  }

  /**
   * Returns a specific Action for a Certificate. Only type managed Certificates have Actions.
   *
   * @param {object} params - Parameters.
   * @param {string|number} params.action_id - ID of the Action.
   *
   * @returns {Promise<Action>} - The Action object.
   *
   * @see https://docs.hetzner.cloud/#certificate-actions-get-an-action-for-a-certificate
   */
  async action (params) {
    await this.fetch
    const { action } = (await this._get('certificates/{id}/actions/{action_id}', { action_id: params }))
    return await this._action(action, { fetch: false })
  }

  /**
   * Retry a failed Certificate issuance or renewal.
   *
   * Only applicable if the type of the Certificate is `managed` and the issuance or renewal status is `failed`.
   *
   * @returns {Promise<Action>} - The Action object.
   *
   * @see https://docs.hetzner.cloud/#certificate-actions-retry-issuance-or-renewal
   */
  async retry () {
    await this.fetch
    const { action } = (await this._post('certificates/{id}/actions/retry'))
    return await this._action(action, { fetch: false })
  }
}
