import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import Header from '@/shared/ui/Header';
import { QueryProvider } from '@/shared/lib/QueryProvider';
import { Toaster } from 'sonner';
import { ScrollSectionProvider } from '@jump-section/react';
import { pretendard } from '@/shared/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://joy-center-client.vercel.app'),
  title: {
    default: '더기쁨노인복지센터',
    template: '%s | 더기쁨노인복지센터',
  },
  description: '더 기쁘게, 더 따뜻하게 더기쁨노인복지센터 공식 홈페이지',
  verification: {
    google: 'gHhBwfHWdKD_7JX44AncUnNtxSw9VZQac-Ry6tuhaiE',
  },

  alternates: {
    canonical: 'https://joy-center-client.vercel.app',
  },
  applicationName: '더기쁨노인복지센터',
  openGraph: {
    title: '더기쁨노인복지센터',
    description: '어르신을 위한 복지·문화·프로그램 안내 플랫폼',
    url: 'https://joy-center-client.vercel.app',
    siteName: '더기쁨노인복지센터',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang="ko" className={pretendard.variable}>
      <body suppressHydrationWarning nonce={nonce}>
        <ScrollSectionProvider>
          <QueryProvider>
            <Header />
            {children}
            <Toaster richColors />
          </QueryProvider>
        </ScrollSectionProvider>
      </body>
    </html>
  );
}
