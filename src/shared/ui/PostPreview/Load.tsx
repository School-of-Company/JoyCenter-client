export default function PostPreviewSkeleton() {
  return (
    <div className="flex w-91 animate-pulse flex-col gap-3 pb-3">
      <div className="h-51 rounded-2xl bg-gray-200" />
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col gap-1">
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-5 w-32 rounded bg-gray-200" />
        </div>
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
}
