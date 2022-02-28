import { execSync } from 'child_process'
import { unlinkSync, writeFileSync } from 'fs'
import { resolve as resolvepath, dirname } from 'path'
import { fileURLToPath } from 'url'

import RestApi from '../utils/RestApi.mjs'
import iterator from '../utils/iterator.mjs'
import post from '../utils/post.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @see https://docs.hetzner.cloud/#servers
 */
export default class Server extends RestApi {
  /**
   * @see https://docs.hetzner.cloud/#servers-create-a-server
   */
  static async create (hetznerCloud = {}, params = {}) {
    const response = (await post(hetznerCloud, 'servers', {}, params))
    const server = new Server(hetznerCloud, response.server, { fetch: false })
    return server
  }

  /**
   * @see https://docs.hetzner.cloud/#servers-get-all-servers
   */
  static async * [Symbol.asyncIterator] (hetznerCloud = {}, params = {}) {
    for await (const data of iterator(hetznerCloud, 'servers', {}, params)) {
      if (data.servers) {
        const server = new Server(hetznerCloud, data.servers, { fetch: false })
        yield server
      }
    }
  }

  /**
   * Executes a command on the server.
   */
  async exec (identityFile, command) {
    await this.fetch
    if (!(this.public_net)) throw new Error('Can not connect to a server without a public network.')

    const filename = `tmp.command-${Math.random()}-${Date.now()}.sh`
    const filepath = resolvepath(__dirname, filename)
    writeFileSync(filepath, command, { encoding: 'utf8' })

    const options = `-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${identityFile}`
    execSync(`scp ${options} ${filepath} root@${this.public_net.ipv4.ip}:~/${filename}`, { stdio: 'ignore' })

    let out, err
    try {
      out = execSync(`ssh ${options} root@${this.public_net.ipv4.ip} "chmod +x ~/${filename} && ~/${filename}"`, { stdio: 'pipe' })
      execSync(`ssh ${options} root@${this.public_net.ipv4.ip} "rm -f ~/${filename}"`, { stdio: 'ignore' })
    } catch (e) {
      err = e
    }

    unlinkSync(filepath)
    if (err) throw err
    return out
  }

  /**
   * @see https://docs.hetzner.cloud/#servers-get-a-server
   */
  constructor (hetznerCloud, params, options = {}) {
    super(hetznerCloud)
    Object.assign(this, params)
    const fetch = async () => { Object.assign(this, (await this._get('servers/{id}')).server); return fetch }
    this.fetch = (options.fetch === false) ? Promise.resolve(fetch) : fetch()
  }

  /**
   * @see https://docs.hetzner.cloud/#servers-delete-a-server
   */
  async delete () {
    await this.fetch
    await this._delete('servers/{id}')
    this.fetch = Promise.reject(new Error(`The Server "${this.name}" was already deleted.`))
  }

  /**
   * @see https://docs.hetzner.cloud/#servers-update-a-server
   */
  async update () {
    await this.fetch
    const { server } = await this._update('servers/{id}', {}, ['name', 'labels'])
    Object.assign(this, server)
  }

  /**
   * @see https://docs.hetzner.cloud/#servers-get-metrics-for-a-server
   */
  async metrics (params) {
    await this.fetch
    const { metrics } = (await this._get('servers/{id}/metrics', {}, {
      type: params.type,
      start: params.start,
      end: params.end,
      step: params.step
    }))
    return metrics
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions
   * @see https://docs.hetzner.cloud/#server-actions-get-all-actions-for-a-server
   */
  async * actions (params) {
    await this.fetch
    for await (const data of this._iterator('servers/{id}/actions', {}, params)) {
      if (data.actions) for (const action of data.actions) yield await this._action(action, { fetch: false })
      if (data.action) yield await this._action(data.action, { fetch: false })
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-get-an-action-for-a-server
   */
  async action (params) {
    await this.fetch
    const { action } = (await this._get('servers/{id}/actions/{action_id}', { action_id: params.action_id }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-add-a-server-to-a-placement-group
   */
  async addToPlacementGroup (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/add_to_placement_group', {}, {
      ip_range: body.ip_range
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-attach-an-iso-to-a-server
   */
  async attachISO (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/attach_iso', {}, {
      iso: body.iso
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-attach-a-server-to-a-network
   */
  async attachToNetwork (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/attach_to_network', {}, {
      alias_ips: body.alias_ips,
      ip: body.ip,
      network: body.network
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-change-alias-ips-of-a-network
   */
  async changeAliasIPs (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/change_alias_ips', {}, {
      alias_ips: body.alias_ips,
      network: body.network
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-change-reverse-dns-entry-for-this-server
   */
  async changeDnsPtr (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/change_dns_ptr', {}, {
      dns_ptr: body.dns_ptr,
      ip: body.ip
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-change-server-protection
   */
  async changeProtection (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/change_protection', {}, {
      delete: body.delete,
      rebuild: body.rebuild
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-change-the-type-of-a-server
   */
  async changeType (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/change_type', {}, {
      server_type: body.server_type,
      upgrade_disk: body.upgrade_disk
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-create-image-from-a-server
   */
  async createImage (body) {
    await this.fetch
    const reponse = (await this._post('servers/{id}/actions/create_image', {}, {
      description: body.description,
      labels: body.labels,
      type: body.type
    }))
    return {
      action: await this._action(reponse.action, { fetch: false }),
      image: await this._image(reponse.image, { fetch: false })
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-detach-a-server-from-a-network
   */
  async detachFromNetwork (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/detach_from_network', {}, {
      network: body.network
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-detach-an-iso-from-a-server
   */
  async detachISO () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/detach_iso', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-disable-backups-for-a-server
   */
  async disableBackup () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/disable_backup', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-enable-and-configure-backups-for-a-server
   */
  async enableBackup () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/enable_backup', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-disable-rescue-mode-for-a-server
   */
  async disableRescue () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/disable_rescue', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-enable-rescue-mode-for-a-server
   */
  async enableRescue (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/enable_rescue', {}, {
      ssh_keys: body.ssh_keys,
      type: body.type
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-power-off-a-server
   */
  async poweroff () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/poweroff', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-power-on-a-server
   */
  async poweron () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/poweron', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-soft-reboot-a-server
   */
  async reboot () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/reboot', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-rebuild-a-server-from-an-image
   */
  async rebuild (body) {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/rebuild', {}, {
      image: body.image
    }))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-remove-from-placement-group
   */
  async removeFromPlacementGroup () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/remove_from_placement_group', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-request-console-for-a-server
   */
  async requestConsole () {
    await this.fetch
    const response = (await this._post('servers/{id}/actions/request_console', {}))
    return {
      action: await this._action(response.action, { fetch: false }),
      password: response.password,
      wss_url: response.wss_url
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-reset-a-server
   */
  async reset () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/reset', {}))
    return await this._action(action, { fetch: false })
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-reset-root-password-of-a-server
   */
  async resetPassword () {
    await this.fetch
    const response = (await this._post('servers/{id}/actions/reset_password', {}))
    return {
      action: await this._action(response.action, { fetch: false }),
      root_password: response.root_password
    }
  }

  /**
   * @see https://docs.hetzner.cloud/#server-actions-shutdown-a-server
   */
  async shutdown () {
    await this.fetch
    const { action } = (await this._post('servers/{id}/actions/shutdown', {}))
    return await this._action(action, { fetch: false })
  }
}
