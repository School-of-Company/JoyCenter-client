import Google from '@/shared/assets/svg/Google';
import Kakao from '@/shared/assets/svg/Kakao';
import Link from 'next/link';

export default function SigninButtons() {
  return (
    <>
      <Link
        href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email%20profile&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&prompt=consent`}
        className="text-body1 mt-4 mb-3 flex w-full items-center justify-around rounded-xl border border-gray-100 bg-white px-4 py-3"
      >
        <Google />
        구글로 로그인
        <div className="size-8" />
      </Link>
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=account_email&prompt=login`}
        className="text-body1 flex w-full items-center justify-around rounded-xl bg-[#FEE500] px-4 py-3"
      >
        <Kakao />
        카카오로 로그인
        <div className="size-8" />
      </Link>
    </>
  );
}
