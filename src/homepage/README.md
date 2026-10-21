# Talks homepage

The homepage is a static conference gallery with progressive search and topic filters. Titles and abstracts come from Freya talk metadata. `catalog.ts` supplies only the editorial summary, topics, artwork filename, poster treatment and featured selection. New talks without an entry get a text poster and an abstract excerpt.

`src/build/cli.ts` selects the local build wrapper. It delegates to Freya, then renders the homepage into the same HTML directory. The deploy post-action refreshes the packaged homepage so PDF/PowerPoint links appear only when those files were actually published. No dependency files or slide themes are patched. Assets use the build version in their URLs, and Freya's service-worker and live-reload scripts are preserved.

The master template and hidden talks are omitted. Archived talks have their own section. A build with `--only` lists only the talks it contains. The featured panel is omitted if its talk isn't built. Search and topic controls stay hidden until JavaScript initializes, leaving a usable static gallery without scripting.

## Editing the gallery

- Add summaries, topic assignments and poster text in `catalog.ts`. Topics are shared by the card labels and filters.
- Artwork is copied from the corresponding talk's assets. Keep the original asset provenance with that talk. Missing artwork falls back to its poster.
- Styles and client behavior live in `style.css` and `browser.ts`. The build strips TypeScript from the browser module using Node's built-in API.
- Inter is the existing theme typeface. The bundled Latin WOFF2 comes from the Google Fonts URL in `src/themes/main/theme.yml`; its Open Font License is in `assets/inter_license.txt`.

Run `node --test src/homepage/homepage.test.ts` for search and rendering tests. Run the repository lint, CSS lint, typecheck and build gates before shipping. Preview `/` with the standard Freya server and check the deployment's `/` for published download links.
