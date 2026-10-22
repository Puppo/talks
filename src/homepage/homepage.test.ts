import assert from 'node:assert/strict'
import { test } from 'node:test'
import { matchesTalk } from './browser.ts'
import { visibleTalks, renderHomepage } from './render.ts'

test('search combines accent-insensitive terms with the selected topic', () => {
  const text = 'Costruiamo agenti: più possibilità con ADK-js AI & Agents'
  assert.equal(matchesTalk(text, ['AI & Agents'], 'PIU adk', 'AI & Agents'), true)
  assert.equal(matchesTalk(text, ['AI & Agents'], 'adk', 'React'), false)
  assert.equal(matchesTalk(text, ['AI & Agents'], 'missing', 'All'), false)
  assert.equal(matchesTalk(text, ['AI & Agents'], '  ', 'All'), true)
})

test('catalog hides the template and hidden talks while preserving archives', () => {
  const talks = [
    { id: '__master', title: 'Template' },
    { id: 'hidden', title: 'Hidden', hidden: true },
    { id: 'archive', title: 'Archive', archived: true },
    { id: 'public', title: 'Public' }
  ]
  assert.deepEqual(
    visibleTalks(talks).map(talk => talk.id),
    ['archive', 'public']
  )
})

test('unconfigured talks get a poster, escaped text and no unavailable downloads', () => {
  const html = renderHomepage({
    talks: [{ id: 'new-talk', title: 'A <new> talk', abstract: 'A useful introduction.' }],
    author: { name: 'Luca Del Puppo', website: 'https://delpuppo.net' },
    version: 'test',
    scripts: ''
  })
  assert.ok(html.includes('A &lt;new&gt; talk'))
  assert.ok(html.includes('href="/new-talk"'))
  assert.ok(html.includes('poster'))
  assert.ok(!html.includes('href="/pdfs/'))
  assert.ok(!html.includes('data-featured'))
})

test('rendering groups archived talks and includes only published download formats', () => {
  const html = renderHomepage({
    talks: [
      { id: 'current', title: 'Current', downloads: { pdf: true, pptx: false } },
      { id: 'archived', title: 'Older talk', archived: true },
      { id: 'hidden', title: 'Hidden talk', hidden: true }
    ],
    author: { name: 'Luca Del Puppo' },
    version: 'v1',
    scripts: '<script>globalThis.__freyaSiteVersion = "v1"</script>'
  })
  assert.ok(html.includes('href="/pdfs/current.pdf"'))
  assert.ok(!html.includes('href="/pptx/current.pptx"'))
  assert.ok(html.includes('aria-label="Archived talks"'))
  assert.ok(!html.includes('Hidden talk'))
  assert.ok(html.includes('globalThis.__freyaSiteVersion'))
})

test('packaged homepage discovers real downloads and preserves version scripts on refresh', async () => {
  const { mkdtemp, mkdir, readFile, rm, writeFile } = await import('node:fs/promises')
  const { tmpdir } = await import('node:os')
  const { join } = await import('node:path')
  const { writeHomepage } = await import('./build.ts')
  const directory = await mkdtemp(join(tmpdir(), 'talk-gallery-'))
  const id = 'your-next-user-is-an-ai-agent'
  try {
    await writeFile(
      join(directory, 'index.html'),
      '<html><head><script>globalThis.__freyaSiteVersion = "test-build"</script></head><body></body></html>'
    )
    await writeFile(join(directory, `${id}.html`), '')
    await writeFile(join(directory, '__master.html'), '')
    await writeHomepage(directory)
    let html = await readFile(join(directory, 'index.html'), 'utf8')
    assert.equal((html.match(/data-talk data-search/g) ?? []).length, 1)
    assert.ok(html.includes('data-featured'))
    assert.ok(!html.includes(`/pdfs/${id}.pdf`))
    await mkdir(join(directory, 'pdfs'))
    await writeFile(join(directory, 'pdfs', `${id}.pdf`), 'fixture')
    await writeHomepage(directory)
    html = await readFile(join(directory, 'index.html'), 'utf8')
    assert.ok(html.includes(`/pdfs/${id}.pdf`))
    assert.ok(!html.includes(`/pptx/${id}.pptx`))
    assert.equal((html.match(/__freyaSiteVersion/g) ?? []).length, 1)
    assert.equal((html.match(/src="\/assets\/homepage\/browser.js/g) ?? []).length, 1)
    assert.ok(html.includes('style.css?v=test-build'))
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
