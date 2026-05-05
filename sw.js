const CACHE_NAME = 'cello-cv-v1';
const assets = [
  '/',
  'index.html',
  'app.js',
  'cel.jpeg',
  'about.html',
  'skills.html',
  'portfolio.html',
  'experience.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
