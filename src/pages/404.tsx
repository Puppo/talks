import type { VNode } from '@perseveranza-pets/freya/preact'
import { Page } from './shared.tsx'

export default function NotFound(): Promise<VNode> {
  return Page({
    title: 'Page not found | Luca Del Puppo',
    children: (
      <div className="not-found">
        <p className="eyebrow">404</p>
        <h1>
          Page not found<span>.</span>
        </h1>
        <p>Sorry, we couldn’t find that page.</p>
        <a href="/">Explore the talks →</a>
      </div>
    )
  })
}
