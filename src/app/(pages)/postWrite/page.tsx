import { Metadata } from 'next';
import PostWritePage from '@/views/postWrite/ui/PostWritePage';

export const metadata: Metadata = {
  title: '글 쓰기',
  description: '글 쓰기 페이지입니다.',
};

export default function Page() {
  return <PostWritePage />;
}
