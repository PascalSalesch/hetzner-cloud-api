/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { FloatingIP } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.FloatingIP', async () => {
  it('AsyncIterator should respond with FloatingIP instances', async () => {
    for await (const floatingIP of hetzner.FloatingIP) {
      assert.instanceOf(floatingIP, FloatingIP)
    }
  })
})
