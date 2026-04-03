import type { Metadata } from 'next';
import SigninView from '@/views/signin/ui/SigninView';

export const metadata: Metadata = {
  title: '로그인',
  robots: { index: false, follow: false },
};

export default function SigninPage() {
  return <SigninView />;
}
