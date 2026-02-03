import { instance } from '@/shared/lib/axios';

export const signin = async (code: string, provider: string) => {
  const res = await instance.post('/auth', {
    code,
    provider,
  });
  return res;
};
