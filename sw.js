const CACHE_NAME = 'cv-pwa-v4'; // <-- SUDAH DIUBAH JADI v4 AGAR OTOMATIS UPDATE
const assets = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './cel.jpeg',
  './home.html',
  './about.html',
  './education.html',
  './experience.html',
  './skills.html',
  './portfolio.html',
  './certificate.html',
  './contact.html'
];

// Install Service Worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets');
      return cache.addAll(assets);
    })
  );
});

// Activate dan Hapus Cache Lama
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetching
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
