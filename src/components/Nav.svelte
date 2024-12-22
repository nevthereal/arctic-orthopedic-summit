<script lang="ts">
  import logo from "../assets/logo.jpeg";

  const links = [
    { href: "/scientific-program", text: "scientific program" },
    { href: "/registration", text: "registration" },
    { href: "/history", text: "history" },
    { href: "/activities", text: "activities" },
    { href: "/venue", text: "venue/travel" },
  ];

  let nav = $state(false);

  function handleNav() {
    nav = !nav;
  }
</script>

<nav class="py-4 md:flex items-center justify-center mx-auto gap-8 hidden">
  <div class="contents font-bold uppercase">
    <ul class="contents">
      <li>
        <a href="/">Home</a>
      </li>
      {#each links as link}
        <li>
          <a href={link.href}>
            {link.text}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <a href="https://soy.fi" target="_blank">
    <img src={logo.src} alt="soy logo" class="w-16" />
  </a>
</nav>

<div class="flex justify-between px-6 py-4 items-center">
  <button
    aria-label="Open Nav"
    onclick={handleNav}
    class="p-1 bg-transparent md:hidden text-xl"
  >
    <i class={!nav ? "fa-solid fa-bars" : "fa-solid fa-xmark"}></i>
  </button>
  <a href="https://soy.fi" target="_blank" class="block md:hidden">
    <img src={logo.src} alt="soy logo" class="w-16" />
  </a>
</div>

<section class="block md:hidden">
  <nav
    class={nav
      ? "z-30 h-screen bg-white uppercase block text-center"
      : "hidden"}
  >
    <h1 class="text-4xl my-4 font-black">Navigation</h1>
    <ul class="flex flex-col gap-4 font-medium">
      <a href="/">Home</a>
      {#each links as link}
        <li>
          <a href={link.href}>
            {link.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</section>
