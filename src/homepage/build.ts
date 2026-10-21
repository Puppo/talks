import { existsSync } from 'node:fs'
import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import { resolve } from 'node:path'
import { getCommon, getTalk } from '@perseveranza-pets/freya'
import { catalog } from './catalog.ts'
import { renderHomepage, type GalleryTalk } from './render.ts'

export async function writeHomepage(directory: string, version?: string): Promise<void> {
  const original = await readFile(resolve(directory, 'index.html'), 'utf8')
  const siteVersion = version ?? original.match(/__freyaSiteVersion\s*=\s*"([^"]+)"/)?.[1] ?? 'development'
  const scripts = [...original.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)]
    .map(([script]) => script)
    .filter(script => !script.includes('/assets/homepage/'))
    .join('\n')
  const talks: GalleryTalk[] = []
  const assets = resolve(directory, 'assets/homepage')
  await mkdir(assets, { recursive: true })
  for (const file of (await readdir(directory)).sort()) {
    const id = file.replace(/\.html$/, '')
    if (!file.endsWith('.html') || ['index', '404'].includes(id) || id.endsWith('_assets') || id.startsWith('__')) {
      continue
    }
    const talk = await getTalk(id)
    if (talk.document.hidden) {
      continue
    }
    const artwork = catalog[id]?.artwork
    const source = artwork && resolve('src/talks', id, 'assets', artwork)
    const imageName = `${id}.webp`
    if (source && existsSync(source)) {
      await cp(source, resolve(assets, imageName))
    }
    talks.push({
      id,
      title: talk.document.title,
      abstract: talk.document.abstract,
      hidden: talk.document.hidden,
      archived: talk.document.archived,
      artwork:
        source && existsSync(source) ? `/assets/homepage/${imageName}?v=${encodeURIComponent(siteVersion)}` : undefined,
      downloads: {
        pdf: existsSync(resolve(directory, 'pdfs', `${id}.pdf`)),
        pptx: existsSync(resolve(directory, 'pptx', `${id}.pptx`))
      }
    })
  }
  talks.sort((a, b) => Number(Boolean(catalog[b.id]?.featured)) - Number(Boolean(catalog[a.id]?.featured)))
  const { author: commonAuthor } = await getCommon()
  const author = commonAuthor as { name: string; website?: string; github?: string; linkedin?: string }
  await cp(resolve('src/homepage/style.css'), resolve(assets, 'style.css'))
  await cp(resolve('src/homepage/assets/inter.woff2'), resolve(assets, 'inter.woff2'))
  await cp(resolve('src/homepage/assets/inter_license.txt'), resolve(assets, 'inter_license.txt'))
  const browser = await readFile(resolve('src/homepage/browser.ts'), 'utf8')
  await writeFile(resolve(assets, 'browser.js'), stripTypeScriptTypes(browser))
  await writeFile(resolve(directory, 'index.html'), renderHomepage({ talks, author, version: siteVersion, scripts }))
}
