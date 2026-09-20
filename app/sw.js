const CACHE = "lra-flashcards-v11";
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
  "../cards/core/28-iece-identity-equality.json",
  "../cards/core/29-logic-natural-deduction.json",
  "../cards/core/30-zfc-set-theory.json",
  "../cards/core/31-relations-functions-order.json",
  "../cards/core/32-well-founded-well-defined.json",
  "../cards/core/33-calculus-i.json",
  "../cards/core/34-organic-chemistry-i.json",
  "../cards/lean/lean-core.json",
  "../cards/lean/mathlib-analysis-algebra.json",
  "../assets/organic/alkane.svg",
  "../assets/organic/alkene.svg",
  "../assets/organic/alkyne.svg",
  "../assets/organic/arene.svg",
  "../assets/organic/alcohol.svg",
  "../assets/organic/ether.svg",
  "../assets/organic/epoxide.svg",
  "../assets/organic/peroxide.svg",
  "../assets/organic/aldehyde.svg",
  "../assets/organic/ketone.svg",
  "../assets/organic/carboxylic-acid.svg",
  "../assets/organic/ester.svg",
  "../assets/organic/acid-chloride.svg",
  "../assets/organic/amide.svg",
  "../assets/organic/amine.svg",
  "../assets/organic/nitrile.svg",
  "../assets/organic/thiol.svg",
  "../assets/organic/thioether.svg"
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
