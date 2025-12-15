self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("vault-cache").then(cache => {
            return cache.addAll([
                "./",
                "./love.html",
                "./style.css",
                "./app.js"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
