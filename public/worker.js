let STATIC_CACHE_NAME = "gfg-pwa";
let DYNAMIC_CACHE_NAME = "dynamic-gfg-pwa";

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

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(function(cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    let cacheWhitelist = ["gfg-pwa"];
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});

self.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(fromCache(event.request));
        return;
    }

    event.respondWith(fromNetwork(event.request).catch(() => fromCache(event.request)));
});

async function fromNetwork(request) {
    const response = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE_NAME);

    cache.put(request, response.clone());

    return response;
}

async function fromCache(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const response = await cache.match(request);

    return response || Promise.reject('No internet connection found');
};
