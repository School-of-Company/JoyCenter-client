import { useQuery } from '@tanstack/react-query';
import type { BlockType } from '@/shared/types/block';
import { getPostDetail } from '../api/postDetail';

export const usePostDetail = (postId: number) => {
  return useQuery<BlockType>({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });
};
