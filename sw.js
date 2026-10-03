// Reto Panda — Service Worker (Agente Release)
// v5 (2026-10-03): precache del banco MVP Tier 1 + ilustraciones MVP,
// CSS reales de v51_modular.html y caché en runtime (cache.put).
const CACHE_NAME = 'reto-panda-v5';

// IMPORTANTE: cada ruta de esta lista DEBE existir en disco.
// Si una sola falla, cache.addAll() rechaza y la instalación del SW se invalida.
const CORE_ASSETS = [
  './',
  './index.html',
  './v51_modular.html',
  './manifest.json',
  './js/main.js',
  './js/store.js',
  './js/db.js',
  './js/ui.js',
  './js/game.js',
  // CSS en el mismo orden que los <link> de v51_modular.html
  './css/variables.css',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/states.css',
  './css/game.css',
  './css/popups.css',
  './css/tiers/tier1.css?v=3', // URL exacta que pide v51_modular.html (respaldo: ignoreSearch)
  './css/tiers/tier2.css',
  './css/tiers/tier3.css',
  // Trivia JSON — necesarios para offline-first (Tarea 2 Sprint 2026-06-24)
  './assets/data/db_mvp_6_7.json', // Banco MVP Tier 1 (fuente principal de js/db.js)
  './assets/data/db_6_7.json',     // Fallback legacy de js/db.js
  './assets/data/db_8_10.json',
  './assets/data/db_11_13.json',
  // Assets críticos - Tier 1
  './assets/mascotas/tier1/m_panda.webp',
  './assets/interface/mochi_profile_badge.webp',
  './assets/fondos/tier1/bg_sky_clay.webp',
  './assets/badges/star_counter_bg.webp',
  // Imágenes estáticas del shell (splash + onboarding de v51_modular.html)
  './assets/interface/caratula.webp',
  './assets/interface/splash_icons/world_isla.webp',
  './assets/interface/splash_icons/world_oceano.webp',
  './assets/interface/splash_icons/world_lab.webp',
  './assets/interface/splash_icons/world_destellos.webp',
  './assets/interface/splash_icons/world_cohete.webp',
  './assets/interface/onboarding_hero.webp',
  './assets/interface/icon_cloud.webp',
  './assets/interface/icon_star_clay.webp'
];

// Ilustraciones MVP referenciadas en db_mvp_6_7.json (campo `img`).
// Generada automáticamente desde el JSON (103 archivos, ~2.55 MB).
// NO incluir los test_opt* de la carpeta t1_mvp.
const QUESTION_IMAGES = [
  './assets/preguntas/t1_mvp/mvp_ciencias_001.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_021.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_034.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_041.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_054.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_081.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_087.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_094.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_101.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_107.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_114.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_127.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_141.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_147.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_154.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_161.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_181.webp',
  './assets/preguntas/t1_mvp/mvp_ciencias_194.webp',
  './assets/preguntas/t1_mvp/mvp_historia_001.webp',
  './assets/preguntas/t1_mvp/mvp_historia_021.webp',
  './assets/preguntas/t1_mvp/mvp_historia_091.webp',
  './assets/preguntas/t1_mvp/mvp_historia_111.webp',
  './assets/preguntas/t1_mvp/mvp_historia_121.webp',
  './assets/preguntas/t1_mvp/mvp_historia_131.webp',
  './assets/preguntas/t1_mvp/mvp_historia_141.webp',
  './assets/preguntas/t1_mvp/mvp_historia_161.webp',
  './assets/preguntas/t1_mvp/mvp_historia_171.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_021.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_031.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_041.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_051.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_061.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_071.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_081.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_091.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_101.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_111.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_121.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_131.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_141.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_151.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_161.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_171.webp',
  './assets/preguntas/t1_mvp/mvp_ingles_191.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_005.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_021.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_041.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_045.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_049.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_061.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_065.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_069.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_113.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_157.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_169.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_173.webp',
  './assets/preguntas/t1_mvp/mvp_lenguaje_181.webp',
  './assets/preguntas/t1_mvp/mvp_logica_001.webp',
  './assets/preguntas/t1_mvp/mvp_logica_011.webp',
  './assets/preguntas/t1_mvp/mvp_logica_016.webp',
  './assets/preguntas/t1_mvp/mvp_logica_026.webp',
  './assets/preguntas/t1_mvp/mvp_logica_031.webp',
  './assets/preguntas/t1_mvp/mvp_logica_036.webp',
  './assets/preguntas/t1_mvp/mvp_logica_046.webp',
  './assets/preguntas/t1_mvp/mvp_logica_051.webp',
  './assets/preguntas/t1_mvp/mvp_logica_061.webp',
  './assets/preguntas/t1_mvp/mvp_logica_066.webp',
  './assets/preguntas/t1_mvp/mvp_logica_076.webp',
  './assets/preguntas/t1_mvp/mvp_logica_081.webp',
  './assets/preguntas/t1_mvp/mvp_logica_086.webp',
  './assets/preguntas/t1_mvp/mvp_logica_091.webp',
  './assets/preguntas/t1_mvp/mvp_logica_096.webp',
  './assets/preguntas/t1_mvp/mvp_logica_101.webp',
  './assets/preguntas/t1_mvp/mvp_logica_106.webp',
  './assets/preguntas/t1_mvp/mvp_logica_111.webp',
  './assets/preguntas/t1_mvp/mvp_logica_116.webp',
  './assets/preguntas/t1_mvp/mvp_logica_126.webp',
  './assets/preguntas/t1_mvp/mvp_logica_131.webp',
  './assets/preguntas/t1_mvp/mvp_logica_136.webp',
  './assets/preguntas/t1_mvp/mvp_logica_141.webp',
  './assets/preguntas/t1_mvp/mvp_logica_146.webp',
  './assets/preguntas/t1_mvp/mvp_logica_156.webp',
  './assets/preguntas/t1_mvp/mvp_logica_166.webp',
  './assets/preguntas/t1_mvp/mvp_logica_181.webp',
  './assets/preguntas/t1_mvp/mvp_logica_191.webp',
  './assets/preguntas/t1_mvp/mvp_logica_196.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_001.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_006.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_021.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_036.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_046.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_056.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_071.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_081.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_086.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_091.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_096.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_116.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_121.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_126.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_141.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_156.webp',
  './assets/preguntas/t1_mvp/mvp_matematicas_176.webp'
];

const ASSETS_TO_CACHE = CORE_ASSETS.concat(QUESTION_IMAGES);

// Recursos estáticos pesados que rara vez cambian → cache-first.
const CACHE_FIRST_RE = /\.(?:webp|png|jpe?g|gif|svg|ico|mp3|ogg|wav|m4a)$/i;

// Install event: cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // cache: 'reload' evita que el precache tome copias viejas de la caché HTTP.
        return cache.addAll(ASSETS_TO_CACHE.map(url => new Request(url, { cache: 'reload' })));
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

// Guarda en caché solo respuestas completas (200), same-origin y sin redirección.
// (Las respuestas 206 de peticiones Range de audio no se pueden guardar con cache.put.)
function putInCache(request, response) {
  if (!response || response.status !== 200 || response.type !== 'basic' || response.redirected) return;
  const copy = response.clone();
  caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => {});
}

// Busca coincidencia exacta y, como respaldo, ignorando el query string
// (p. ej. css/tiers/tier1.css?v=3 → tier1.css, v51_modular.html?x=1 → v51_modular.html).
function matchFromCache(request) {
  return caches.match(request).then(hit => hit || caches.match(request, { ignoreSearch: true }));
}

// Network-first: HTML / JS / CSS / JSON (para recibir actualizaciones cuando hay red).
function networkFirst(request) {
  return fetch(request).then(response => {
    if (!response.ok) throw new Error('Network response not ok');
    putInCache(request, response);
    return response;
  }).catch(() => {
    return matchFromCache(request).then(hit => {
      if (hit) return hit;
      // Navegación sin red y sin coincidencia: servir el shell del juego.
      if (request.mode === 'navigate') return caches.match('./index.html').then(h => h || caches.match('./v51_modular.html'));
      return Response.error();
    });
  });
}

// Cache-first: imágenes / audio (pesados y estables). Si no está, red + guardar.
function cacheFirst(request) {
  return matchFromCache(request).then(hit => {
    if (hit) return hit;
    return fetch(request).then(response => {
      putInCache(request, response);
      return response;
    });
  });
}

// Fetch event: estrategia por tipo de recurso
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Solo same-origin (el CDN de Howler y otros externos van directo a la red;
  // si falla offline, el juego usa el sintetizador nativo vía window._HOWLER_FAILED).
  if (url.origin !== self.location.origin) return;

  const isMedia = CACHE_FIRST_RE.test(url.pathname) ||
    request.destination === 'image' || request.destination === 'audio';

  event.respondWith(isMedia ? cacheFirst(request) : networkFirst(request));
});
