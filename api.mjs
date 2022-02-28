/**
 * @fileoverview Contains the entrypoint of the package.
 * @author Pascal Salesch <pascal.b.salesch@gmail.com>
 * @license MIT
 *
 * JavaScript port of the Hetzner Cloud API
 * @see https://docs.hetzner.cloud/#overview
 * @see https://docs.hetzner.cloud/#introduction
 */

import ActionApi from './api/Action.mjs'
import CertificateApi from './api/Certificate.mjs'
import DatacenterApi from './api/Datacenter.mjs'
import FirewallApi from './api/Firewall.mjs'
import FloatingIPApi from './api/FloatingIP.mjs'
import ImageApi from './api/Image.mjs'
import ISOApi from './api/ISO.mjs'
import LoadBalancerApi from './api/LoadBalancer.mjs'
import LoadBalancerTypeApi from './api/LoadBalancerType.mjs'
import LocationApi from './api/Location.mjs'
import NetworkApi from './api/Network.mjs'
import PlacementGroupApi from './api/PlacementGroup.mjs'
import PricingApi from './api/Pricing.mjs'
import ServerApi from './api/Server.mjs'
import ServerTypeApi from './api/ServerType.mjs'
import SSHKeyApi from './api/SSHKey.mjs'
import VolumeApi from './api/Volume.mjs'

/**
 * The HetznerCloudApi class provides authorized access to the API endpoints.
 *
 * @property {string} token - The access token. See the link below on how to obtain a token.
 * @see https://docs.hetzner.cloud/#getting-started
 *
 * @property {ActionApi} Action - The Action API.
 * @property {CertificateApi} Certificate - The Certificate API.
 * @property {DatacenterApi} Datacenter - The Datacenter API.
 * @property {FirewallApi} Firewall - The Firewall API.
 * @property {FloatingIPApi} FloatingIP - The FloatingIP API.
 * @property {ImageApi} Image - The Image API.
 * @property {ISOApi} ISO - The ISO API.
 * @property {LoadBalancerApi} LoadBalancer - The LoadBalancer API.
 * @property {LocationApi} Location - The Location API.
 * @property {NetworkApi} Network - The Network API.
 * @property {PlacementGroupApi} PlacementGroup - The PlacementGroup API.
 * @property {PricingApi} Pricing - The Pricing API.
 * @property {ServerApi} Server - The Server API.
 * @property {SSHKeyApi} SSHKey - The SSHKey API.
 * @property {VolumeApi} Volume - The Volume API.
 */
class HetznerCloudApi {
  constructor (params = {}) {
    Object.assign(this, params)
  }

  get Action () {
    const api = this

    class Action extends ActionApi {
      constructor (...params) {
        super(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return ActionApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Action
  }

  get Certificate () {
    const api = this

    class Certificate extends CertificateApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return CertificateApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return CertificateApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Certificate
  }

  get Datacenter () {
    const api = this

    class Datacenter extends DatacenterApi {
      constructor (...params) {
        super(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return DatacenterApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Datacenter
  }

  get Firewall () {
    const api = this

    class Firewall extends FirewallApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return FirewallApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return FirewallApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Firewall
  }

  get FloatingIP () {
    const api = this

    class FloatingIP extends FloatingIPApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return FloatingIPApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return FloatingIPApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return FloatingIP
  }

  get Image () {
    const api = this

    class Image extends ImageApi {
      constructor (...params) {
        super(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return ImageApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Image
  }

  get ISO () {
    const api = this

    class ISO extends ISOApi {
      constructor (...params) {
        super(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return ISOApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return ISO
  }

  get LoadBalancer () {
    const api = this

    class LoadBalancer extends LoadBalancerApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return LoadBalancerApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return LoadBalancerApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return LoadBalancer
  }

  get LoadBalancerType () {
    const api = this

    class LoadBalancerType extends LoadBalancerTypeApi {
      constructor (...params) {
        super(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return LoadBalancerTypeApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return LoadBalancerType
  }

  get Location () {
    const api = this

    class Location extends LocationApi {
      constructor (...params) {
        super(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return LocationApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Location
  }

  get Network () {
    const api = this

    class Network extends NetworkApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return NetworkApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return NetworkApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Network
  }

  get PlacementGroup () {
    const api = this

    class PlacementGroup extends PlacementGroupApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return PlacementGroupApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return PlacementGroupApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return PlacementGroup
  }

  get Pricing () {
    const api = this

    class Pricing extends PricingApi {
      constructor (...params) {
        super(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return PricingApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Pricing
  }

  get Server () {
    const api = this

    class Server extends ServerApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return ServerApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return ServerApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Server
  }

  get ServerType () {
    const api = this

    class ServerType extends ServerTypeApi {
      constructor (...params) {
        super(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return ServerTypeApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return ServerType
  }

  get SSHKey () {
    const api = this

    class SSHKey extends SSHKeyApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return SSHKeyApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return SSHKeyApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return SSHKey
  }

  get Volume () {
    const api = this

    class Volume extends VolumeApi {
      constructor (...params) {
        super(api, ...params)
      }

      static create (...params) {
        return VolumeApi.create(api, ...params)
      }

      static [Symbol.asyncIterator] (...params) {
        return VolumeApi[Symbol.asyncIterator](api, ...params)
      }
    }

    return Volume
  }
}

// Default export is one instance of the API
const hetznerCloud = new HetznerCloudApi()
export default hetznerCloud

// Export HetznerCloudApi class to allow for multiple instances
export const HetznerCloud = HetznerCloudApi

// Export all classes. Api tokens are not set.
export const Action = ActionApi
export const Certificate = CertificateApi
export const Datacenter = DatacenterApi
export const Firewall = FirewallApi
export const FloatingIP = FloatingIPApi
export const Image = ImageApi
export const ISO = ISOApi
export const LoadBalancer = LoadBalancerApi
export const LoadBalancerType = LoadBalancerTypeApi
export const Location = LocationApi
export const Network = NetworkApi
export const PlacementGroup = PlacementGroupApi
export const Pricing = PricingApi
export const Server = ServerApi
export const ServerType = ServerTypeApi
export const SSHKey = SSHKeyApi
export const Volume = VolumeApi
