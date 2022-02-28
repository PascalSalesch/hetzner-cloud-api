/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Location } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Location', async () => {
  it('AsyncIterator should respond with Location instances', async () => {
    for await (const location of hetzner.Location) {
      assert.instanceOf(location, Location)
    }
  })
})
