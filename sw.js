const CACHE_NAME = 'CACHE_VERSION' + 1
const CACHE_LIST = [
  '/index.html',
  'index.css',
  'index.js',
  '/api/list',
  '/'
]

async function fetchAndUpdate(request) {
  let res = await fetch(request); // 响应流，用过就没了，所以要克隆一份
  let resClone = res.clone()
  console.log(123)
  caches.open(CACHE_NAME).then(cache => cache.put(request, res))
  return  resClone
}

self.addEventListener('fetch', e => {
  console.log(e.request.url)

  // 请求策略
  if(e.request.url.includes('/api/list')) {
    e.respondWith(
      fetchAndUpdate(e.request).catch(err => {
        console.log(11, err)
        return caches.match(e.request)
      })
    )
    return
  }

  e.respondWith(
    fetch(e.request).catch(err => {
      return caches.match(e.request)
    })
  )
})

async function preCache() {
  let cache = await caches.open(CACHE_NAME)
  return cache.addAll(CACHE_LIST) // 添加缓存
}

async function clearCache() {
  // 拿到所有缓存，不是当前版本的，都删除
  let keys = await caches.keys();
  let arr = keys.filter(kye => {
    if (kye !== CACHE_NAME) {
      return caches.delete(kye)
    }
  })
  console.log(arr)
  return Promise.all(arr)
}

// 生命周期 https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/service-worker-lifecycle
self.addEventListener('install', e => {
  console.log('install')
  // 直接去激活状态
  e.waitUntil(
    preCache().then(self.skipWaiting)
  )
})

self.addEventListener('activate', e => {
  console.log('activate1')
  // 在 activate 事件回调中执行该方法表示取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面，之后会被停止。
  e.waitUntil(
    Promise.all([
      clearCache(), // 版本变化，清楚缓存
      self.clients.claim() 
    ])
  )
})

