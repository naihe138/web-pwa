self.addEventListener('fetch', e => {
  console.log(e.request.url)
  // e.respondWith()
})
// 生命周期 https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/service-worker-lifecycle
self.addEventListener('install', e => {
  console.log('install')
  // 直接去激活状态
  e.waitUntil(
    self.skipWaiting()
  )
})

self.addEventListener('activate', e => {
  console.log('activate1')
  // 在 activate 事件回调中执行该方法表示取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面，之后会被停止。
  e.waitUntil(
    self.clients.claim()
  )
})
