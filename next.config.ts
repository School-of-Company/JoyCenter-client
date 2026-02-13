import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const cspDev = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http://t1.daumcdn.net http://dapi.kakao.com",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' https: data: blob: http://t1.daumcdn.net http://dapi.kakao.com http://mts.daumcdn.net",
  "font-src 'self' https: data:",
  "connect-src 'self' https: http://dapi.kakao.com ws: wss:",
  "media-src 'self' https: data: blob:",
  "frame-src 'self' https: http://t1.daumcdn.net http://dapi.kakao.com",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const cspProd = [
  "default-src 'self'",

  "script-src 'self' 'unsafe-inline' https://accounts.google.com https://apis.google.com https://www.gstatic.com https://dapi.kakao.com https://t1.daumcdn.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.kakao.com https://*.daumcdn.net https://t1.daumcdn.net https://map.kakao.com https://dapi.kakao.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://oauth2.googleapis.com https://www.googleapis.com https://kapi.kakao.com https://kauth.kakao.com https://dapi.kakao.com wss:",
  "media-src 'self' data: blob:",
  "frame-src 'self' https://accounts.google.com https://kauth.kakao.com",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  ...(isProd
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
      ]
    : []),
  {
    key: 'Content-Security-Policy',
    value: isProd ? cspProd : cspDev,
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: [
      '@tanstack/react-query',
      'framer-motion',
      'react-icons',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
        port: '',
        pathname: '/gwangju-talent-festival-bucket/**',
      },
      {
        protocol: 'https',
        hostname: 'joycenter-s3.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      {
        source: '/(sitemap.xml|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=600, s-maxage=600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
