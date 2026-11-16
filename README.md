# Todo

- Activities photos
- prices mby
- history page

## Translations

Paraglide JS compiles `messages/en.json` and `messages/fi.json` during development and builds. English is the default at existing URLs; Finnish pages live under `/fi`. The navbar links switch to the same page in the other language, including without JavaScript. Locale is passed explicitly to messages so static renders cannot share locale state.

Edit English messages in `messages/en.json`, then run `pnpm translate` to update Finnish. Generated `src/paraglide` files are ignored. When adding a page, also add a wrapper under `src/pages/fi` following the existing pages. Run `pnpm build` to check and generate all pages. The downloadable program PDF remains the original document.

### Automatic Finnish translations

General Translation uses English (`messages/en.json`) as the source and updates `messages/fi.json`. After account setup, run:

```sh
nvm use
pnpm translate
pnpm build
```

Review the translation diff before publishing. Commit `gt.config.json`, both message files, and `gt-lock.json` together. The initial translation can replace existing Finnish wording; subsequent runs use `saveLocal` and the lockfile to preserve manual corrections. Keep credentials in ignored `.env.local` files. Local `pnpm build` does not require translation credentials. Vercel runs translation automatically before building.

### Vercel deployment

Vercel uses Node 24 and `pnpm build:vercel`, which translates the English catalog before running checks and building the static site. Configure `GT_PROJECT_ID` and a production `GT_API_KEY` for Production and Preview in Vercel. The API key must allow project writes, context reads/writes, file reads/writes, and translation generation/enqueueing. Never expose these with a public environment variable prefix.

Deployments use `--no-save-local` so an older committed Finnish catalog cannot overwrite reviewed translations stored in GT. Make manual Finnish corrections locally and run `pnpm exec gt save-local` to sync them. Build-generated translations are deployed but are not committed back to Git; run `pnpm translate` locally to download them when needed. Translation failures stop deployment.
