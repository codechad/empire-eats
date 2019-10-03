/* Setting up the variable for the service worker functions */
const staticCacheName = 'restaurant-reviews-v4';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCacheName).then(cache => {
            // console.log("Service Worker installed");
            return cache.addAll([
                '/',
                'css/styles.css',
                'data/restaurants.json',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg',
                'img/favicon-32x32.png',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'restaurant.html'
            ]);
        })
    );
});
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
