import Picture from '@/shared/assets/svg/Picture';

interface PostPreviewProps {
  imageUrl?: string;
  member: string;
  title: string;
  date: string;
}

export default function PostPreview({
  imageUrl,
  member,
  title,
  date,
}: PostPreviewProps) {
  return (
    <div className="flex w-91 flex-col gap-3 pb-3">
      <div className="flex h-51 items-center justify-center overflow-hidden rounded-2xl bg-[#D9D9D9]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <Picture />
        )}
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col gap-1">
          <span className="text-body4 text-gray-500">{member}</span>
          <span className="text-h5 text-gray-900">{title}</span>
        </div>
        <span className="text-body5 text-gray-500">{date}</span>
      </div>
    </div>
  );
}
