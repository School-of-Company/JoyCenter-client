'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signin } from '../api/signin';

export interface OAuthResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export const useSignin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (code: string) => signin(code),
    onSuccess: (data: OAuthResponse) => {
      const accessToken = data?.accessToken ?? data?.accessToken;
      const refreshToken = data?.refreshToken ?? data?.refreshToken;

      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

      router.replace('/home');
    },
    onError: (err: Error) => {
      const message =
        err?.message ?? '로그인에 실패했어요. 다시 시도해 주세요.';

      toast.error(message);
      router.replace('/signin');
    },
  });
};
