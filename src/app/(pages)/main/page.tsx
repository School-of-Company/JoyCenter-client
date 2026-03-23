import type { Metadata } from 'next';
import MainView from '@/views/main/ui/MainView';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://joy-center-client.vercel.app/main',
  },
  openGraph: {
    title: '더기쁨노인복지센터',
    description: '더 기쁘게, 더 따뜻하게 더기쁨노인복지센터 공식 홈페이지',
    url: 'https://joy-center-client.vercel.app/main',
    type: 'website',
    images: [{ url: 'https://joy-center-client.vercel.app/bgImg.png', width: 1200, height: 630 }],
  },
};

export default function MainPage() {
  return <MainView />;
}
