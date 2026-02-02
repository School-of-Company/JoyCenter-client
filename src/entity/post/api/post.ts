import { instance } from '@/shared/lib/axios';
import type {
  GetPostsParams,
  PostListResponse,
  SortType,
} from '../model/types';

export type { SortType };

export const getPosts = async (
  params: GetPostsParams = {},
): Promise<PostListResponse> => {
  const { sort = 'CREATED_AT_DESC', page = 0, size = 20 } = params;

  const { data } = await instance.get<PostListResponse>('/post/all', {
    params: {
      sort,
      page,
      size,
    },
  });

  return data;
};
