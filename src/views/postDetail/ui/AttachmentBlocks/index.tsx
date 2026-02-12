import type { BlockType } from '@/shared/types/block';
import Media from '@/shared/ui/Media';

interface AttachmentBlocksProps {
  blocks: BlockType['blocks'];
}

export default function AttachmentBlocks({ blocks }: AttachmentBlocksProps) {
  const attachmentBlocks = blocks.filter((block) => block.attachment);

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
          <Media
            type={block.attachment!.attachmentsType}
            src={block.attachment!.attachmentUrl}
            alt={`첨부 이미지 ${block.blockId}`}
            sizes="600px"
            className="rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
}
