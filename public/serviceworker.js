// キャッシュ名（バージョン管理用）
const CACHE_NAME = 'sakuya-kyudo-v1';

// キャッシュするファイル（実際に存在するファイルのみ）
const urlsToCache = [
  '/',
  '/site.webmanifest',
  '/manifest.json',
  '/favicon.ico',
  '/sakuya-pwa.jpg',
  '/sakuya-logo.svg',
  '/sakuya-order-ogp.jpg'
  // Next.jsの動的生成ファイルはここでは指定しない
];

// インストール時にキャッシュを初期化
self.addEventListener('install', (event) => {
  console.log('Service Worker: インストール中');
  self.skipWaiting(); // 新しいService Workerをすぐにアクティブにする
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: キャッシュを開きました');
        // 各URLを個別に追加し、404の場合はスキップ
        const cachePromises = urlsToCache.map(url => {
          return fetch(url)
            .then(response => {
              if (!response.ok) {
                console.log(`Service Worker: "${url}"のキャッシュをスキップしました - ${response.status}`);
                return;
              }
              console.log(`Service Worker: "${url}"をキャッシュしました`);
              return cache.put(url, response);
            })
            .catch(error => {
              console.log(`Service Worker: "${url}"のキャッシュに失敗しました - ${error}`);
            });
        });
        return Promise.all(cachePromises);
      })
      .catch(error => {
        console.error('Service Worker: キャッシュの初期化に失敗しました:', error);
      })
  );
});

// キャッシュの管理（古いキャッシュの削除）
self.addEventListener('activate', (event) => {
  console.log('Service Worker: アクティブ化');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 古いキャッシュを削除しました:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 制御下のクライアントをすぐに確保
  return self.clients.claim();
});

// リクエストの処理（ネットワークファースト戦略）
self.addEventListener('fetch', (event) => {
  // 開発サーバー関連のリクエスト（webpack, HMR）は無視
  if (event.request.url.includes('webpack-hmr') || 
      event.request.url.includes('webpack.hot-update') ||
      event.request.url.includes('on-demand-entries') ||
      event.request.url.includes('dev/') ||
      event.request.url.includes('_next/webpack')) {
    return;
  }
  
  // 重要な静的アセットのみをキャッシュ対象とする
  if (
    event.request.mode === 'navigate' || 
    event.request.destination === 'style' ||
    event.request.destination === 'script' ||
    event.request.destination === 'image' ||
    event.request.destination === 'manifest'
  ) {    
    event.respondWith(
      // ネットワークファースト戦略：まずネットワークからフェッチを試みる
      fetch(event.request)
        .then(response => {
          // 有効なレスポンスをキャッシュに保存
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // ネットワークエラーならキャッシュから
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // キャッシュになければ、リクエストに最も近いページを返す
              if (event.request.mode === 'navigate') {
                return caches.match('/');
              }
              return null;
            });
        })
    );
  }
}); 