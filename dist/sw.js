(()=>{var c="noteTaker-v1",n=["/notetaker/public/","/notetaker/public/index.html","/notetaker/public/app.js","/notetaker/public/index.css"];self.addEventListener("install",e=>{console.log("Service Worker Install"),e.waitUntil(async()=>{await(await caches.open(c)).addAll(n)})});self.addEventListener("fetch",e=>{e.respondWith((async()=>{let t=await caches.match(e.request);if(t)return t;let a=await fetch(e.request);return(await caches.open(c)).put(e.request,a.clone()),a})())});})();
//# sourceMappingURL=sw.js.map