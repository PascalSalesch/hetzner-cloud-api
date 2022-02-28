/* eslint-env node, mocha */

import { assert } from 'chai'

import hetzner, { Action } from '../api.mjs'

// Read the API access token from the environment.
if (typeof process.env.HETZNER_API_KEY === 'undefined') throw new Error('Environment variable HETZNER_API_KEY is not set')
hetzner.token = process.env.HETZNER_API_KEY

describe('hetzner.Action', async () => {
  it('AsyncIterator should respond with Action instances', async () => {
    for await (const action of hetzner.Action) {
      assert.instanceOf(action, Action)
    }
  })

  it('Default export should be a valid first constructor argument', async () => {
    const actionParams = {}

    // eslint-disable-next-line no-unreachable-loop
    for await (const action of hetzner.Action) {
      Object.assign(actionParams, action)
      break
    }

    const action = new Action(hetzner, actionParams)
    await action.fetch
    assert.containsAllKeys(action, [
      'command',
      'error',
      'finished',
      'id',
      'progress',
      'resources',
      'started',
      'status'
    ])
  })
})
