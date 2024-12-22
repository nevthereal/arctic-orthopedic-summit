import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  output: "static",
  adapter: vercel(),
});
