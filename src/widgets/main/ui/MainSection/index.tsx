import Image from 'next/image';

export default function MainSection() {
  return (
    <section className="w-full overflow-x-hidden">
      <Image
        src="/bgImg.png"
        alt="배경"
        width={1920}
        height={1080}
        className="block h-auto w-full max-w-full"
        sizes="100vw"
        priority
      />
    </section>
  );
}