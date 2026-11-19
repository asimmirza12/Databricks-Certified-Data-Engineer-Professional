# CLAUDE.md — rules for every session

A free, public, interactive course for **complete beginners** (new to data engineering AND to Databricks), mapped to the
Databricks Certified Data Engineer Professional exam. Static site: plain HTML + one CSS file + one JS file, served by GitHub Pages
from `main` / root. Live: https://asimmirza12.github.io/Databricks-Certified-Data-Engineer-Professional/

## Files
- `index.html` home · `glossary.html` glossary · `templates/lesson.html` lesson template
- `assets/course.css` — ALL styling. No inline `<style>` or `style=""` except a dynamic width set from JS.
- `assets/course.js` — shared behaviour AND the **course manifest** (`MODULES`). Load it in `<head>` without `defer`.
- `modules/<NN-module-slug>/<NN-lesson-slug>.html` — one lesson per page; slugs must match the manifest.
- `OUTLINE.md` — every lesson, objective, prerequisite and status.

## Workflow for building a module
1. Read `OUTLINE.md` for the module's lessons, objective IDs and prerequisites.
2. For each concept, web-search the CURRENT Databricks docs first (see Accuracy).
3. Copy `templates/lesson.html`, fill every section, delete the template comments.
4. In `assets/course.js` set the lesson's 4th field to `true` (built). In `OUTLINE.md` tick `[x]`. Keep both in sync.
5. Add every new term to `glossary.html` (alphabetical `<dt id="slug">` + `<dd>`), and link it from the lesson.
6. Test locally (`python3 -m http.server 8000`): light + dark, 390 px width with no sideways scroll, every demo, quiz,
   mark-complete survives reload, no console errors, reduced motion still makes sense.
7. Run the copyright re-check (below), then commit `module-NN: <summary>` and push.

## Disclaimer (every page, first element in `<body>`, never edited or removed)
Copy the `<aside class="disclaimer">` exactly from `templates/lesson.html`. `course.js` injects it if missing, but pages must
still hardcode it so it shows without JavaScript. README.md carries the same text.

## Copyright (always)
- Never copy sentences from the exam guide, Databricks docs, blogs, courses or any other source. Read, close the source, write fresh.
- Exam objectives: always restated in our own plain words (see OUTLINE.md). Never paste the guide's text.
- Before committing a page, re-read every paragraph written while looking at sources. If a sentence follows a source's wording
  or structure closely, rewrite it completely. Short technical names (options, functions, commands) are fine.
- Code samples: our own examples only; never copy doc examples.
- No images, logos or screenshots from Databricks. Draw everything as our own inline SVG.
- Link to the official doc page for each concept instead of reproducing it.

## Accuracy
- Verify every feature name, option, default value and limit against the CURRENT docs (web search) before writing it.
- Use current names; mention the old name once per lesson as "formerly …". Known renames (verified 2026-11-19):
  - Lakeflow pipelines, built on Apache Spark Declarative Pipelines — formerly Delta Live Tables (DLT) / Lakeflow Declarative Pipelines.
    Python module `pyspark.pipelines` (formerly `dlt`).
  - Lakeflow Jobs — formerly Databricks Workflows / Jobs.
  - Declarative Automation Bundles — formerly Databricks Asset Bundles (DABs); CLI command is still `databricks bundle`.
  - AUTO CDC — formerly APPLY CHANGES. · OpenSharing — formerly Delta Sharing. · Git folders — formerly Repos.
  - Disk cache — formerly Delta cache.
  - Alerts: exam guide says "Lakehouse alerts", docs say "Databricks SQL alerts" — verify before writing module 04.
- If something can't be verified, write "verify in the docs" instead of guessing.
- Every lesson ends with "Official docs" links and `Last verified: YYYY-MM-DD`.

## Audience and writing
- Reader knows nothing. Short sentences. Define every term the first time (`<span class="def">term</span> means …`).
- No unexplained jargon, acronyms spelled out on first use.
- Only made-up, generic examples (e.g. a bike-rental shop, a weather app, an online bookstore). Nothing from any real employer or client.

## Lesson shape (all 14, in this order — see templates/lesson.html)
1. Disclaimer banner
2. "Where you are": module, lesson, exam objective (own words, with ID), time to read
3. "Before this": prerequisite lessons, linked
4. The idea in plain English, with an everyday analogy (`.analogy`)
5. Animated diagram (inline SVG with `animateMotion` or CSS keyframes, colours from tokens only, static fallback position)
6. Live demo in vanilla JS where something has state (buttons/sliders/dropdowns + a `.log` panel with `aria-live`)
7. Code (Python and/or SQL) with comments and realistic made-up names
8. "What if I change this?" table (Change | Effect) for every important option
9. Comparison tables where options compete; categories as card grids
10. Real-life scenarios table (Scenario | What happens | Fix)
11. Exam traps (`.card.trap`) and "don't confuse these" (`.card.confuse`)
12. 3–5 question quiz with explanations (`.quiz` / `.q[data-answer]`, 0-based)
13. Key takeaways (3–5 lines), glossary terms used (linked), official docs, last verified
14. Previous / next / mark complete (`<nav id="lesson-nav">`, filled by course.js; progress in localStorage `dep:v1:done`)

## Technical rules
- Relative paths only (Pages serves from a sub-path). Lessons use `../../assets/…`.
- No external assets except Google Fonts (Archivo, IBM Plex Sans, JetBrains Mono). No CDNs, analytics or trackers.
- Colours only via CSS variables from `course.css`; both themes must read well.
- Respect `prefers-reduced-motion` (course.js removes SMIL; CSS kills keyframes). Give every element moved by `animateMotion` (drawn at 0,0) a `data-rest="x,y"` resting spot; every lesson must make sense without motion.
- Works at 390 px wide; tap-friendly controls (min 40 px); keyboard reachable; visible focus; no colour-only meaning.
- New shared styles/behaviour go into `course.css` / `course.js`, never a single page.

## Status
See `OUTLINE.md`. Built so far: 00-01.
