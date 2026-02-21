import Arrow from '@/shared/assets/svg/Arrow';

interface PostWriteHeaderProps {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
}

export const PostWriteHeader = ({ title, onTitleChange, onBack }: PostWriteHeaderProps) => (
  <>
    <div
      className="text-body5 flex cursor-pointer items-center gap-2 text-gray-900"
      onClick={onBack}
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
        value={title}
        onChange={onTitleChange}
      />
      <hr className="mt-2 border-gray-600" />
    </div>
  </>
);
