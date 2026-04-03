import type { Metadata } from 'next';
import { getPostDetail } from '@/entity/postDetail/api/postDetail';
import PostDetail from '@/views/postDetail/ui/PostDetailPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const post = await getPostDetail(Number(id));

    const description =
      post.blocks.find((b) => b.type === 'TEXT')?.text?.slice(0, 160) ??
      '더기쁨노인복지센터 게시글';

    const image = post.blocks.find(
      (b) => b.attachment?.attachmentsType === 'IMAGE',
    )?.attachment?.attachmentUrl;

    return {
      title: post.title,
      description,
      alternates: { canonical: `/postDetail/${id}` },
      openGraph: {
        title: post.title,
        description,
        url: `/postDetail/${id}`,
        type: 'article',
        ...(image && { images: [{ url: image }] }),
      },
    };
  } catch {
    return { title: '게시글' };
  }
}

export default function PostDetailPage() {
  return <PostDetail />;
}
