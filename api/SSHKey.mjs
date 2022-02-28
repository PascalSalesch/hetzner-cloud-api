import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

/**
 * @see https://docs.hetzner.cloud/#ssh-keys
 */
export default class SSHKey extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#ssh-keys-create-an-ssh-key
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'ssh_keys', {}, params))
    const sshKey = new SSHKey(hetznerCloud, response.ssh_key, { fetch: false })
    return sshKey
  }

  /**
   * @see https://docs.hetzner.cloud/#ssh-keys-get-all-ssh-keys
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'ssh_keys', {}, params)) {
      if (data.ssh_keys) {
        const sshKey = new SSHKey(hetznerCloud, data.ssh_keys, { fetch: false })
        yield sshKey
      }
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#ssh-keys-get-a-ssh-key
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('ssh_keys/{id}')).ssh_key); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * @see https://docs.hetzner.cloud/#ssh-keys-delete-an-ssh-key
   */
  async delete () {
    await this.fetch
    await this._delete('ssh_keys/{id}')
    this.fetch = Promise.reject(new Error(`The SSH Key "${this.name}" was already deleted.`))
  }

  /**
   * @see https://docs.hetzner.cloud/#ssh-keys-update-an-ssh-key
   */
  async update () {
    await this.fetch
    const response = await this._update('ssh_keys/{id}', {}, ['name', 'labels'])
    Object.assign(this, response.ssh_key)
  }
}
