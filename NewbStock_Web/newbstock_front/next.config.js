// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://newbstock.de.dev-cos.com/:path*`, // API 서버로의 프록시 설정
      },
    ];
  },
};

module.exports = nextConfig;
