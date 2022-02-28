/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { ISO } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.ISO', async () => {
  it('AsyncIterator should respond with ISO instances', async () => {
    for await (const iso of hetzner.ISO) {
      assert.instanceOf(iso, ISO)
    }
  })
})
