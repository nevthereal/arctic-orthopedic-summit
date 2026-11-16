# Arctic Orthopedic Summit

## Editing content

Use Node 24 (`nvm use`), install dependencies with `pnpm install`, and start the site with `pnpm dev`.

Write page content in **`src/content/en/*.md`**. English is the source of truth. These are normal Markdown files: headings, paragraphs, `[links](/registration)`, **bold text**, lists, images, and tables. Page files also have `title` and `description` in YAML frontmatter for browser titles and social metadata.

- `home.md`: homepage introduction
- `review-1.md`, `review-2.md`: homepage testimonials
- `history.md`: history and photos
- `registration.md`: registration copy and pricing tables
- `scientific-program.md`: program introduction and timetable
- `activities.md`, `gallery.md`: activities and gallery introduction
- `venue.md`, `travel.md`: venue, accommodation and travel

Images in Markdown can reference `../../assets/filename.jpg`; Astro optimizes them. Gallery images still come from `src/assets/activities`. Layout, the map embed, and gallery rendering live in `src/pages/*.astro`. English internal page links such as `/registration` are automatically prefixed with `/fi` when rendered from Finnish Markdown. External links and downloadable files such as `/program.pdf` retain their URLs.

## Translations

Run:

```sh
pnpm translate
pnpm build
```

General Translation updates `src/content/fi/*.md` from the English Markdown, including title and description. Review the Finnish diff, then commit the content and `gt-lock.json` together. Local credentials are kept in ignored `.env.local`.

Only small UI labels (navigation, language controls, footer roles and image accessibility labels) remain in `messages/en.json`; GT translates them into `messages/fi.json`, and the typed helper in `src/lib/i18n.ts` reads them directly. Page prose no longer uses message keys. Edit UI labels in the English catalog when needed.

To correct generated Finnish manually, edit the relevant Finnish file and run `pnpm exec gt save-local` to save the correction in GT. `saveLocal` and the committed lockfile preserve reviewed corrections on later local runs.

## Deployment

Vercel uses Node 24 and `pnpm build:vercel`, which runs `gt translate --no-save-local` before checking and building the static site. `GT_PROJECT_ID` and the production `GT_API_KEY` are configured for Production and Preview. Translation failures stop deployment, leaving the previous production deployment live.

Deployments download translations without uploading old committed target files as manual edits. Build-generated translations aren't committed back to Git; run `pnpm translate` locally to download them. A local `pnpm build` needs no GT account access.

English pages retain their existing URLs; Finnish pages use `/fi`. The navbar switcher preserves the current page. A new page needs its English/Finnish Markdown and a route wrapper under `src/pages/fi`, following existing routes. Missing locale content fails the build instead of silently showing another language.
