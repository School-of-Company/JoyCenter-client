import { Suspense } from 'react';
import CallbackView from '@/views/Callback/ui/CallBackView';

export const dynamic = 'force-dynamic';

export default function CallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackView />
    </Suspense>
  );
}
