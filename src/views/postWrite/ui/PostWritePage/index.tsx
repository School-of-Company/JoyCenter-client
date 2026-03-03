'use client';

import { useRouter } from 'next/navigation';
import { usePostWrite } from '@/entity/postWrite/model/usePostWrite';
import { PostWriteHeader } from '@/widgets/postWrite/ui/Header';
import { PostWriteMedia } from '@/widgets/postWrite/ui/Media';
import { PostWriteActions } from '@/widgets/postWrite/ui/Actions';

export default function PostWritePage() {
  const router = useRouter();

  const {
    fileRef,
    previews,
    current,
    isSubmitting,
    isUploadingFiles,
    title,
    content,
    onTitleChange,
    onContentChange,
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
        className="w-225 p-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <PostWriteHeader
          title={title}
          onTitleChange={onTitleChange}
          onBack={handleBack}
        />

        <PostWriteMedia
          previews={previews}
          current={current}
          fileRef={fileRef}
          onFile={onFile}
          removeFile={removeFile}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
        />

        <textarea
          name="content"
          placeholder="글을 작성하세요"
          className="text-body3 mt-2 min-h-125 w-full resize-none rounded-2xl border border-gray-100 p-5 placeholder-gray-400 focus:outline-none"
          value={content}
          onChange={onContentChange}
        />

        <PostWriteActions
          isSubmitting={isSubmitting}
          isUploadingFiles={isUploadingFiles}
          onCancel={handleBack}
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
}
