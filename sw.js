const CACHE_NAME = 'cello-pwa-v2';
const assets = [
  '/',
  'index.html',
  'app.js',
  'cel.jpeg',
  'jasa.jpeg',
  'folio.jpeg',
  'home.html',
  'about.html',
  'skills.html',
  'portfolio.html',
  'experience.html',
  'certificate.html',
  'contact.html',
  'github.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
