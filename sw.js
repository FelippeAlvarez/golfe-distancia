// Cache simples do "casco" do app (somente arquivos do próprio app).
var CACHE = 'golfe-v0.1.0';
var ARQUIVOS = ['./', './index.html', './manifest.webmanifest'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ARQUIVOS); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }));
});
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url);
  if(u.origin !== location.origin) return; // mapas e bibliotecas externas: rede normal
  e.respondWith(fetch(e.request).catch(function(){ return caches.match(e.request); }));
});
