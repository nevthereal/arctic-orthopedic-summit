import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  i18n: { defaultLocale: "en", locales: ["en", "fi"] },
  vite: {
    plugins: [
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        strategy: ["url", "baseLocale"],
      }),
    ],
  },
  integrations: [tailwind(), svelte()],
  output: "static",
  adapter: vercel(),
});
