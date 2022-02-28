/* eslint-env node, mocha */

/**
 * @fileoverview Contains tests to ensure a maintainable repository.
 */

import fs from 'fs'
import url from 'url'
import path from 'path'

import { assert } from 'chai'

// path to the folder where the package.json is located
const __ROOT__ = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..')

// files to be checked
const documentation = [
  ['LICENSE'],
  ['.github', 'ACKNOWLEDGMENTS.md'],
  ['.github', 'AUTHORS.md'],
  ['.github', 'CHANGELOG.md'],
  ['.github', 'CODE_OF_CONDUCT.md'],
  ['.github', 'CODEOWNERS'],
  ['.github', 'CONTRIBUTING.md'],
  ['.github', 'FUNDING.yml'],
  ['.github', 'README.md'],
  ['.github', 'SECURITY.md'],
  ['.github', 'SUPPORT.md'],
  ['.github', 'ISSUE_TEMPLATE', 'BUG_REPORT.md'],
  ['.github', 'ISSUE_TEMPLATE', 'FEATURE_REQUEST.md'],
  ['.github', 'ISSUE_TEMPLATE', 'QUESTION.md'],
  ['.github', 'PULL_REQUEST_TEMPLATE', 'MAJOR.md'],
  ['.github', 'PULL_REQUEST_TEMPLATE', 'MINOR.md'],
  ['.github', 'PULL_REQUEST_TEMPLATE', 'PATCH.md']
]

for (const doc of documentation) {
  const docpath = path.resolve(__ROOT__, ...(Array.isArray(doc) ? doc : [doc]))

  describe(path.relative(__ROOT__, docpath), async () => {
    // file should exists
    it('should exist', () => assert.strictEqual(fs.existsSync(docpath), true))

    // file should be readable
    it('should contain content', () => {
      const size = fs.statSync(docpath).size
      assert.isAtLeast(size, 0)
    })
  })
}
