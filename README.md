# Todo

- Activities photos
- prices mby
- history page

## Translations

Paraglide JS compiles `messages/en.json` and `messages/fi.json` during development and builds. English is the default at existing URLs; Finnish pages live under `/fi`. The navbar links switch to the same page in the other language, including without JavaScript. Locale is passed explicitly to messages so static renders cannot share locale state.

Edit the matching message keys in both catalogs. Generated `src/paraglide` files are ignored. When adding a page, also add a wrapper under `src/pages/fi` following the existing pages. Run `pnpm build` to check and generate all pages. The downloadable program PDF remains the original document.
