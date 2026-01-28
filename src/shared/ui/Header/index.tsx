'use client';

import Logo from '@/shared/assets/svg/Logo';
import { useScrollSection } from '@jump-section/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isMain = pathname === '/main';
  const { scrollTo } = useScrollSection();

  return (
    <header
      className={`flex w-full items-center justify-around py-[5px] ${
        isMain
          ? 'absolute top-0 left-0 z-50 bg-[rgba(255,255,255,0.50)]'
          : 'border-main-yellow-200 relative border-b bg-white'
      }`}
    >
      <Link href="/main" className="flex items-center">
        <Logo />
      </Link>
      <nav className="flex items-center gap-14">
        <div
          onClick={() => scrollTo('introduce')}
          className="text-body1 cursor-pointer"
        >
          기관 소개
        </div>
        <div
          onClick={() => scrollTo('information')}
          className="text-body1 cursor-pointer"
        >
          기관 정보
        </div>
        <Link href="/post" className="text-body1">
          게시판
        </Link>
        <Link href="/postWrite" className="text-body1">
          글쓰기
        </Link>
        <Link href="/signin" className="text-body1">
          로그인
        </Link>
      </nav>
    </header>
  );
}
