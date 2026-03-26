import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function buildCsp(nonce: string, isProd: boolean): string {
  if (isProd) {
    return [
      "default-src 'self'",
      'upgrade-insecure-requests',
      `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://accounts.google.com https://apis.google.com https://www.gstatic.com https://dapi.kakao.com https://t1.daumcdn.net`,
      `style-src 'self' 'nonce-${nonce}' https://cdn.jsdelivr.net`,
      "img-src 'self' data: blob: https://*.kakao.com https://*.daumcdn.net https://t1.daumcdn.net https://map.kakao.com https://dapi.kakao.com https://joycenter-s3.s3.eu-north-1.amazonaws.com https://img.youtube.com",
      "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
      "connect-src 'self' https://oauth2.googleapis.com https://www.googleapis.com https://kapi.kakao.com https://kauth.kakao.com https://dapi.kakao.com wss:",
      "media-src 'self' data: blob:",
      "frame-src 'self' https://accounts.google.com https://kauth.kakao.com",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ');
  }

  return [
    "default-src 'self'",
    'upgrade-insecure-requests',
    `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://accounts.google.com https://apis.google.com https://www.gstatic.com https://dapi.kakao.com https://t1.daumcdn.net`,
    `style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net`,
    "img-src 'self' data: blob: https://*.kakao.com https://*.daumcdn.net https://t1.daumcdn.net https://map.kakao.com https://dapi.kakao.com https://joycenter-s3.s3.eu-north-1.amazonaws.com https://img.youtube.com",
    "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
    "connect-src 'self' https://oauth2.googleapis.com https://www.googleapis.com https://kapi.kakao.com https://kauth.kakao.com https://dapi.kakao.com ws: wss:",
    "media-src 'self' data: blob:",
    "frame-src 'self' https://accounts.google.com https://kauth.kakao.com",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
}

export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const isProd = process.env.NODE_ENV === 'production';
  const csp = buildCsp(nonce, isProd);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    {
      source:
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
