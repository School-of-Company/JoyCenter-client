'use client';

import { useParams, useRouter } from 'next/navigation';
import PostCard from '@/shared/ui/PostCard';
import Arrow from '@/shared/assets/svg/Arrow';
import { usePostDetail } from '@/entity/postDetail/model/usePostDetail';
import { usePostList } from '@/entity/post/model/usePostList';
import AttachmentBlocks from '../AttachmentBlocks';

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const { data: postDetail, isLoading, isError } = usePostDetail(postId);
  const { data: recentPostsData } = usePostList({
    size: 5,
    sort: 'CREATED_AT_DESC',
  });

  const recentPosts =
    recentPostsData?.content.filter((p) => p.id !== postId).slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-h3">로딩 중...</p>
      </div>
    );
  }

  if (isError || !postDetail) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-h3">게시글을 찾을 수 없습니다</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleBackToList = () => {
    router.push('/post');
  };

  const textBlocks = postDetail.blocks.filter((block) => block.text);
  const allText = textBlocks.map((block) => block.text).join('\n\n');

  return (
    <div className="flex justify-center">
      <div className="my-20 flex w-300 justify-between">
        <div className="flex flex-col">
          <div className="mb-1 p-3">
            <div className="flex flex-row gap-4">
              <button
                className="flex cursor-pointer items-center"
                onClick={handleBackToList}
                aria-label="게시판으로 돌아가기"
              >
                <Arrow
                  direction="left"
                  color="#1a1a1b"
                  width={24}
                  height={24}
                />
              </button>
              <div>
                <p className="text-h1">{postDetail.title}</p>
              </div>
            </div>
            <div className="text-body5 mt-2 ml-8 flex items-center gap-3 text-gray-900">
              <p>{postDetail.member.email}</p>
              <div className="w-px self-stretch bg-gray-500" />
              <p>{formatDate(postDetail.createdAt)}</p>
            </div>
          </div>

          <hr className="my-2 w-240 border-gray-900" />

          <AttachmentBlocks blocks={postDetail.blocks} />

          <div className="flex justify-center px-5">
            <div className="text-body3 w-230 leading-[140%] text-gray-900">
              <p>{allText || '내용이 없습니다.'}</p>
            </div>
          </div>
        </div>
        <div className="px-3 py-10">
          <h2 className="text-h4 mb-4">최신글</h2>
          <div className="flex flex-col gap-6">
            {recentPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                member={post.member.email}
                imageUrl={post.thumbnail?.url}
                onClick={() => router.push(`/postDetail/${post.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
