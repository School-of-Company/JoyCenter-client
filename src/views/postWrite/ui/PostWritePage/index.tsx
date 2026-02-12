'use client';

import FolderIcon from '@/shared/assets/svg/Folder';
import Arrow from '@/shared/assets/svg/Arrow';
import ArrowFilled from '@/shared/assets/svg/arrowFilled';
import Trash from '@/shared/assets/svg/trash';
import { usePostWrite } from '@/widgets/postWrite/model/usePostWrite';
import Media from '@/shared/ui/Media';
import { useRouter } from 'next/navigation';

export default function PostWritePage() {
  const router = useRouter();

  const {
    formRef,
    fileRef,
    previews,
    current,
    isSubmitting,
    isUploadingFiles,
    openFile,
    onFile,
    removeFile,
    goToPrevious,
    goToNext,
    submitPost,
  } = usePostWrite();

  const handleBack = () => router.back();

  const handleSubmit = async () => {
    const ok = await submitPost();
    if (ok) router.push('/main');
  };

  return (
    <div className="mt-9 flex justify-center">
      <form
        ref={formRef}
        className="w-225 p-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
      >
        <div
          className="text-body5 flex cursor-pointer items-center gap-2 text-gray-900"
          onClick={handleBack}
        >
          <Arrow direction="left" width={12} height={12} color="#000000" />
          <span>돌아가기</span>
        </div>

        <div className="mt-3">
          <input
            name="title"
            type="text"
            placeholder="제목을 입력하세요"
            className="text-h2 w-full p-3 pb-1 placeholder-gray-300 focus:outline-none"
          />
          <hr className="mt-2 border-gray-600" />
        </div>

        <div className="mt-3">
          <div className="text-body4 relative flex justify-end gap-6 p-2 text-gray-400">
            {previews.length > 0 && (
              <div className="mr-2 flex items-center">
                <button
                  className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
                  onClick={removeFile}
                >
                  <Trash />
                  <span>파일 제거</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2"
                onClick={openFile}
              >
                <FolderIcon />
                <span>파일 추가</span>
              </button>
              <input
                type="file"
                accept="image/*, video/*"
                multiple
                ref={fileRef}
                hidden
                onChange={onFile}
              />
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
                    onClick={goToPrevious}
                    aria-label="이전"
                    className="absolute top-1/2 -left-10 -translate-y-1/2 p-3"
                  >
                    <ArrowFilled direction="left" />
                  </button>
                  <button
                    onClick={goToNext}
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

        <textarea
          name="content" 
          placeholder="글을 작성하세요"
          className="text-body3 mt-2 min-h-125 w-full resize-none rounded-2xl border border-gray-100 p-5 placeholder-gray-400 focus:outline-none"
        />

        <div className="mt-3">
          <div className="flex justify-end gap-4 p-1 pr-2">
            <button
              type="button"
              onClick={handleBack}
              className="border-main-yellow-800 text-body3 rounded-lg border px-8 py-2 text-gray-900"
            >
              취소
            </button>

            <button
              type="submit"
              className="bg-main-yellow-100 border-main-yellow-400 text-body3 rounded-lg border px-8 py-2 text-gray-900"
              disabled={isSubmitting || isUploadingFiles}
            >
              {isSubmitting
                ? '게시 중...'
                : isUploadingFiles
                  ? '업로드 중...'
                  : '게시'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
