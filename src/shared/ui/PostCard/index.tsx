'use client';

import Picture from '@/shared/assets/svg/Picture';

interface PostCardProps {
  title: string;
  member: string;
  imageUrl?: string;
  onClick?: () => void;
}

export default function PostCard({
  title,
  member,
  imageUrl,
  onClick,
}: PostCardProps) {
  return (
    <div
      className="cursor-pointer border-b border-b-gray-200 px-3"
      onClick={onClick}
    >
      <div className="flex h-22.5 w-40 items-center justify-center rounded-lg bg-[#D9D9D9]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-10.5 w-16 rounded-lg object-cover"
          />
        ) : (
          <Picture width="64px" height="42px" />
        )}
      </div>
      <div className="mt-2 mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold">{title}</p>
        <p className="text-[8px] text-gray-900">{member}</p>
      </div>
    </div>
  );
}
