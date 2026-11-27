/* Deal Desk offline cache.
   The page itself is network-first: online you always get the newest version, offline you get the saved copy.
   Icons and the manifest come from the saved copy. Bump CACHE when you change an icon or the manifest. */
var CACHE = 'deal-desk-v7';
var ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
var PAGE_WAIT_MS = 3000;   // on a slow connection, show the saved page after this long

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* cache: 'reload' skips the browser's own HTTP cache, so a file fetched a few minutes ago cannot be saved as the new one. */
      return Promise.all(ASSETS.map(function (u) {
        return fetch(new Request(u, { cache: 'reload' })).then(function (res) {
          if (!res.ok) throw new Error('bad response for ' + u);
          return c.put(u, res);
        });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Ask the server for the page (revalidating, so a stale browser copy is never used), save what comes back, and fall back to the saved page when offline or slow. */
function pageFirst(e, req) {
  var net = fetch(req.url, { cache: 'no-cache' }).then(function (res) {
    if (res.ok) {
      var a = res.clone(), b = res.clone();
      e.waitUntil(caches.open(CACHE).then(function (c) { return Promise.all([c.put('./index.html', a), c.put('./', b)]); }));
    }
    return res;
  });
  var wait = new Promise(function (resolve) { setTimeout(function () { resolve(null); }, PAGE_WAIT_MS); });
  var first = net.then(function (r) { return r.ok ? r : null; }, function () { return null; });
  return Promise.race([first, wait]).then(function (res) {
    if (res) return res;
    return caches.match('./index.html').then(function (hit) { return hit || net; });
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // store and auction links are never intercepted
  if (req.mode === 'navigate') { e.respondWith(pageFirst(e, req)); return; }
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
        return res;
      });
    })
  );
});
