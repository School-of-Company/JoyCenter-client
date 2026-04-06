import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/post'],
        disallow: ['/postWrite', '/callback'],
      },
    ],
    sitemap: 'https://www.joycenter.kr/sitemap.xml',
  };
}
