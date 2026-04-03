import type { Metadata } from 'next';
import PostPage from '@/views/post/ui/PostPage';

export const metadata: Metadata = {
  title: '게시판',
  description: '더기쁨노인복지센터의 공지사항과 소식을 확인하세요.',
  keywords: [
    '더기쁨노인복지센터 공지사항',
    '노인복지센터 소식',
    '복지센터 행사',
    '어르신 프로그램 안내',
    '더기쁨 게시판',
  ],
  alternates: {
    canonical: 'https://www.joycenter.kr/post',
  },
  openGraph: {
    title: '게시판 | 더기쁨노인복지센터',
    description: '더기쁨노인복지센터의 공지사항과 소식을 확인하세요.',
    url: 'https://www.joycenter.kr/post',
    type: 'website',
  },
};

export default function Post() {
  return <PostPage />;
}
