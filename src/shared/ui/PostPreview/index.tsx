import Picture from '@/shared/assets/svg/Picture';
import Image from 'next/image';

interface PostPreviewProps {
  imageUrl?: string;
  member: string;
  title: string;
  date: string;
  onClick?: () => void;
}

export default function PostPreview({
  imageUrl,
  member,
  title,
  date,
  onClick,
}: PostPreviewProps) {
  return (
    <div
      className="flex w-91 cursor-pointer flex-col gap-3 pb-3"
      onClick={onClick}
    >
      <div className="flex h-51 items-center justify-center overflow-hidden rounded-2xl bg-[#D9D9D9]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={364}
            height={204}
            className="h-full w-full object-cover"
          />
        ) : (
          <Picture />
        )}
      </div>

      <div className="flex flex-col gap-2 px-1">
        <span className="text-body4 text-gray-500">{member}</span>
        <div className="flex items-center justify-between gap-2">
          <span className="text-h5 text-gray-900">{title}</span>
          <span className="text-body5 text-gray-500">{date}</span>
        </div>
      </div>
    </div>
  );
}
