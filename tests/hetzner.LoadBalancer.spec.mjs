/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { LoadBalancer } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.LoadBalancer', async () => {
  it('AsyncIterator should respond with LoadBalancer instances', async () => {
    for await (const loadBalancer of hetzner.LoadBalancer) {
      assert.instanceOf(loadBalancer, LoadBalancer)
    }
  })
})
