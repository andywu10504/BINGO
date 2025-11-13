// ========================================
//   BINGO PWA Service Worker
//   支援離線、快取、更新
// ========================================

const CACHE_NAME = "bingo-cache-v1";

// 需要快取的必要檔案
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "sw.js",

  // icons
  "icons/icon-192.png",
  "icons/icon-512.png",

  // CSS / JS CDN 不會被快取
];

// ========================================
//   install：快取必要檔案
// ========================================
self.addEventListener("install", (event) => {
  console.log("[SW] Install");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );

  self.skipWaiting(); // 立即接管
});

// ========================================
//   activate：清除舊快取
// ========================================
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim(); // 接管所有頁面
});

// ========================================
//   fetch：優先讀取快取，其次抓網路
// ========================================
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => {
          // 若離線且找不到，fallback 可加入提示頁
          return caches.match("index.html");
        })
      );
    })
  );
});
