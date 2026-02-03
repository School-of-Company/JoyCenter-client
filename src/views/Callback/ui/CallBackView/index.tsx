'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signin } from '@/entity/signin/api/signin';
import {
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_TOKEN_KEY,
  setCookie,
} from '@/shared/lib/cookie';

interface CallbackViewProps {
  provider: string;
}

export default function CallbackView({ provider }: CallbackViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code || !provider) {
      toast.error('로그인에 실패했어요. 다시 시도해 주세요.');
      router.replace('/signin');
      return;
    }

    (async () => {
      try {
        const res = await signin(code, provider);

        console.log(res.data);
        setCookie(AUTH_TOKEN_KEY, res.data.accessToken);
        setCookie(AUTH_REFRESH_TOKEN_KEY, res.data.refreshToken);

        toast.success('로그인에 성공했어요.');
        router.replace('/main');
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : '로그인에 실패했어요. 다시 시도해 주세요.';
        toast.error(message);
        router.replace('/signin');
      }
    })();
  }, [code, provider, router]);
  return <></>;
}
