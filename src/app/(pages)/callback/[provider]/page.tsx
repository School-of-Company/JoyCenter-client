import { Suspense } from 'react';
import CallbackView from '@/views/Callback/ui/CallBackView';

export const dynamic = 'force-dynamic';

interface CallbackPageParams {
  provider: string;
}

export default async function CallbackPage({
  params,
}: {
  params: Promise<CallbackPageParams>;
}) {
  const { provider } = await params;

  return (
    <Suspense fallback={null}>
      <CallbackView provider={provider} />
    </Suspense>
  );
}
