import { useQuery } from '@tanstack/react-query';
import type { PostDetail } from './types';
import { getPostDetail } from '../api/postDetail';

export const usePostDetail = (postId: number) => {
  return useQuery<PostDetail>({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });
};
