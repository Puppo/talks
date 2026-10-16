---
name: build-talk
description: Scaffold a new talk deck under src/talks/ using the project's Freya conventions, reuse common.yml, sync cfp-abstracts.json, and run lint + typecheck before reporting back. Use when the user asks to create a new talk, add a deck, scaffold slides for a conference, generate a workshop presentation, or convert CFP text into a slides structure.
---

# Build a new talk deck

Scaffold a self-contained Freya talk deck under `src/talks/<slug>/`, reusing the project's shared values from `common.yml` and the canonical layout reference in `__master/slides.yml`. After creating the files, regenerate `cfp-abstracts.json` so the CFP entry stays in sync.

## When to use

Use this skill when the user asks to:

- Create a new conference talk, workshop, or internal demo.
- Add a new deck for an upcoming event.
- Convert notes or CFP text into a slide structure.
- Mirror a sibling talk in a new folder.

Do **not** use this skill to edit an existing deck — go through `skills/review-talk/SKILL.md` first, then make manual edits.

## Files to read first

Before doing anything else, read in this order:

1. `AGENTS.md` — project conventions, do / don't, sources of truth.
2. `src/talks/__master/slides.yml` — every supported YAML field and layout.
3. `src/talks/common.yml` — shared `config`, `author`, `company`.
4. `skills/build-talk/references/scaffold-slides.yml` — the minimal opening + closing shell.

## Inputs to collect

Either from the user prompt or by asking explicitly:

| Input | Required | Notes |
|---|---|---|
| **Slug** | yes | Lowercase kebab-case. Verify it does not exist under `src/talks/`. |
| **Title** | yes | Single-line; used in `info.yml` and the cover layout. |
| **Abstract** | yes | One or two paragraphs; reused for the CFP. Multi-paragraph abstracts use `\|`. |
| **`titleFormatted`** | optional | Multi-line cover title for layouts that need a line break. |
| **Theme** | optional | Defaults to `main`. |

## Steps

1. **Validate the slug**
   - List `src/talks/` (one level deep, exclude `__master/`).
   - If `<slug>` already exists, **stop** — never overwrite. Suggest a new slug and ask the user.
2. **Create the folder structure**
   ```
   src/talks/<slug>/
     info.yml
     slides.yml
     talk.css
     assets/
     assets/.gitkeep
     assets/__originals/.gitkeep
   ```
3. **Write `info.yml`** referencing shared values:
   ```yaml
   ---
   config: common.config
   document:
     title: '<Short talk title>'
     abstract: |
       <Abstract paragraph one>

       <Abstract paragraph two, optional>
     author: common.author
     company: common.company
   ```
   Add `titleFormatted: |` only when the cover needs a line break.
4. **Write `slides.yml`** by copying `skills/build-talk/references/scaffold-slides.yml`. Replace the placeholder comment on the closing cover with `<slug>` so a future agent can locate it. Leave `# Add content slides here …` markers untouched.
5. **Write `talk.css`** with the standard starter:
   ```css
   /* Add per-talk overrides here when needed. Keep empty otherwise. */
   /* .talk\@my-class { row-gap: 0; } */
   ```
6. **Run the quality gates** (always; do not skip):
   - `npm run lint -- src/talks/<slug>`
   - `npm run typecheck`
   - Surface any failures verbatim. Do **not** edit to "make it pass" — leave the failure for the user.
7. **Sync the CFP automatically** after `info.yml` is final:
   - Run `npm run generate-cfp` from the repository root. Its default output is the root `cfp-abstracts.json`; `--output <path>` can select another destination.
   - Regenerate the full catalog; do not use `--only`, which would replace it with a subset.
   - Show the diff in `cfp-abstracts.json` and confirm the new talk is included. Keep the generator's ordering and keywords.
8. **Tell the user how to preview**:
   ```
   npm run dev -- --only <slug>
   ```
   Open `http://delpuppo.local:4200/<slug>` (the development URL is defined in `themes/main/theme.yml`).

## Cleanup expectations

- Leave no stray `.DS_Store` or test files in the new folder.
- Don't create `README.md` inside talk folders — the project doesn't use them.
- Don't run `npm run dev` in the background — it is interactive, the user starts it themselves.

## Don't

- Don't invent new layout names. If `__master/slides.yml` doesn't show a layout the user wants, surface that to the user rather than fabricating one.
- Don't duplicate author / company info — reference `common.*` only.
- Don't write raw asset paths — always use `@talk/…` or `@theme/…` aliases.
- Don't commit raw JPG / PNG files in `assets/`. Add them to `assets/__originals/` and run `npm run convert-images`.
- Don't edit `themes/main/`.
- Don't run `npm run dev`, `npm run build`, or `npm run deploy` automatically — those are interactive orchestrations that the user should trigger.

## Hand-off checklist

When the skill finishes, summarize for the user:

- ✅ Folder created at `src/talks/<slug>/`.
- ✅ `info.yml`, `slides.yml`, `talk.css`, `assets/`, `assets/__originals/` populated.
- ✅ `npm run lint` and `npm run typecheck` results (paste any warnings).
- ✅ `cfp-abstracts.json` regenerated with the new entry.
- ⏭️ Next: drop images into `assets/__originals/`, run `npm run convert-images`, then add content slides one at a time using layouts from `__master/slides.yml`.
- ⏭️ Next: run `skills/review-talk/SKILL.md` before sending the deck off to a conference.
