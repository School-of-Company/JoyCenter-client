import Logo from '@/shared/assets/svg/Logo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-main-yellow-200 flex w-full items-center justify-between border-b bg-white px-[356px] py-[5px]">
      <Link href="" className="flex items-center">
        <Logo />
      </Link>
      <nav className="flex items-center gap-[60px]">
        <Link href="" className="text-body1 text-main-yellow-950">
          기관 소개
        </Link>
        <Link href="/post" className="text-body1 text-main-yellow-950">
          게시판
        </Link>
        <Link href="/post-write" className="text-body1 text-main-yellow-950">
          글쓰기
        </Link>
        <Link href="" className="text-body1 text-main-yellow-950">
          로그인
        </Link>
      </nav>
    </header>
  );
}
