import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/main', '/post'],
        disallow: ['/postWrite', '/callback'],
      },
    ],
    sitemap: 'https://joy-center-client.vercel.app/sitemap.xml',
  };
}
