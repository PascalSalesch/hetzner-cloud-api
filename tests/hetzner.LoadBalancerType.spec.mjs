/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { LoadBalancerType } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.LoadBalancerType', async () => {
  it('AsyncIterator should respond with LoadBalancerType instances', async () => {
    for await (const loadBalancerType of hetzner.LoadBalancerType) {
      assert.instanceOf(loadBalancerType, LoadBalancerType)
    }
  })
})
