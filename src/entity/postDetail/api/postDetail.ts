import { instance } from '@/shared/lib/axios';
import type { PostDetail } from '../model/types';
export const getPostDetail = async (postId: number): Promise<PostDetail> => {
  const response = await instance.get<PostDetail>(`/post/${postId}`);
  return response.data;
};
