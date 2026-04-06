import type { Metadata } from 'next';
import MainView from '@/views/main/ui/MainView';

export const metadata: Metadata = {
  keywords: [
    '더기쁨노인복지센터',
    '노인복지센터',
    '광주 노인복지',
    '광주 서구 노인복지',
    '어르신 돌봄',
    '재가복지',
    '노인 프로그램',
    '복지관',
    '방문요양',
    '주야간보호',
    '노인 일자리',
    '금호동 복지센터',
    '더기쁨',
  ],
  alternates: {
    canonical: 'https://www.joycenter.kr/',
  },
  openGraph: {
    title: '더기쁨노인복지센터',
    description: '더 기쁘게, 더 따뜻하게 더기쁨노인복지센터 공식 홈페이지',
    url: '/',
    type: 'website',
    images: [{ url: '/bgImg.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '더기쁨노인복지센터',
  description: '더 기쁘게, 더 따뜻하게 어르신의 일상에 기쁨과 안심을 더하는 노인복지센터',
  url: 'https://www.joycenter.kr/',
  telephone: '062-372-3525',
  faxNumber: '062-372-3526',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '금부로 103번길 4-11',
    addressLocality: '광주',
    addressRegion: '서구 금호동',
    addressCountry: 'KR',
  },
  image: 'https://www.joycenter.kr/bgImg.png',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainView />
    </>
  );
}
