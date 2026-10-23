import { catalog, topics } from './catalog.ts'

export interface GalleryTalk {
  id: string
  title: string
  abstract?: string
  hidden?: boolean
  archived?: boolean
  artwork?: string
  downloads?: { pdf?: boolean; pptx?: boolean }
}

export interface HomepageOptions {
  talks: GalleryTalk[]
  author: { name: string; website?: string; github?: string; linkedin?: string }
  version: string
  scripts: string
}

export function escape(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function visibleTalks(talks: GalleryTalk[]): GalleryTalk[] {
  return talks.filter(talk => !talk.id.startsWith('__') && !talk.hidden)
}

function summary(talk: GalleryTalk): string {
  return (
    catalog[talk.id]?.summary ??
    talk.abstract
      ?.replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 180) ??
    'Explore the slides from this talk.'
  )
}

function tags(talk: GalleryTalk): string {
  return (catalog[talk.id]?.topics ?? []).map(topic => `<span class="tag">${escape(topic)}</span>`).join('')
}

function poster(talk: GalleryTalk, featured: boolean = false): string {
  const editorial = catalog[talk.id]
  return `<div class="poster poster--${editorial?.color ?? 'mint'}" aria-hidden="true">
    <span class="poster-graphic">${editorial?.topics.includes('React') ? '⚛' : editorial?.topics.includes('TypeScript') ? '{ }' : editorial?.topics.includes('Developer Tools') ? '⌘' : '✳'}</span>
    <span class="poster-type">${escape(editorial?.poster ?? talk.title).replaceAll('\n', '<br>')}</span>
    ${talk.artwork ? `<img src="${escape(talk.artwork)}" alt="" width="960" height="640" ${featured ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">` : ''}
  </div>`
}

function actions(talk: GalleryTalk, featured: boolean = false): string {
  return `<div class="talk-actions"><a class="${featured ? 'button button--mint' : 'slides-link'}" href="/${escape(talk.id)}" aria-label="View slides: ${escape(talk.title)}">View slides <span aria-hidden="true">↗</span></a>
    ${talk.downloads?.pdf ? `<a class="download-link" href="/pdfs/${escape(talk.id)}.pdf" download aria-label="Download PDF: ${escape(talk.title)}">PDF <span aria-hidden="true">↓</span></a>` : ''}
    ${talk.downloads?.pptx ? `<a class="download-link" href="/pptx/${escape(talk.id)}.pptx" download aria-label="Download PowerPoint: ${escape(talk.title)}">PPTX <span aria-hidden="true">↓</span></a>` : ''}
  </div>`
}

function card(talk: GalleryTalk): string {
  const search = `${talk.title} ${talk.abstract ?? ''} ${(catalog[talk.id]?.topics ?? []).join(' ')}`
  return `<article class="talk-card" data-talk data-search="${escape(search)}" data-topics="${escape(JSON.stringify(catalog[talk.id]?.topics ?? []))}">
    <a class="poster-link" href="/${escape(talk.id)}" aria-label="View slides: ${escape(talk.title)}" tabindex="-1">${poster(talk)}</a>
    <div class="card-content"><div class="tags">${tags(talk)}</div>
      <h3><a href="/${escape(talk.id)}">${escape(talk.title)}</a></h3>
      <p>${escape(summary(talk))}</p>${actions(talk)}
    </div>
  </article>`
}

export function renderHomepage({ talks: allTalks, author, version, scripts }: HomepageOptions): string {
  const talks = visibleTalks(allTalks)
  const current = talks.filter(talk => !talk.archived)
  const archived = talks.filter(talk => talk.archived)
  const featured = current.find(talk => catalog[talk.id]?.featured)
  const profiles = [
    author.website && `<a href="${escape(author.website)}">About Luca <span aria-hidden="true">↗</span></a>`,
    author.github && `<a href="https://github.com/${encodeURIComponent(author.github)}">GitHub</a>`,
    author.linkedin && `<a href="https://www.linkedin.com/in/${encodeURIComponent(author.linkedin)}">LinkedIn</a>`
  ]
    .filter(Boolean)
    .join('')
  const sections = [
    [current, 'Talks', 'Current talks'],
    [archived, 'From the archive', 'Archived talks']
  ] as const
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Talks by ${escape(author.name)}</title>
<meta name="description" content="Explore Luca Del Puppo’s conference talks on AI agents, the web platform, React, TypeScript and developer tools. View slides and download presentations.">
<meta name="theme-color" content="#000e38">
<link rel="icon" href="/assets/homepage/favicon.webp?v=${encodeURIComponent(version)}" type="image/webp" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/homepage/favicon.webp?v=${encodeURIComponent(version)}" type="image/webp">
<link rel="preload" href="/assets/homepage/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/homepage/style.css?v=${encodeURIComponent(version)}">
<script type="module" src="/assets/homepage/browser.js?v=${encodeURIComponent(version)}"></script>${scripts}
</head><body class="gallery">
<a class="skip-link" href="#talks">Skip to talks</a>
<header class="site-header shell"><a class="identity" href="/" aria-label="${escape(author.name)} talks home"><span class="monogram" aria-hidden="true">ldp<span>↗</span></span><span>${escape(author.name)}<small>Code. Learn. Share.</small></span></a><nav aria-label="Profile links">${profiles}</nav></header>
<main class="shell">
<section class="hero${featured ? '' : ' hero--solo'}" aria-labelledby="hero-title">
  <div class="hero-copy"><div class="intro-line"><span class="spark" aria-hidden="true">✳</span> A collection of conference talks</div>
    <h1 id="hero-title">Ideas worth<br>sharing.</h1>
    <p>Things I’ve learned, built and broken.<br>Talks about the web, AI and the craft of writing software.</p>
    <a class="explore-link" href="#talks">Explore the talks <span aria-hidden="true">↓</span></a>
  </div>
  ${featured ? `<article class="featured" data-featured aria-labelledby="featured-title"><div class="featured-art"><span class="featured-label">In the spotlight</span>${poster(featured, true)}</div><div class="featured-content"><div class="tags">${tags(featured)}</div><h2 id="featured-title">${escape(featured.title)}</h2><p>${escape(summary(featured))}</p>${actions(featured, true)}</div></article>` : ''}
</section>
<section class="collection" id="talks" aria-labelledby="collection-title">
  <div class="collection-heading"><div><h2 id="collection-title">A few things to talk about<span aria-hidden="true">.</span></h2><p>Pick a topic. Find your next rabbit hole.</p></div><p class="result-count" id="result-count" role="status" aria-live="polite" aria-atomic="true">${talks.length} ${talks.length === 1 ? 'talk' : 'talks'}</p></div>
  <div class="browse-controls" data-enhancement hidden>
    <div class="filters" role="group" aria-label="Filter talks by topic">${['All', ...topics].map(topic => `<button class="filter" type="button" data-topic="${escape(topic)}" aria-pressed="${topic === 'All'}">${escape(topic)}</button>`).join('')}</div>
    <div class="search"><span aria-hidden="true">⌕</span><label class="sr-only" for="talk-search">Search talks</label><input id="talk-search" type="search" placeholder="Find a talk…" autocomplete="off"></div>
  </div>
  ${sections
    .filter(([items]) => items.length)
    .map(
      ([items, heading, label]) =>
        `<section data-talk-section aria-label="${label}">${heading === 'Talks' ? '' : `<h2 class="archive-heading">${heading}</h2>`}<div class="talk-grid">${items.map(card).join('')}</div></section>`
    )
    .join('')}
  <div class="empty-state" id="empty-state" hidden><span aria-hidden="true">⌕</span><h3>No talks found</h3><p>Try another search or explore a different topic.</p><button class="button button--mint" id="clear-filters" type="button">Clear filters</button></div>
  ${talks.length === 0 ? '<p class="empty-catalog">No public talks in this build.</p>' : ''}
</section>
</main>
<footer class="site-footer shell"><div><a class="footer-name" href="${escape(author.website ?? '/')}">${escape(author.name)}</a><p>Built with curiosity. Shared with the community.</p></div><a href="#hero-title">Back to top <span aria-hidden="true">↑</span></a></footer>
</body></html>`
}
