const CACHE_NAME = "pt-univ-vol1-v4";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./trade_english.html",
  "./course_data.js",
  "./trade_vocab_data.js",
  "./br_clips_data.js",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  // Never intercept cross-origin requests (e.g. Fish Audio Drama-3 HuggingFace Space SSE/audio)
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Network-first for HTML/JS so updates appear immediately
  if (
    event.request.mode === "navigate" ||
    event.request.url.endsWith(".html") ||
    event.request.url.endsWith(".js")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (
          response &&
          response.status === 200 &&
          (event.request.url.includes("/pages/") || event.request.url.includes("/audio/"))
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
