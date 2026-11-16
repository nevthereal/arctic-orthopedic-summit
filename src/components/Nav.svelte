<script lang="ts">
  import { slide } from "svelte/transition";
  import logo from "../assets/logo.jpeg";
  import { cubicInOut } from "svelte/easing";

  import { m } from "../paraglide/messages.js";
  let { locale, path }: { locale: "en" | "fi"; path: string } = $props();
  const href = (url: string) => locale === "fi" ? `/fi${url}` : url;
  let englishPath = $derived(path.replace(/^\/fi(?=\/|$)/, "") || "/");
  let links = $derived([
    { href: "/scientific-program", text: m.scientific_program({}, { locale }) },
    { href: "/registration", text: m.registration({}, { locale }) },
    { href: "/history", text: m.history({}, { locale }) },
    { href: "/activities", text: m.activities({}, { locale }) },
    { href: "/venue", text: m.venue({}, { locale }) },
  ]);

  let nav = $state(false);

  function handleNav() {
    nav = !nav;
  }
</script>

{#snippet switcher()}
  <div class="flex items-center gap-2 text-sm font-bold" aria-label={m.language({}, { locale })}>
    <a href={englishPath} lang="en" hreflang="en" aria-current={locale === "en" ? "true" : undefined} class:underline={locale === "en"}>English</a>
    <span aria-hidden="true">/</span>
    <a href={`/fi${englishPath}`} lang="fi" hreflang="fi" aria-current={locale === "fi" ? "true" : undefined} class:underline={locale === "fi"}>Suomi</a>
  </div>
{/snippet}

<nav class="px-4 py-4 md:flex items-center justify-center mx-auto gap-4 lg:gap-8 hidden">
  <div class="contents font-bold uppercase">
    <ul class="contents">
      <li>
        <a href={href("/")}>{m.home({}, { locale })}</a>
      </li>
      {#each links as link (link.href)}
        <li>
          <a href={href(link.href)}>
            {link.text}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <a href="https://soy.fi" target="_blank">
    <img src={logo.src} alt="soy logo" class="w-16" />
  </a>
  {@render switcher()}
</nav>

<div class="flex justify-between px-6 py-4 items-center md:hidden">
  {@render switcher()}
  <button
    aria-label={nav ? m.nav_close({}, { locale }) : m.nav_open({}, { locale })}
    aria-expanded={nav}
    onclick={handleNav}
    class="p-1 bg-transparent md:hidden text-xl"
  >
    <i class={!nav ? "fa-solid fa-bars" : "fa-solid fa-xmark"}></i>
  </button>
  <a href="https://soy.fi" target="_blank" class="block md:hidden">
    <img src={logo.src} alt="soy logo" class="w-16" />
  </a>
</div>

{#if nav}
  <nav
    class="z-30 h-screen bg-white uppercase block text-center fixed w-screen"
    transition:slide={{ axis: "y", duration: 300, easing: cubicInOut }}
  >
    <h1 class="text-4xl my-4 font-black">{m.navigation({}, { locale })}</h1>
    <ul class="flex flex-col gap-4 font-medium">
      <li><a href={href("/")}>{m.home({}, { locale })}</a></li>
      {#each links as link (link.href)}
        <li>
          <a href={href(link.href)}>
            {link.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
