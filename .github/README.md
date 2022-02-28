<img src="https://docs.hetzner.cloud/logo.svg" alt="Logo of Hetzner">

# Hetzner Cloud API &middot; ![Tests](https://github.com/pascalsalesch/hetzner-cloud-api/actions/workflows/tests.yml/badge.svg)
> https://docs.hetzner.cloud/#overview

JavaScript client for the Hetzner Cloud API.

- [Getting Started][1]
- [API Reference][2]




## Getting started

The package is availabe in GitHubs Package registry.

```sh
npm install @pascalsalesch/hetzner-cloud-api
```

This will add the package to your `node_modules` folder. You can now import the package.

```js
import hetzner from '@pascalsalesch/hetzner-cloud-api'
```




## API Reference

Import the package and set the API Token. See the [Getting Started Documentation](https://docs.hetzner.cloud/#getting-started) on how to obtain an API Token.

```js
hetzner.token = '<HETZNER_API_TOKEN>'
```


- [Action][3]
- [Certificate][4]
- [Datacenter][5]
- [Firewall][6]
- [FloatingIP][7]
- [Image][8]
- [ISO][9]
- [LoadBalancer][10]
- [LoadBalancerType][11]
- [Location][12]
- [Network][13]
- [PlacementGroup][14]
- [Pricing][15]
- [Server][16]
- [ServerType][17]
- [SSHKey][18]
- [Volume][19]



### Action

```js
for await (const action of hetzner.Action) {
  console.log(action)
}
```

- action.fetch



### Certificate

```js
for await (const certificate of hetzner.Certificate) {
  console.log(certificate)
}
```

- Certificate.create
- new Certificate
- certificate.delete
- certificate.update
- certificate.fetch
- certificate.actions
- certificate.action
- certificate.retry



### Datacenter

```js
for await (const datacenter of hetzner.Datacenter) {
  console.log(datacenter)
}
```

- new Datacenter



### Firewall

```js
for await (const firewall of hetzner.Firewall) {
  console.log(firewall)
}
```

- Firewall.create
- new Firewall
- firewall.delete
- firewall.update
- firewall.fetch
- firewall.actions
- firewall.action
- firewall.applyToResources
- firewall.removeFromResources
- firewall.setRules



### FloatingIP

```js
for await (const floatingIP of hetzner.FloatingIP) {
  console.log(floatingIP)
}
```


- FloatingIP.create
- new FloatingIP
- floatingIP.delete
- floatingIP.update
- floatingIP.fetch
- floatingIP.actions
- floatingIP.action
- floatingIP.assign
- floatingIP.unassign
- floatingIP.changeDnsPtr
- floatingIP.changeProtection



### Image

```js
for await (const image of hetzner.Image) {
  console.log(image)
}
```


- new Image
- image.delete
- image.update
- image.fetch
- image.actions
- image.action
- image.changeProtection



### ISO

```js
for await (const iso of hetzner.ISO) {
  console.log(iso)
}
```


- ISO.create
- new ISO



### LoadBalancer

```js
for await (const loadBalancer of hetzner.LoadBalancer) {
  console.log(loadBalancer)
}
```


- LoadBalancer.create
- new LoadBalancer
- loadBalancer.delete
- loadBalancer.update
- loadBalancer.fetch
- loadBalancer.metrics
- loadBalancer.actions
- loadBalancer.action
- loadBalancer.addService
- loadBalancer.deleteService
- loadBalancer.updateService
- loadBalancer.addTarget
- loadBalancer.removeTarget
- loadBalancer.attachToNetwork
- loadBalancer.detachFromNetwork
- loadBalancer.enablePublicInterface
- loadBalancer.disablePublicInterface
- loadBalancer.changeAlgorithm
- loadBalancer.changeDnsPtr
- loadBalancer.changeProtection
- loadBalancer.changeType



### LoadBalancerType

```js
for await (const loadBalancerType of hetzner.LoadBalancerType) {
  console.log(loadBalancerType)
}
```


- new LoadBalancerType



### Location

```js
for await (const location of hetzner.Location) {
  console.log(location)
}
```


- new Location



### Network

```js
for await (const network of hetzner.Network) {
  console.log(network)
}
```


- Network.create
- new Network
- network.delete
- network.update
- network.fetch
- network.actions
- network.action
- network.addRoute
- network.addSubnet
- network.changeIpRange
- network.changeProtection
- network.deleteRoute
- network.deleteSubnet



### PlacementGroup

```js
for await (const placementGroup of hetzner.PlacementGroup) {
  console.log(placementGroup)
}
```


- PlacementGroup.create
- new PlacementGroup
- placementGroup.delete
- placementGroup.update
- placementGroup.fetch



### Pricing

```js
for await (const pricing of hetzner.Pricing) {
  console.log(pricing)
}
```



### Server

```js
for await (const server of hetzner.Server) {
  console.log(server)
}
```



- Server.create
- new Server
- server.delete
- server.update
- server.fetch
- server.metrics
- server.actions
- server.action
- server.addToPlacementGroup
- server.attachISO
- server.attachToNetwork
- server.changeAliasIPs
- server.changeDnsPtr
- server.changeProtection
- server.changeType
- server.createImage
- server.detachFromNetwork
- server.detachISO
- server.disableBackup
- server.enableBackup
- server.disableRescue
- server.enableRescue
- server.poweroff
- server.poweron
- server.reboot
- server.rebuild
- server.removeFromPlacementGroup
- server.requestConsole
- server.reset
- server.resetPassword
- server.shutdown



### ServerType

```js
for await (const serverType of hetzner.ServerType) {
  console.log(serverType)
}
```


- new ServerType



### SSHKey

```js
for await (const sshKey of hetzner.SSHKey) {
  console.log(sshKey)
}
```


- SSHKey.create
- new SSHKey
- sshKey.delete
- sshKey.update
- sshKey.fetch



### Volume

```js
for await (const volume of hetzner.Volume) {
  console.log(volume)
}
```


- Volume.create
- new Volume
- volume.delete
- volume.update
- volume.fetch
- volume.metrics
- volume.actions
- volume.action
- volume.attach
- volume.detach
- volume.changeProtection
- volume.resize




[1]: #getting-started
[2]: #api-reference
[3]: #Action
[4]: #Certificate
[5]: #Datacenter
[6]: #Firewall
[7]: #FloatingIP
[8]: #Image
[9]: #ISO
[10]: #LoadBalancer
[11]: #LoadBalancerType
[12]: #Location
[13]: #Network
[14]: #PlacementGroup
[15]: #Pricing
[16]: #Server
[17]: #ServerType
[18]: #SSHKey
[19]: #Volume
