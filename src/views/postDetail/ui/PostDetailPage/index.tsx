'use client';

import Picture from '@/shared/assets/svg/Picture';
import PostCard from '@/shared/ui/PostCard';

const recentPosts = [
  { id: 1, title: '사진제목', author: '작성자', date: '2025-01-01' },
  { id: 2, title: '사진제목', author: '작성자', date: '2025-01-01' },
  { id: 3, title: '사진제목', author: '작성자', date: '2025-01-01' },
  { id: 4, title: '사진제목', author: '작성자', date: '2025-01-01' },
];

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
      <div className="px-3 py-10">
        <h2 className="text-h2 mb-4">최신글</h2>
        <div className="flex flex-col gap-6">
          {recentPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              member={post.author}
              onClick={() => console.log('Clicked post:', post.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
