import type { Metadata } from 'next';
import './globals.css';
import Header from '@/shared/ui/Header';
import { QueryProvider } from '@/shared/lib/QueryProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: '더기쁨 노인복지센터',
  description: '더 기쁘게, 더 따뜻하게 더기쁨 노인복지센터',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          {children}
          <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
