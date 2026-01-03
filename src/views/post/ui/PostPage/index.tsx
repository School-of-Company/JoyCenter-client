import SortDropDown from '@/shared/ui/SortDropDown';
import PostPreview from '@/shared/ui/PostPreview';
import Arrow from '@/shared/assets/svg/Arrow';
import Header from '@/widgets/header/ui';

const postData = [
  { id: 1, author: '작성자', title: '사진제목', date: '2025-01-01' },
  { id: 2, author: '홍길동', title: '게시글 제목 예시', date: '2025-01-02' },
  { id: 3, author: '김철수', title: '새로운 게시글', date: '2025-01-03' },
  { id: 4, author: '이영희', title: '공지사항', date: '2025-01-04' },
  { id: 5, author: '박민수', title: '이벤트 안내', date: '2025-01-05' },
  { id: 6, author: '최지영', title: '자유 게시글', date: '2025-01-06' },
];

export default function Post() {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex w-[1144px] flex-col gap-7">
          <div className="mt-20 flex items-end justify-between self-stretch">
            <h1 className="text-h1 text-gray-900">게시판</h1>
            <SortDropDown />
          </div>
          <div className="grid grid-cols-3 gap-x-6 gap-y-12">
            {postData.map((post) => (
              <PostPreview
                key={post.id}
                member={post.author}
                title={post.title}
                date={post.date}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-5">
            <Arrow direction="left" color="black" />
            <p className="text-body1">1</p>
            <Arrow direction="right" color="black" />
          </div>
        </div>
      </div>
    </>
  );
}
