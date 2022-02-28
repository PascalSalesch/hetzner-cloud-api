/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Image } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Image', async () => {
  it('AsyncIterator should respond with Image instances', async () => {
    for await (const image of hetzner.Image) {
      assert.instanceOf(image, Image)
    }
  })
})
