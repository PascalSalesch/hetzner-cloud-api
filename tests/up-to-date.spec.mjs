/* eslint-env node, mocha */

/**
 * @fileoverview Contains tests to ensure the repository is up-to-date with the hetzner upstream.
 */

import fs from 'fs'
import url from 'url'
import path from 'path'

import { assert } from 'chai'
import fetch from 'node-fetch'

// path to the folder where the package.json is located
const __ROOT__ = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..')

// list of all api endpoints
const endpoints = []

// list of all classes in the api documentation
const classes = []

// list of all articles
const articles = []

// all /api/ code as a string
let code = fs.readFileSync(path.resolve(__ROOT__, 'api.mjs'), 'utf8')

// download and parse the latest version of the documentation
before(async () => {
  const text = await (await fetch('https://docs.hetzner.cloud/')).text()

  // articles
  const articlesRegex = /href="#([^"]*)"/g
  for (const m of text.matchAll(articlesRegex)) {
    if (!(articles.indexOf(m[1]) !== -1)) articles.push(`#${m[1]}`)
  }

  // endpoints
  const apiRegex = /api\.hetzner\.cloud\/v1\/([^\n< &?\\]*)/g
  for (const m of text.matchAll(apiRegex)) {
    if (!(endpoints.indexOf(m[1]) !== -1)) endpoints.push(m[1])
  }
  endpoints.sort()

  // classes
  for (const endpoint of endpoints) {
    let name = endpoint.includes('/') ? endpoint.split('/').shift() : endpoint
    name = name.endsWith('s') ? name.slice(0, -1) : name
    name = camelize(name.trim())
    name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
    if (name === 'FloatingIp') name = 'FloatingIP'
    if (name === 'Iso') name = 'ISO'
    if (name === 'SshKey') name = 'SSHKey'
    if (!(classes.includes(name))) classes.push(name)
  }

  // code
  await read(path.resolve(__ROOT__, 'api'))
  await read(path.resolve(__ROOT__, 'extensions'))
})

// All api endpoints should be covered
describe('Up-To-Date API', async () => {
  it('should have top-level routes as classes', async () => {
    for (const className of classes) {
      const filepath = path.resolve(__ROOT__, 'api', `${className}.mjs`)
      if (!(fs.existsSync(filepath))) assert.fail(`${path.relative(__ROOT__, filepath)} should exist`)

      const code = fs.readFileSync(filepath, 'utf8')
      if (!(code.includes(`class ${className} `))) assert.fail(`${className} should be a class`)
    }
  })

  it('should mention all endpoints', async () => {
    for (const endpoint of endpoints) {
      if (!(code.includes(endpoint))) {
        assert.fail(`Code should contain ${endpoint}`)
      }
    }
  })

  it('all articles should be covered', async () => {
    for (const article of articles) {
      if (!(code.includes(`https://docs.hetzner.cloud/${article}`))) {
        assert.fail(`https://docs.hetzner.cloud/${article} should be documented`)
      }
    }
  })
})

/* ****************************************************************************************************************** *\
 * Helpers
\* ****************************************************************************************************************** */

/**
 * Camelize a string, cutting the string by multiple separators like
 * hyphens, underscores and spaces.
 *
 * @param {text} string Text to camelize
 *
 * @return string Camelized text
 *
 * @see https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
 */
function camelize (text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, (_match, p1, p2) => {
    if (p2) return p2.toUpperCase()
    return p1.toLowerCase()
  })
}

/**
 * Reads a folder or file and add the plain text to the `code` variable.
 *
 * @param {string} folder - Folder to read.
 */
async function read (folder) {
  for (const dirent of fs.readdirSync(folder, { withFileTypes: true })) {
    if (dirent.isDirectory()) {
      read(path.resolve(folder, dirent.name))
    } else if (dirent.isFile() && dirent.name.endsWith('.mjs')) {
      code = `${code}\n${fs.readFileSync(path.resolve(folder, dirent.name), 'utf8')}`
    }
  }
}
