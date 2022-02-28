/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Network } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Network', async () => {
  it('AsyncIterator should respond with Network instances', async () => {
    for await (const network of hetzner.Network) {
      assert.instanceOf(network, Network)
    }
  })
})
