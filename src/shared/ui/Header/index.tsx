'use client'

import Logo from '@/shared/assets/svg/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isMain = pathname === '/main';

  return (
    <header
      className={`flex w-full items-center justify-around py-[5px] ${
        isMain
          ? 'absolute top-0 left-0 z-50 bg-[rgba(255,255,255,0.50)]'
          : 'relative bg-white border-b border-main-yellow-200'
      }`}
    >
      <Link href="/main" className="flex items-center">
        <Logo />
      </Link>
      <nav className="flex items-center gap-14">
        <Link href="" className='text-body1'>
          기관 소개
        </Link>
        <Link href="/post" className='text-body1' >
          게시판
        </Link>
        <Link href="/post-write" className='text-body1'>
          글쓰기
        </Link>
        <Link href="" className='text-body1'>
          로그인
        </Link>
      </nav>
    </header>
  );
}
