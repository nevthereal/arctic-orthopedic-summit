import localizeMarkdownLinks from "./scripts/localize-markdown-links.mjs";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  markdown: { remarkPlugins: [localizeMarkdownLinks] },
  i18n: { defaultLocale: "en", locales: ["en", "fi"] },
  integrations: [tailwind(), svelte()],
  output: "static",
  adapter: vercel(),
});
