import type { Metadata } from 'next';
import './globals.css';
import Header from '@/shared/ui/Header';
import { QueryProvider } from '@/shared/lib/QueryProvider';
import { Toaster } from 'sonner';
import { ScrollSectionProvider } from '@jump-section/react';

export const metadata: Metadata = {
  title: {
    default: '더기쁨노인복지센터',
    template: '%s | 더기쁨노인복지센터',
  },
  description: '더 기쁘게, 더 따뜻하게 더기쁨노인복지센터 공식 홈페이지',
  verification: {
    google: 'OLzejcP_7MSoaXG--kTDq5vKtHHuY7cd_yZjuhiLFmY',
  },

  alternates: {
    canonical: 'https://joy-center-client.vercel.app',
  },

  openGraph: {
    title: '더기쁨노인복지센터',
    description: '어르신을 위한 복지·문화·프로그램 안내 플랫폼',
    url: 'https://joy-center-client.vercel.app',
    siteName: '더기쁨노인복지센터',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
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
