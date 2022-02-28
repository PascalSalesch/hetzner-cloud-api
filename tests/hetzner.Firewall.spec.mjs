/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Firewall } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Firewall', async () => {
  it('AsyncIterator should respond with Firewall instances', async () => {
    for await (const firewall of hetzner.Firewall) {
      assert.instanceOf(firewall, Firewall)
    }
  })
})
