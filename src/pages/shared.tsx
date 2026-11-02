import type { VNode, ComponentChildren } from '@perseveranza-pets/freya/preact'
import { readFile } from 'node:fs/promises'

export async function Page({ title, children }: { title: string; children: ComponentChildren }): Promise<VNode> {
  const css = (await readFile(new URL('../homepage/style.css', import.meta.url), 'utf8')).replace(
    "url('./inter.woff2')",
    "url('/assets/homepage/inter.woff2')"
  )
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body className="gallery">
        <header className="site-header shell">
          <a className="identity" href="/">
            <span className="monogram" aria-hidden="true">
              ldp<span>↗</span>
            </span>
            <span>
              Luca Del Puppo<small>Code. Learn. Share.</small>
            </span>
          </a>
          <nav aria-label="Profile links">
            <a href="https://delpuppo.net">About Luca ↗</a>
            <a href="https://github.com/puppo">GitHub</a>
            <a href="https://www.linkedin.com/in/lucadelpuppo">LinkedIn</a>
          </nav>
        </header>
        <main className="shell">
          <section className="hero hero--solo">
            <div className="hero-copy">{children}</div>
          </section>
        </main>
        <footer className="site-footer shell">
          <div>
            <a className="footer-name" href="https://delpuppo.net">
              Luca Del Puppo
            </a>
            <p>Built with curiosity. Shared with the community.</p>
          </div>
          <a href="/">Explore the talks →</a>
        </footer>
      </body>
    </html>
  )
}
