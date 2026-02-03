import type { SortType } from '@/shared/types/post';

export type { SortType };

export interface PostThumbnail {
  attachmentsId: number;
  url: string;
}

export interface PostMember {
  memberId: number;
  email: string;
}

export interface PageInfo {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PageResponse<T> {
  content: T[];
  page: PageInfo;
}

export interface Post {
  id: number;
  title: string;
  createdAt: string;
  member: PostMember;
  thumbnail: PostThumbnail | null;
}

export type PostListResponse = PageResponse<Post>;

export interface GetPostsParams {
  sort?: SortType;
  page?: number;
  size?: number;
}
