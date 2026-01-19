import DoubleDown from '@/shared/assets/svg/doubleDown';
import Image from 'next/image';

export default function MainSection() {
  return (
    <section className="relative w-full overflow-x-hidden">
      <Image
        src="/bgImg.png"
        alt="배경"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />

      <div className="relative z-10 flex min-h-svh w-full items-center">
        <div className="relative w-full px-6 text-white md:ml-24 md:max-w-xl md:px-0">
          <div
            className="pointer-events-none absolute
              w-[720px] h-[360px]
              rounded-[520px]
              bg-[rgba(26,26,27,0.5)]
              blur-[35px]
              md:blur-[45px]
              md:-top-[80px] md:-left-[150px]"
          />
          <div className="relative flex flex-col justify-center items-center text-center">
            <p className="mb-3 text-h2 opacity-90">
              더 기쁘게, 더 따뜻하게
            </p>
            <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              더기쁨노인복지센터
            </h1>
            <div className='h-px bg-white w-4/5 mb-6' />
            <p className="text-sm leading-relaxed opacity-90 md:text-base">
              어르신의 일상에 기쁨과 안심을 더해 정성으로 함께하겠습니다.<br />
              TEL. 062-372-3525
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white md:bottom-8">
        <DoubleDown />
      </div>
    </section>
  );
}