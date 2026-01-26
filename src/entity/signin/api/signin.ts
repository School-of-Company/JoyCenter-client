import { instance } from '@/shared/lib/axios';

export const signin = async (code: string) => {
  const res = await instance.post('/auth', { code });
  if (res.data) return res.data;
};
