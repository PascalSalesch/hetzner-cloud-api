/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { PlacementGroup } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.PlacementGroup', async () => {
  it('AsyncIterator should respond with PlacementGroup instances', async () => {
    for await (const placementGroup of hetzner.PlacementGroup) {
      assert.instanceOf(placementGroup, PlacementGroup)
    }
  })
})
