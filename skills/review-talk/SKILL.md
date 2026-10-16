---
name: review-talk
description: Audit an existing talk deck against the project's Freya conventions, common.yml, and the canonical __master/slides.yml layout reference. Reports findings only — never modifies files. Use when the user asks to review a talk, audit slides before a conference, run a pre-PR review on src/talks/, or check YAML hygiene.
---

# Review a talk

Audits an existing talk deck in `src/talks/<slug>/` against the project's conventions. **Report-only by default** — produces a structured checklist and never modifies files unless the user explicitly says "fix".

## When to use

Use this skill when the user asks:

- "Review my talk."
- "Is this deck ready for the conference?"
- "Audit the slides for `<slug>`."
- "Run a pre-PR review on `src/talks/`."
- "Check the YAML hygiene of `slides.yml`."

Do **not** use this skill to apply fixes — it only reports. The user reviews findings and decides what to change.

## Inputs

- **Slug** to review (e.g. `vibe-coding-let-s-follow-the-flow`).
- Or `all` to audit every real talk under `src/talks/` (skip `__master/`).

## Reference data to load first

- `AGENTS.md` — project conventions, do / don't.
- `src/talks/__master/slides.yml` — canonical set of YAML keys per layout. **Any unknown top-level key on a slide is flagged.**
- `src/talks/common.yml` — shared values the talk must reference.
- `src/themes/main/theme.yml` — theme config, fonts, URLs.
- `src/themes/main/layouts/` — referenced when a layout's expected fields are ambiguous.

## Checks (run in order)

For each talk reviewed, run the following groups.

### 1. Structure / bookends

- ✅ Slide #1 must be `layout: cover`.
- ✅ Slide #2 must be `layout: hello`.
- ✅ Slide #3 must be `layout: nearform`.
- ✅ The closing section must contain `layout: end`. Allow resource/link slides immediately after `end`, then an optional `byebye`, an optional Questions slide using `separator`, and an optional final `cover` placeholder, in that order. This includes existing decks ending with `end → byebye → separator (Questions) → cover` and those with GitHub resource slides before `byebye`.
- ✅ At least one content slide between `nearform` and the closing.
- ❌ `__master/` should not appear alongside real talks as a deployable target — only flag if a new `__master`-style folder is added.

### 2. Unknown YAML keys

For each slide, collect all **top-level keys** (`layout`, `title`, `subtitle`, `content`, `items`, `image`, `code`, `decorations`, `className`, `options`, `quote`, `grids`, `highlight`).

For every key not present in `__master/slides.yml`'s exhaustive set, flag ❌ with the file and line number.

### 3. Asset references

Inspect image references in `image.url`, `items.entries[].image`, and `grids[].entries[].image`, including those nested in structured content. Apply the same resolution checks to each location.

For every `@talk/<file>` image reference in `slides.yml`:

- `<file>` must exist in `src/talks/<slug>/assets/`.

For every `@theme/<file>` image reference:

- `<file>` must exist in `src/themes/main/assets/` (or the matching theme folder if the talk overrides theme).

For every `items.entries[].qr: <url>`:

- The URL should be a valid `https://` URL.

For every `items.entries[].icon: <name>`:

- The icon name should be a known Font Awesome name. Flag ⚠️ if it isn't obviously one (`chevron-left`, `bolt`, `github`, …).

### 4. Sequence slides

If a slide has `items.sequence: true` and a title formatted like `Title N/M`:

- Scan forward and confirm slides `2/M`, `3/M`, … `M/M` exist with no gaps.
- Each slide in the sequence must have the same `items.entries` length.
- Sequence slides use the same `className` and decorations.

### 5. Code blocks

- Every slide with a `code:` block must have `code.language`.
- If `code.highlight` is present, accept comma-separated line numbers and inclusive ranges, with optional whitespace (e.g. `'2, 4-6'` or `'3-4, 6-8'`). Treat a numeric YAML value as a single line number. ⚠️ flag malformed entries, reversed ranges, or line numbers outside `1..N`, where `N` is the rendered line count of `code.content`.
- Flag ⚠️ long code blocks without `numbers: true` (helpful when used pedagogically).

### 6. `info.yml` hygiene

- ✅ `config: common.config` set.
- ✅ `document.title` present and non-empty.
- ✅ `document.abstract` present and roughly between 80 and 600 characters.
- ✅ `author: common.author` and `company: common.company` referenced (no inlined duplicates).
- ❌ Inline `author` or `company` map → flag.

### 7. YAML hygiene

- Single-line titles with spaces or terminating punctuation should be single-quoted.
- Multi-line strings should use the block scalar `|` (preserve newlines), not folded `>` (which folds newlines into spaces).
- No trailing whitespace on lines, no tabs, line endings should be consistent (LF preferred).
- Parse `slides.yml` as a multi-document YAML stream. Use one `---` separator before each slide; flag empty or comment-only documents caused by consecutive or trailing separators. A trailing `# ---` comment is harmless.

### 8. Decorations consistency

For slides with `layout: half`, `image`, `side`, or `separator`:

- ✅ `decorations.logo` is set (e.g. `white`, `black`, `total-white`).
- ✅ `decorations.permalink` matches the convention of neighbor slides (false on `image`, true on most other layouts).
- ✅ `decorations.number` (when present) is consistent within the talk and ≥ 1.

Flag inconsistencies that would make the deck look uncoordinated when projected live.

### 9. `assets/` directory

- ✅ `src/talks/<slug>/assets/` exists.
- ❌ Raw `.jpg` / `.png` files in `assets/` (they belong in `assets/__originals/` and should be converted via `npm run convert-images`).
- ⚠️ Unused `.webp` files (no `@talk/…` reference in `slides.yml`) — surface for cleanup.

### 10. `talk.css` shape

- Per-talk selectors must be prefixed with `.talk\@` (e.g. `.talk\@narrow-grid`); Sass-style `&__x` / `&--x` concatenation is not supported.
- ⚠️ Flag an empty `talk.css` wrapper block — it can be replaced with an empty file or omitted.

## Output format

For each talk, print a structured report:

```
## <slug> — <number> slides reviewed

### ✅ Pass
- [1] cover layout at line 1
- [2] hello layout at line 4
- [3] nearform layout at line 7
- ...

### ⚠️ Warning
- [12] decorations.logo not set on layout: half (line 67) — neighbors use `white`
- ...

### ❌ Issue
- [23] image reference `@talk/missing.webp` does not exist (line 134)
- ...

### Summary
| Category        | ✅ | ⚠️ | ❌ |
|-----------------|----|----|----|
| Structure       | 4  | 0  | 0  |
| YAML keys       | 0  | 0  | 0  |
| Assets          | 0  | 1  | 2  |
| info.yml        | 4  | 0  | 0  |
| Decorations     | 0  | 3  | 0  |
```

End the report with **a short prioritized list of recommended fixes** — concrete actions the user can take, with line numbers.

## Don't

- Don't modify any files. This skill is report-only.
- Don't delete slides or auto-rename assets. Report only.
- Don't argue about aesthetics. Defer subjective choices back to the user.
- Don't trigger a build. If a finding only resolves on render (e.g. theme CSS fallbacks), say so and stop.
- Don't reformat unrelated YAML whitespace while reviewing. Spot-check only what the checks need.
