interface PostWriteActionsProps {
  isSubmitting: boolean;
  isUploadingFiles: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export const PostWriteActions = ({
  isSubmitting,
  isUploadingFiles,
  onCancel,
  onSubmit,
}: PostWriteActionsProps) => (
  <div className="mt-3">
    <div className="flex justify-end gap-4 p-1 pr-2">
      <button
        type="button"
        onClick={onCancel}
        className="border-main-yellow-800 text-body3 rounded-lg border px-8 py-2 text-gray-900"
      >
        취소
      </button>

      <button
        type="button"
        onClick={onSubmit}
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
);
