import { instance } from '@/shared/lib/axios';
import type { CreatePostParams } from '../model/types';

export const createPost = async (params: CreatePostParams): Promise<void> => {
  await instance.post('/post', params);
};
