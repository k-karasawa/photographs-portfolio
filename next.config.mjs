/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sakuya-kyudogu.jp',
        pathname: '/html/upload/**',
      },
    ],
  },
};

export default nextConfig;
