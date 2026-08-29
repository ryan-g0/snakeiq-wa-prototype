const CACHE = "snakeiq-vc-2026-08-29b";
const PRECACHE = [
  "./",
  "index.html",
  "bot-c.html",
  "bot-c-testkit.html",
  "sync-tool.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png"
];

// Precache one file at a time: a single 404 in addAll() rejects the whole install and
// leaves the phone with no offline copy at all.
self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(PRECACHE.map(u => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Serve ONLY what was precached from the cache; everything else goes straight to the
// network untouched.
//
// The earlier version answered any uncached same-origin request with index.html as a
// fallback. That is fine for a navigation and fatal for anything else: a script request
// came back as a page of HTML, the runtime failed to parse it, and the prototype painted
// its start screen from the template's streaming placeholders with no logic behind it —
// visible, correctly laid out, and completely dead to taps.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.ok && res.type === "basic"){
        const c = await caches.open(CACHE);
        c.put(req, res.clone());
      }
      return res;
    } catch (err) {
      // Offline and never cached. A navigation can fall back to the index; anything else
      // must fail honestly rather than be handed a page of HTML.
      if (req.mode === "navigate"){
        const shell = await caches.match("index.html");
        if (shell) return shell;
      }
      throw err;
    }
  })());
});
