const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/cached_local_page.html",
  //"/css/style.css",
  //"/js/app.js",
  "/images/12 Sem Título_20230101152253.png",
  "/images/20221224203650.png",
  "/images/IMG-20220930-WA0047.jpg",
  "/images/IMG-20221123-WA0048.jpg",
  "/images/IMG_20221223_182141.jpg",
  "/images/IMG_20221224_102948~2.jpg",
  "/images/IMG_20221224_171140.jpg",
  "/images/IMG_20221224_171224.jpg",
  "/images/IMG_20221224_182958.jpg",
  "/images/Logotipo_IFET.svg.png",
  "/images/app-store.png",
  "/images/google-play.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
