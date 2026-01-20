import Google from '@/shared/assets/svg/Google';
import Kakao from '@/shared/assets/svg/Kakao';
import Logo from '@/shared/assets/svg/Logo';

export default function SigninView() {
  return (
    <section className="flex h-[90vh] items-center justify-center">
      <div className="bg-main-yellow-50 flex h-2/5 w-1/3 flex-col items-center justify-center rounded-[20px] p-7">
        <Logo width={240} height={103} />
        <button className="text-body1 mt-4 mb-3 flex w-full items-center justify-around rounded-xl border border-gray-100 bg-white px-4 py-3">
          <Google />
          구글로 로그인
          <div className="size-8" />
        </button>
        <button className="text-body1 flex w-full items-center justify-around rounded-xl bg-[#FEE500] px-4 py-3">
          <Kakao />
          카카오로 로그인
          <div className="size-8" />
        </button>
      </div>
    </section>
  );
}
