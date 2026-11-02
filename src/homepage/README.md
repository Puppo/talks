# Talks homepage

Freya v2 renders the gallery through `src/pages/index.tsx`. It preserves the original hero, featured talk, artwork, card grid, topic filters, search, and archived section. Hidden talks and internal templates are omitted; builds with `--only` list only included talks.

`catalog.ts` supplies optional poster text, colors, artwork and summaries. Talk metadata provides titles and abstracts. Search and filters enhance a usable static listing after JavaScript loads. The native page renderer copies gallery assets into the build output and preserves Freya’s supplied script. Deployment adds download links only for published PDF and PowerPoint files.

The 404 page shares the gallery styling. Run `node --test src/homepage/homepage.test.ts` for gallery behavior tests, plus the repository lint, CSS lint, typecheck and build gates.
