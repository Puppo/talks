# Talk listing

Freya renders the index and 404 pages from `src/pages/`. The index lists visible talks in current and archived sections. `catalog.ts` supplies optional cover text, color and summaries; talks without an entry use their title and abstract.

During deployment, the build hook adds PDF and PowerPoint links only for exports included in the published site. The pages use their own shared styling and do not depend on the slide theme.
