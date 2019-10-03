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

// deletes old cache
self.addEventListener('activate', function (event) {
            // console.log("Service Worker activated");
            e.waitUntil(
                caches.keys().then(cacheNames => {
                    return Promise.all(
                        cacheNames.filter(function (cacheName) {
                            return cacheName.startsWith(staticCacheName) &&
                                cacheName != staticCacheName;
                        }).map(function (cacheName) {
                            return caches.delete(cacheName);
                        })
                    );
                    // console.log("Old cache removed");
                })
            );
        });

    self.addEventListener('fetch', function (event) {
        // console.log("Service Worker starting fetch");
        event.respondWith(
            caches.open(staticCacheName).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    if (response) {
                        // console.log("data fetched from cache");
                        return response;
                    }
                    else {
                        return fetch(event.request).then(function (networkResponse) {
                            // console.log("data fetched from network", event.request.url);
                            //cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        }).catch(function (error) {
                            console.log('Unable to fetch data from network', event.request.url, error);
                        });
                    }
                });
            }).catch(function (error) {
                console.log('Something went wrong with Service Worker fetch intercept', error);
            })
        );
    });
