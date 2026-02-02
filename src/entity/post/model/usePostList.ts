import { useQuery } from '@tanstack/react-query';
import type { GetPostsParams, PostListResponse } from './types';
import { getPosts } from '../api/post';

export const usePostList = (params: GetPostsParams = {}) => {
  return useQuery<PostListResponse>({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
  });
};
