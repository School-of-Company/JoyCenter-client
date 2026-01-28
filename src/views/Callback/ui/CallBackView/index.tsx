'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSignin } from '@/entity/signin/model/useSignin';

export default function CallbackView() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get('code');
  const provider = params.get('provider');

  const { mutate } = useSignin();

  useEffect(() => {
    if (!code || !provider) {
      toast.error('로그인에 실패했어요. 다시 시도해 주세요.');
      router.replace('/signin');
      return;
    }

    mutate({ code, provider });
  }, [code, mutate, router, provider]);

  return <div />;
}
