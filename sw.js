/* SnakeIQ field testkit — offline cache.

   PAGES ARE NETWORK-FIRST. A cache-first worker is what made three builds in a row
   unverifiable on the phone: a newer upload was invisible behind a cached copy, with no
   way to tell a stale build from a broken one. With signal, the phone always gets what is
   actually on the server; the cache is the fallback for no signal.

   Everything else (scripts, styles, fonts, photos) is cache-first — those are versioned
   by content in practice and are the bulk of the payload.

   Bump CACHE on every upload. */
const CACHE = "snakeiq-testkit-2026-08-31-b35";

const PRECACHE = [
  "testkit.html",
  "support.js",
  "snakeiq-af.js",
  "snakeiq-id-module.js",
  "fonts-testkit.css",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "_ds/lachesis-foundation-snakeiq-design-syste-20ad5262-3ccc-4fb8-91f7-5bb02dbd896c/styles.css",
  "_ds/lachesis-foundation-snakeiq-design-syste-20ad5262-3ccc-4fb8-91f7-5bb02dbd896c/_ds_bundle.js",
  "_ds/lachesis-foundation-snakeiq-design-syste-20ad5262-3ccc-4fb8-91f7-5bb02dbd896c/tokens/fonts.css",
  "_ds/lachesis-foundation-snakeiq-design-syste-20ad5262-3ccc-4fb8-91f7-5bb02dbd896c/tokens/fig-tokens.css",
  "_ds/lachesis-foundation-snakeiq-design-syste-20ad5262-3ccc-4fb8-91f7-5bb02dbd896c/tokens/fig-typography.css",
  "_ds/lachesis-foundation-snakeiq-design-syste-20ad5262-3ccc-4fb8-91f7-5bb02dbd896c/components/navigation/fig-assets.css",
  "_ds/lachesis-foundation-snakeiq-design-syste-20ad5262-3ccc-4fb8-91f7-5bb02dbd896c/components/media/fig-assets.css",
  "_ds/lachesis-foundation-snakeiq-design-syste-20ad5262-3ccc-4fb8-91f7-5bb02dbd896c/components/bottom-sheet/fig-assets.css",
  "assets/bot-avatar.png",
  "assets/snake-photo-wide.jpg",
  "assets/swelling-mark-illustration.png",
  "assets/snakeiq-app-icon.png",
  "assets/snakeiq-wordmark.png",
  "assets/species/mamba_black.jpg",
  "assets/species/cobra_mozam.jpg",
  "assets/species/grass_olive.jpg",
  "assets/species/mole.jpg",
  "assets/species/tiger_eastern.jpg",
  "assets/maps/swellendam.png",
  "assets/maps/mbombela.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // One at a time, ignoring failures: a single missing file must not abort the install
    // and leave the phone with no offline copy at all.
    await Promise.all(PRECACHE.map((u) => c.add(new Request(u, { cache: "reload" })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isPage = req.mode === "navigate" || url.pathname.endsWith(".html") ||
                 url.pathname.endsWith("/") || url.pathname.endsWith("sw.js");

  e.respondWith((async () => {
    const c = await caches.open(CACHE);

    if (isPage) {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        if (fresh && fresh.ok) { c.put(req, fresh.clone()); return fresh; }
      } catch (err) { /* no signal — fall through to the cached copy */ }
      return (await c.match(req, { ignoreSearch: true })) || Response.error();
    }

    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      // Opaque cross-origin responses (the Google font files) cache fine and are what
      // keeps type correct on airplane mode.
      if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
      return res;
    } catch (err) {
      return Response.error();
    }
  })());
});
