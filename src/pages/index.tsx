import type { BuildContext } from '@perseveranza-pets/dante'
import type { PageData } from '@perseveranza-pets/freya'
import type { VNode } from '@perseveranza-pets/freya/preact'
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import { resolve } from 'node:path'
import { catalog } from '../homepage/catalog.ts'
import { renderHomepage, type GalleryTalk, type HomepageOptions } from '../homepage/render.ts'

export default async function Index(context: BuildContext, data: PageData['index']): Promise<VNode> {
  const directory = context.extensions.freya.netlify ? resolve(context.root, 'html') : resolve('dist/html')
  const assets = resolve(directory, 'assets/homepage')
  await mkdir(assets, { recursive: true })
  for (const file of ['inter.woff2', 'inter_license.txt']) {
    await cp(resolve('src/homepage/assets', file), resolve(assets, file))
  }
  await cp(resolve('src/homepage/style.css'), resolve(assets, 'style.css'))
  await cp(resolve('src/themes/main/assets/favicon.webp'), resolve(assets, 'favicon.webp'))
  await writeFile(
    resolve(assets, 'browser.js'),
    stripTypeScriptTypes(await readFile(resolve('src/homepage/browser.ts'), 'utf8'))
  )
  const talks: GalleryTalk[] = []
  for (const [id, talk] of Object.entries(data.talks).sort(([a], [b]) => a.localeCompare(b))) {
    if (id.startsWith('__') || id === 'master' || talk.document.hidden) continue
    const artwork = catalog[id]?.artwork
    const source = artwork && resolve('src/talks', id, 'assets', artwork)
    const image = `${id}.webp`
    if (source && existsSync(source)) await cp(source, resolve(assets, image))
    talks.push({
      id,
      title: talk.document.title,
      abstract: talk.document.abstract,
      archived: talk.document.archived,
      artwork:
        source && existsSync(source) ? `/assets/homepage/${image}?v=${encodeURIComponent(context.version)}` : undefined
    })
  }
  talks.sort((a, b) => Number(Boolean(catalog[b.id]?.featured)) - Number(Boolean(catalog[a.id]?.featured)))
  const html = renderHomepage({
    talks,
    author: data.common.author as HomepageOptions['author'],
    version: context.version,
    scripts: `<script>${data.script}</script>`
  })
  const head = html.slice(html.indexOf('<head>') + 6, html.indexOf('</head>'))
  const body = html.slice(html.indexOf('<body class="gallery">') + 22, html.indexOf('</body>'))
  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: head }} />
      <body className="gallery" dangerouslySetInnerHTML={{ __html: body }} />
    </html>
  )
}
