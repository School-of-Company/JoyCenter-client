import { Metadata } from 'next';
import HomebasePage from '@/views/postWrite/ui/Post-writePage';

export const metadata: Metadata = {
  title: '글 쓰기',
  description: '글 쓰기 페이지입니다.',
};

export default function Page() {
  return <HomebasePage />;
}
