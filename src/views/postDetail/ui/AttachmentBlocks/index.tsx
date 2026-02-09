import Image from 'next/image';
import type { BlockType } from '@/shared/types/block';

interface AttachmentBlocksProps {
  blocks: BlockType['blocks'];
}

export default function AttachmentBlocks({ blocks }: AttachmentBlocksProps) {
  const attachmentBlocks = blocks
    .filter((block) => block.attachment)
    .sort((a, b) => a.order - b.order);

  if (attachmentBlocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-6 px-5 py-8">
      {attachmentBlocks.map((block) => (
        <div
          key={block.blockId}
          className="relative flex h-84.5 w-150 items-center justify-center overflow-hidden rounded-2xl bg-[#D9D9D9]"
        >
          {block.attachment.attachmentsType === 'VIDEO' ? (
            <video
              src={block.attachment.attachmentUrl}
              controls
              className="h-full w-full rounded-2xl object-cover"
            >
              브라우저가 비디오를 지원하지 않습니다.
            </video>
          ) : (
            <Image
              src={block.attachment.attachmentUrl}
              alt={`첨부 이미지 ${block.blockId}`}
              fill
              sizes="600px"
              className="rounded-2xl object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
