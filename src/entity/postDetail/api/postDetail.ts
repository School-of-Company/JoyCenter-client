import { instance } from '@/shared/lib/axios';
import type { BlockType } from '@/shared/types/block';
export const getPostDetail = async (postId: number): Promise<BlockType> => {
  const response = await instance.get<BlockType>(`/post/${postId}`);
  return response.data;
};
