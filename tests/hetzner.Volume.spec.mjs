/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Volume } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Volume', async () => {
  it('AsyncIterator should respond with Volume instances', async () => {
    for await (const volume of hetzner.Volume) {
      assert.instanceOf(volume, Volume)
    }
  })
})
