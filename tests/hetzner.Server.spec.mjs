/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Server } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Server', async () => {
  it('AsyncIterator should respond with Server instances', async () => {
    for await (const server of hetzner.Server) {
      assert.instanceOf(server, Server)
    }
  })
})
