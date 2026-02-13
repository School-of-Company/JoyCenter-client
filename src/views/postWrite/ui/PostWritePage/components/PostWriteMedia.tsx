import FolderIcon from '@/shared/assets/svg/Folder';
import ArrowFilled from '@/shared/assets/svg/arrowFilled';
import Trash from '@/shared/assets/svg/trash';
import Media from '@/shared/ui/Media';
import { Preview } from '@/widgets/postWrite/model/types';

interface PostWriteMediaProps {
  previews: Preview[];
  current: number;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
}

export const PostWriteMedia = ({
  previews,
  current,
  fileRef,
  onFile,
  removeFile,
  goToPrevious,
  goToNext,
}: PostWriteMediaProps) => (
  <div className="mt-3">
    <div className="text-body4 relative flex justify-end gap-6 p-2 text-gray-400">
      {previews.length > 0 && (
        <div className="mr-2 flex items-center">
          <button
            className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.preventDefault();
              removeFile();
            }}
          >
            <Trash />
            <span>파일 제거</span>
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <FolderIcon />
          <span>파일 추가</span>
          <input
            type="file"
            accept="image/*, video/*"
            multiple
            ref={fileRef}
            hidden
            onChange={onFile}
          />
        </label>
      </div>
    </div>

    {previews.length > 0 && (
      <div className="relative mt-2">
        <div className="overflow-hidden rounded-2xl border border-gray-100">
          <div className="relative -mx-3 h-125 w-[calc(100%+24px)]">
            <Media
              key={current}
              type={previews[current].attachmentsType}
              src={previews[current].url}
              alt={previews[current].name}
              className="h-full w-full object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {previews.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                goToPrevious();
              }}
              aria-label="이전"
              className="absolute top-1/2 -left-10 -translate-y-1/2 p-3"
            >
              <ArrowFilled direction="left" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                goToNext();
              }}
              aria-label="다음"
              className="absolute top-1/2 -right-10 -translate-y-1/2 p-3"
            >
              <ArrowFilled direction="right" />
            </button>
          </>
        )}
      </div>
    )}
  </div>
);
