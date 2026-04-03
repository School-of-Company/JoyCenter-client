import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.joycenter.kr';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Post {
  id: number;
  createdAt: string;
}

interface PageInfo {
  totalPages: number;
  hasNext: boolean;
}

interface PostListResponse {
  content: Post[];
  page: PageInfo;
}

async function fetchAllPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  let page = 0;

  try {
    while (true) {
      const res = await fetch(
        `${API_URL}/post/all?sort=CREATED_AT_DESC&page=${page}&size=100`,
        { next: { revalidate: 3600 } },
      );

      if (!res.ok) break;

      const data: PostListResponse = await res.json();
      posts.push(...data.content);

      if (!data.page.hasNext) break;
      page++;
    }
  } catch {
    // API 호출 실패 시 빈 배열 반환
  }

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/postDetail/${post.id}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/post`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...postEntries,
  ];
}
