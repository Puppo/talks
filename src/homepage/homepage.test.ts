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

test('featured gallery preserves Freya script and deployment download placeholders', () => {
  const html = renderHomepage({
    talks: [{ id: 'your-next-user-is-an-ai-agent', title: 'Agents' }],
    author: { name: 'Luca' },
    version: 'v2',
    scripts: '<script>globalThis.__freyaSiteVersion = "v2"</script>'
  })
  assert.ok(html.includes('data-featured'))
  assert.ok(html.includes('data-downloads="your-next-user-is-an-ai-agent"'))
  assert.equal((html.match(/__freyaSiteVersion/g) ?? []).length, 1)
  assert.ok(html.includes('style.css?v=v2'))
})
