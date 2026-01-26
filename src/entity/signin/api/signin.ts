import { instance } from '@/shared/lib/axios';

export interface OAuthResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export const signin = async (code: string) => {
  const res = await instance.post<OAuthResponse>('/auth', { code });
  return res;
};
