const CACHE_NAME = "version-1";
const urlsToCache = [
    "index.html",
    "offline.html",
    "style.css",
    "script.js",
    // Add URLs of your API endpoints here
    "https://cdcmemphremagog.com/wp-content/plugins/cdc-custom-map/public/api.php",
    "https://cdcmemphremagog.com/wp-json/wp/v2/service_sector?_embed&per_page=100",
];

this.addEventListener("install", (event) => {
    event.waitUntil(
    //delays the event until the Promise is resolved
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            console.log("fetching", event.request.url);
            let requestUrl = event.request.clone();
            fetch(requestUrl)
                .then((response) => {
                    if (!response) {
                        return res;
                    }
                    let responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return res || caches.match("offline.html");
                });

            return fetch(event.request).catch(() => caches.match("offline.html"));
        })
    );
});

this.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});
