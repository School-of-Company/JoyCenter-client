import Image from 'next/image';

export default function MainSection() {
  return (
    <section className="w-screen">
      <Image
        src="/bgImg.png"
        alt="배경"
        width={1920}
        height={1080}
        className="h-auto w-full"
        priority
      />
    </section>
  );
}
