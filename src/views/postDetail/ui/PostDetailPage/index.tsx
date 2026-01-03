import Picture from '@/shared/assets/svg/Picture';

export default function PostDetail() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="mt-7 mb-3 p-3">
          <p className="text-h1">사진제목</p>
          <div className="text-body5 mt-2 flex items-center gap-3 text-gray-900">
            <p>작성자</p>
            <div className="w-px self-stretch bg-gray-500" />
            <p>2025-01-01</p>
          </div>
        </div>
        <hr className="my-2 w-240 border-gray-900" />
        <div className="flex justify-center px-5 py-8">
          <div className="flex h-84.5 w-150 items-center justify-center rounded-2xl bg-[#D9D9D9]">
            <Picture width="245px" height="157px" />
          </div>
        </div>
        <div className="flex justify-center px-5">
          <div className="text-body5 w-230 leading-[140%] text-gray-900">
            <p>
              어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
              어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
              어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
              어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
              어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
              어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
              어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
              어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
