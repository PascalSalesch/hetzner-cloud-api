/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Certificate } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Certificate', async () => {
  it('AsyncIterator should respond with Certificate instances', async () => {
    for await (const certificate of hetzner.Certificate) {
      assert.instanceOf(certificate, Certificate)
    }
  })
})
