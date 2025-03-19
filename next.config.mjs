/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 外部画像の最適化設定 - sakuya-kyudogu.jpからの画像を許可
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sakuya-kyudogu.jp',
        pathname: '/**',
      },
    ],
  },
  // セキュリティヘッダー設定
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
  // PWA設定 - publicディレクトリ内のmanifest.jsonとserviceworker.jsを使用
  // PWA設定を有効にする場合は、next-pwaプラグインを追加することを検討してください
  // sitemap.xmlは別途作成するため不要
};

export default nextConfig;
