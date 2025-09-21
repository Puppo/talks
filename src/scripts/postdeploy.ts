#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

let contents = await readFile(resolve(process.cwd(), 'dist/deploy/netlify.toml'), 'utf-8')
const replacement = await readFile(resolve(process.cwd(), 'netlify.toml'), 'utf-8')
contents = contents.replace('[[redirects]]', replacement + '\n\n[[redirects]]')
await writeFile(resolve(process.cwd(), 'dist/deploy/netlify.toml'), contents, 'utf-8')
