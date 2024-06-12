// Filename - public/worker.js

let STATIC_CACHE_NAME = "gfg-pwa";
let DYNAMIC_CACHE_NAME = "dynamic-gfg-pwa";

// Add Routes and pages using React Browser Router
let urlsToCache = 
[
    '#/',
    '#/:accountId/user',
    '#/:accountId/user/new',
    '#/:accountId/user/new/start',
    '#/:accountId/user/new/basic',
    '#/:accountId/user/new/personal',
    '#/:accountId/user/new/deposit',
    '#/:accountId/user/work',
    '#/:accountId/user/completed',
];

// Install a service worker
self.addEventListener("install", (event) => {
    // Perform install steps
    event.waitUntil(
        caches
            .open(STATIC_CACHE_NAME)
            .then(function (cache) {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
    // Проверяем, есть ли соединение
    navigator.onLine? fetchFromNetwork(event) : fetchFromCache(event);

    // Функция для получения ресурса из сети
    function fetchFromNetwork(event) {
        return fetch(event.request).then((fetchRes) => {
            // Если ресурс получен успешно, сохраняем его в динамический кэш
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
            });
            // Возвращаем результат из сети
            return fetchRes;
        }).catch((error) => {
            // В случае ошибки в сети, пытаемся получить ресурс из кэша
            return caches.match(event.request);
        });
    }

    // Функция для получения ресурса из кэша
    function fetchFromCache(event) {
        return caches.match(event.request).then((cacheRes) => {
            // Если ресурс найден в кэше, возвращаем его
            return cacheRes || fetch(event.request);
        });
    }
});


// Update a service worker
self.addEventListener("activate", (event) => {
    let cacheWhitelist = ["gfg-pwa"];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (
                        cacheWhitelist.indexOf(
                            cacheName
                        ) === -1
                    ) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
