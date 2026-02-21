import Image from 'next/image';

export interface MediaProps {
  type: 'IMAGE' | 'VIDEO';
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  controls?: boolean;
}

export default function Media({
  type,
  src,
  alt,
  className = '',
  sizes = '600px',
  controls = true,
}: MediaProps) {
  if (!src) return null;

  if (type === 'VIDEO') {
    return (
      <video
        src={src}
        controls={controls}
        playsInline
        className={`h-full w-full object-cover ${className}`}
      >
        브라우저가 비디오를 지원하지 않습니다.
      </video>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
