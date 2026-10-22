function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

export function matchesTalk(text: string, topics: string[], query: string, topic: string): boolean {
  return (
    (topic === 'All' || topics.includes(topic)) &&
    normalize(query)
      .trim()
      .split(/\s+/)
      .every(term => normalize(text).includes(term))
  )
}

function initialize(): void {
  const search = document.querySelector<HTMLInputElement>('#talk-search')!
  const cards = [...document.querySelectorAll<HTMLElement>('[data-talk]')]
  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-topic]')]
  const count = document.querySelector<HTMLElement>('#result-count')!
  const empty = document.querySelector<HTMLElement>('#empty-state')!
  const featured = document.querySelector<HTMLElement>('[data-featured]')
  let selectedTopic = 'All'

  function update(): void {
    let visible = 0
    for (const card of cards) {
      card.hidden = !matchesTalk(
        card.dataset.search!,
        JSON.parse(card.dataset.topics!) as string[],
        search.value,
        selectedTopic
      )
      if (!card.hidden) {
        visible++
      }
    }
    for (const filter of filters) {
      filter.setAttribute('aria-pressed', String(filter.dataset.topic === selectedTopic))
    }
    for (const section of document.querySelectorAll<HTMLElement>('[data-talk-section]')) {
      section.hidden = !section.querySelector('[data-talk]:not([hidden])')
    }
    if (featured) {
      featured.hidden = Boolean(search.value.trim()) || selectedTopic !== 'All'
    }
    count.textContent = `${visible} ${visible === 1 ? 'talk' : 'talks'}`
    empty.hidden = visible > 0
  }

  search.addEventListener('input', update)
  for (const filter of filters) {
    filter.addEventListener('click', () => {
      selectedTopic = filter.dataset.topic!
      update()
    })
  }
  document.querySelector('#clear-filters')!.addEventListener('click', () => {
    search.value = ''
    selectedTopic = 'All'
    update()
    search.focus()
  })
  for (const image of document.querySelectorAll<HTMLImageElement>('.poster img')) {
    image.addEventListener('error', () => (image.hidden = true))
    if (image.complete && image.naturalWidth === 0) {
      image.hidden = true
    }
  }
  for (const control of document.querySelectorAll<HTMLElement>('[data-enhancement]')) {
    control.hidden = false
  }
  update()
}

if (typeof document !== 'undefined') {
  initialize()
}
