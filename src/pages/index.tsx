import type { BuildContext } from '@perseveranza-pets/dante'
import type { PageData } from '@perseveranza-pets/freya'
import type { VNode } from '@perseveranza-pets/freya/preact'
import { catalog } from '../homepage/catalog.ts'
import { Page } from './shared.tsx'

export default async function Index(_context: BuildContext, { talks, script }: PageData['index']): Promise<VNode> {
  const visible = Object.entries(talks).filter(
    ([id, talk]) => !id.startsWith('__') && id !== 'master' && !talk.document.hidden
  )
  const sections = [
    ['Current talks', visible.filter(([, talk]) => !talk.document.archived)],
    ['From the archive', visible.filter(([, talk]) => talk.document.archived)]
  ] as const
  return Page({
    title: 'Talks by Luca Del Puppo',
    script,
    children: (
      <>
        <div className="intro">
          <p className="eyebrow">Code. Learn. Share.</p>
          <h1>
            Ideas worth sharing<span>.</span>
          </h1>
          <p>Talks about the web, AI, and the craft of writing software.</p>
        </div>
        {sections.map(
          ([heading, items]) =>
            items.length > 0 && (
              <section key={heading}>
                <h2>{heading}</h2>
                <div className="grid">
                  {items.map(([id, talk]) => {
                    const entry = catalog[id]
                    return (
                      <article className="card" key={id}>
                        <a className={`cover ${entry?.color ?? 'mint'}`} href={`/${id}`}>
                          <span>{entry?.poster ?? talk.document.title}</span>
                        </a>
                        <div className="content">
                          <h3>
                            <a href={`/${id}`}>{talk.document.title}</a>
                          </h3>
                          <p>{entry?.summary ?? talk.document.abstract}</p>
                          <nav aria-label={`Resources: ${talk.document.title}`}>
                            <a href={`/${id}`}>View slides ↗</a>
                            <span data-downloads={id} />
                          </nav>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
        )}
      </>
    )
  })
}
