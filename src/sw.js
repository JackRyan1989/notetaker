// Create a list of the files to be cached:

const cacheName = 'noteTaker-v1';
const appShellFiles = [
    '/notetaker/public/',
    '/notetaker/public/index.html',
    '/notetaker/public/app.js',
    '/notetaker/public/index.css'
];

self.addEventListener('install', (e) => {
    console.log('Service Worker Install');
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