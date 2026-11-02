import type { VNode, ComponentChildren } from '@perseveranza-pets/freya/preact'
import { readFile } from 'node:fs/promises'

export async function Page({
  title,
  children,
  script
}: {
  title: string
  children: ComponentChildren
  script?: string
}): Promise<VNode> {
  const css = await readFile(new URL('./style.css', import.meta.url), 'utf8')
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        {script && <script dangerouslySetInnerHTML={{ __html: script }} />}
      </head>
      <body>
        <header>
          <a className="brand" href="/">
            Luca Del Puppo <span> / Talks</span>
          </a>
          <nav aria-label="Profile links">
            <a href="https://delpuppo.net">About</a>
            <a href="https://github.com/puppo">GitHub</a>
            <a href="https://www.linkedin.com/in/lucadelpuppo">LinkedIn</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          Code. Learn. Share. <a href="/">Luca Del Puppo</a>
        </footer>
      </body>
    </html>
  )
}
