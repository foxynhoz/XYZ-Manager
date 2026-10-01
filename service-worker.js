const CACHE_NAME = "xyz-manager-v3";

const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/main.js",
  "./js/firebase.js",
  "./js/i18n.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Guarda cada arquivo separadamente: se um deles faltar (ex.: um ícone), o resto continua sendo guardado.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(APP_SHELL.map((file) => cache.add(file).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

// Remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Rede primeiro; se estiver offline, usa o cache.
// Só guarda arquivos do próprio site e os scripts do Firebase (gstatic).
// As chamadas ao Firestore/Auth passam direto, sem cache.
// Links de convite (?convite=...) nunca vão para o cache, porque carregam o token.
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  const mesmoSite = url.origin === self.location.origin;
  const scriptFirebase = request.destination === "script" && url.hostname === "www.gstatic.com";
  if (!mesmoSite && !scriptFirebase) {
    return;
  }
  const temConvite = url.searchParams.has("convite");

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok && !temConvite) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request, { ignoreSearch: temConvite });
      })
  );
});
