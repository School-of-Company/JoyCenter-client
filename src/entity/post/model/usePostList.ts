import { useQuery } from '@tanstack/react-query';
import { getPosts, GetPostsParams, PostListResponse } from '../api/post';

export const usePostList = (params: GetPostsParams = {}) => {
  return useQuery<PostListResponse>({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
  });
};
