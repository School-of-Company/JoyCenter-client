import { instance } from '@/shared/lib/axios';

export type SortType = 'CREATED_AT_DESC' | 'CREATED_AT_ASC';

export interface PostThumbnail {
  attachmentsId: number;
  url: string;
}

export interface PostMember {
  memberId: number;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  member: PostMember;
  thumbnail: PostThumbnail | null;
}

export interface PostListResponse {
  content: Post[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface GetPostsParams {
  sort?: SortType;
  page?: number;
  size?: number;
}

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
