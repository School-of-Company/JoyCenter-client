import { Metadata } from 'next';
import PostWritePage from '@/views/postWrite/ui/PostWritePage';

export const metadata: Metadata = {
  title: '글 쓰기',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PostWritePage />;
}
