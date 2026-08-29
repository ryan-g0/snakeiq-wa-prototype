const CACHE = "snakeiq-vc-2026-08-29c";

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

// The bundles are self-contained EXCEPT for React, which stays on the CDN. Without these
// two the page still paints — the template's streaming placeholders render — but no logic
// mounts and every control is dead. They are the difference between an offline prototype
// and an offline photograph of one.
const CDN = [
  "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // One at a time: a single failure in addAll() rejects the whole install and leaves
    // the phone with no offline copy at all.
    await Promise.all(PRECACHE.concat(CDN).map(u => c.add(u).catch(() => {})));
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

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isCdn = CDN.indexOf(url.href) >= 0;
  if (!sameOrigin && !isCdn) return;

  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const res = await fetch(req);
      // Cache successful same-origin responses and the CDN scripts. Opaque responses are
      // not stored: their status is unreadable, so a cached failure would be permanent.
      if (res && (res.ok || (isCdn && res.type === "opaque")) && res.type !== "opaque"){
        const c = await caches.open(CACHE);
        c.put(req, res.clone());
      }
      return res;
    } catch (err) {
      // Offline and never cached. A navigation falls back to the index; anything else must
      // fail honestly — answering a script request with a page of HTML is what broke the
      // first version of this file.
      if (req.mode === "navigate"){
        const shell = await caches.match("index.html");
        if (shell) return shell;
      }
      throw err;
    }
  })());
});
