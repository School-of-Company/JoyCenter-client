'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSignin } from '@/entity/signin/model/useSignin';

export default function CallbackView() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get('code');

  const { mutate } = useSignin();

  useEffect(() => {
    if (!code) {
      toast.error('로그인에 실패했어요. 다시 시도해 주세요.');
      router.replace('/signin');
      return;
    }

    mutate(code);
  }, [code, mutate, router]);

  return <div />;
}
