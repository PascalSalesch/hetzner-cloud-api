/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Datacenter } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Datacenter', async () => {
  it('AsyncIterator should respond with Datacenter instances', async () => {
    for await (const datacenter of hetzner.Datacenter) {
      assert.instanceOf(datacenter, Datacenter)
    }
  })
})
