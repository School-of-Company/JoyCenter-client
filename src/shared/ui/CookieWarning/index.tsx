'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CookieWarningProps {
  onCookieBlocked?: () => void;
}

export default function CookieWarning({ onCookieBlocked }: CookieWarningProps) {
  const [hasShownWarning, setHasShownWarning] = useState(false);

  useEffect(() => {
    const checkThirdPartyCookies = async () => {
      try {
        const testCookie = 'test_cookie_support';
        document.cookie = `${testCookie}=1; SameSite=None; Secure`;
        const cookiesEnabled = document.cookie.includes(testCookie);

        document.cookie = `${testCookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None; Secure`;

        if (!cookiesEnabled && !hasShownWarning) {
          setHasShownWarning(true);
          toast.warning(
            '지도 기능을 사용하려면 브라우저에서 쿠키를 허용해야 합니다.',
            {
              duration: 5000,
              description: '브라우저 설정에서 쿠키를 허용해 주세요.',
            },
          );
          onCookieBlocked?.();
        }
      } catch (error) {
        console.warn('Cookie detection failed:', error);
      }
    };

    checkThirdPartyCookies();
  }, [hasShownWarning, onCookieBlocked]);

  return null;
}
