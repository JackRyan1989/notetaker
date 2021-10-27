// Create a list of the files to be cached:

const cacheName = 'noteTaker-v1';
const appShellFiles = [
    '/notetaker/dist/',
    '/notetaker/dist/index.html',
    '/notetaker/dist/app.js',
    '/notetaker/dist/index.css',
    '/dist/assets/logo/'
];

self.addEventListener('install', (e) => {
    e.waitUntil((async ()=> {
        const cache = await caches.open(cacheName);
        await cache.addAll(appShellFiles);
    }))
})

self.addEventListener('fetch', (e)=> {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        cache.put(e.request, response.clone());
        return response;
    })());
})