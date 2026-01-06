'use client';

import { useParams, useRouter } from 'next/navigation';
import Picture from '@/shared/assets/svg/Picture';
import PostCard from '@/shared/ui/PostCard';
import Header from '@/widgets/header/ui';

const recentPosts = [
  { id: 1, member: '작성자', title: '사진제목', date: '2025-01-01' },
  { id: 2, member: '홍길동', title: '게시글 제목 예시', date: '2025-01-02' },
  { id: 3, member: '김철수', title: '새로운 게시글', date: '2025-01-03' },
  { id: 4, member: '이영희', title: '공지사항', date: '2025-01-04' },
  { id: 5, member: '박민수', title: '이벤트 안내', date: '2025-01-05' },
  { id: 6, member: '최지영', title: '자유 게시글', date: '2025-01-06' },
];

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const foundPost = recentPosts.find((post) => post.id === postId);
  const post = foundPost ?? {
    id: postId,
    title: '게시글을 찾을 수 없습니다',
    member: '누구세용',
    date: '날짜 없음',
  };

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="mt-20 flex w-300 justify-between">
          <div className="flex flex-col">
            <div className="mb-3 p-3">
              <p className="text-h1">{post.title}</p>
              <div className="text-body5 mt-2 flex items-center gap-3 text-gray-900">
                <p>{post.member}</p>
                <div className="w-px self-stretch bg-gray-500" />
                <p>{post.date}</p>
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
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                  어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
                </p>
              </div>
            </div>
          </div>
          <div className="px-3 py-10">
            <h2 className="text-h4 mb-4">최신글</h2>
            <div className="flex flex-col gap-6">
              {recentPosts
                .filter((p) => p.id !== Number(postId))
                .slice(0, 4)
                .map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    member={post.member}
                    onClick={() => router.push(`/post-detail/${post.id}`)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
