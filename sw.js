const CACHE_NAME = 'reto-panda-v3';
const ASSETS_TO_CACHE = [
  './',
  './v51_modular.html',
  './manifest.json',
  './js/main.js',
  './js/store.js',
  './js/db.js',
  './js/ui.js',
  './js/game.js',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/tiers/tier1.css',
  './css/tiers/tier2.css',
  './css/tiers/tier3.css',
  // Trivia JSON — necesarios para offline-first (Tarea 2 Sprint 2026-06-24)
  './assets/data/db_6_7.json',
  './assets/data/db_8_10.json',
  './assets/data/db_11_13.json',
  // Assets críticos - Tier 1
  './assets/mascotas/tier1/m_panda.webp',
  './assets/interface/mochi_profile_badge.webp',
  './assets/fondos/tier1/bg_sky_clay.webp',
  './assets/badges/star_counter_bg.webp'
];

// Install event: cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: network first, then cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      if (!response.ok) throw new Error('Network response not ok');
      return response;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
