'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SortDropDown from '@/shared/ui/SortDropDown';
import PostPreview from '@/shared/ui/PostPreview';
import Arrow from '@/shared/assets/svg/Arrow';
import { usePostList } from '@/entity/post/model/usePostList';
import { SortType } from '@/entity/post/api/post';

export default function PostPageView() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortType, setSortType] = useState<SortType>('CREATED_AT_DESC');

  const { data, isLoading, error } = usePostList({
    sort: sortType,
    page: currentPage,
    size: 9,
  });

  const handlePrevPage = () => {
    if (data?.page.hasPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (data?.page.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePostClick = (postId: number) => {
    router.push(`/postDetail/${postId}`);
  };

  const posts = data?.content || [];
  const pageInfo = data?.page;
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="flex w-286 flex-col gap-7">
          <div className="mt-20 flex items-end justify-between self-stretch">
            <h1 className="text-h1 text-gray-900">게시판</h1>
            <SortDropDown onSortChange={setSortType} />
          </div>
          <div className="flex h-96 items-center justify-center">
            <p className="text-body1 text-gray-500">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <div className="flex w-286 flex-col gap-7">
          <div className="mt-20 flex items-end justify-between self-stretch">
            <h1 className="text-h1 text-gray-900">게시판</h1>
            <SortDropDown onSortChange={setSortType} />
          </div>
          <div className="flex h-96 items-center justify-center">
            <p className="text-body1 text-red-500">
              게시글을 불러오는데 실패했습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex w-286 flex-col gap-7">
        <div className="mt-20 flex items-end justify-between self-stretch">
          <h1 className="text-h1 text-gray-900">게시판</h1>
          <SortDropDown onSortChange={setSortType} />
        </div>
        {posts.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-body1 text-gray-500">게시글이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-x-6 gap-y-12">
              {posts.map((post) => (
                <PostPreview
                  key={post.id}
                  member={post.member.email}
                  title={post.title}
                  date={new Date().toISOString().split('T')[0]}
                  onClick={() => handlePostClick(post.id)}
                />
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                onClick={handlePrevPage}
                disabled={!pageInfo?.hasPrevious}
                className={!pageInfo?.hasPrevious ? 'opacity-30' : ''}
              >
                <Arrow direction="left" color="black" />
              </button>
              <p className="text-body1">{pageInfo ? pageInfo.number + 1 : 1}</p>
              <button
                onClick={handleNextPage}
                disabled={!pageInfo?.hasNext}
                className={!pageInfo?.hasNext ? 'opacity-30' : ''}
              >
                <Arrow direction="right" color="black" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
