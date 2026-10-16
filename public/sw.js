// CAD Workshop 3D - Service Worker para PWA Offline (Android & Netlify)
const CACHE_NAME = 'cad-workshop-3d-v4';

const STATIC_PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './david.jpeg',
  './david.mp4',
  './icon.svg',
  'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@500;700;800;900&family=Rajdhani:wght@500;600;700&display=swap'
];

// Instalación: Precargar recursos críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE).catch((err) => {
        console.warn('[SW] Fallback parcial durante precache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación: Limpiar cachés antiguas y tomar control inmediato
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepción de solicitudes de red con estrategia Cache-First y fallback offline
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Solicitudes de navegación HTML (abrir o refrescar la aplicación)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Si está sin conexión, servir index.html desde la caché
          const cached = await caches.match('./index.html') || await caches.match('./');
          if (cached) return cached;
          return new Response('Aplicación CAD 3D sin conexión disponible.', {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // Recursos estáticos: scripts, estilos, fuentes, imágenes, videos (Cache-First con actualización de fondo)
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResponse));
          }
        }).catch(() => {/* Offline silente */});

        return cachedResponse;
      }

      return fetch(req)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, responseToCache));
          return networkResponse;
        })
        .catch(() => {
          if (req.destination === 'image') {
            return caches.match('./david.jpeg') || caches.match('./icon.svg');
          }
          if (req.destination === 'video') {
            return caches.match('./david.mp4');
          }
          return null;
        });
    })
  );
});
