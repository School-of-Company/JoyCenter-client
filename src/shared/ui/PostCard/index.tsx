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
      className="cursor-pointer rounded-xl bg-gray-100 p-3"
      onClick={onClick}
    >
      <div className="flex items-center justify-center rounded-lg bg-[#D9D9D9] p-3">
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
      <div className="mt-2 flex items-center justify-between px-3 py-2">
        <p className="text-body2 font-semibold">{title}</p>
        <p className="text-body5 text-gray-900">{member}</p>
      </div>
    </div>
  );
}
