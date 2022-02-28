/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Pricing } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Pricing', async () => {
  it('AsyncIterator should respond with Pricing instances', async () => {
    for await (const price of hetzner.Pricing) {
      assert.instanceOf(price, Pricing)
    }
  })

  it('Default export should be a valid first constructor argument', async () => {
    const pricing = new Pricing(hetzner, {})
    await pricing.fetch
    assert.containsAllKeys(pricing, [
      'currency',
      'vat_rate',
      'image',
      'floating_ip',
      'floating_ips',
      'traffic',
      'server_backup',
      'volume',
      'server_types',
      'load_balancer_types'
    ])
  })
})
