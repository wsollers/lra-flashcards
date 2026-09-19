const CACHE = "lra-flashcards-v8";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./review.js",
  "./storage.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "../card-index.json",
  "../cards/core/01-peano-systems.json",
  "../cards/lean/lean-core.json",
  "../cards/lean/mathlib-analysis-algebra.json"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => caches.match(event.request))
  );
});
