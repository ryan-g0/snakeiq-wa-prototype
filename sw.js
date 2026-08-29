const CACHE = "snakeiq-vc-2026-08-29";
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

// Precache everything the field test needs, one file at a time: a single 404 in
// addAll() rejects the whole install and leaves the phone with no offline copy at all.
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

// Cache-first for navigations and same-origin GETs: in the field there is no signal, and
// a network-first strategy would stall on every request until it timed out. A background
// revalidate picks up a new build the next time the phone does have a connection.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => {
      if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
      return res;
    }).catch(() => null);
    if (cached) return cached;
    const res = await net;
    if (res) return res;
    // Offline and never cached — hand back the shell rather than a browser error page.
    return (await caches.match("index.html")) || Response.error();
  })());
});
