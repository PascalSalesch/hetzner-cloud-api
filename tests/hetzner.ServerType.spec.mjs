/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { ServerType } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.ServerType', async () => {
  it('AsyncIterator should respond with ServerType instances', async () => {
    for await (const serverType of hetzner.ServerType) {
      assert.instanceOf(serverType, ServerType)
    }
  })
})
