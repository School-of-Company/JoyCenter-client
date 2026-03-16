'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type KakaoLatLng = Readonly<{
  getLat: () => number;
  getLng: () => number;
}>;

type KakaoMap = Readonly<{
  setCenter: (position: KakaoLatLng) => void;
}>;

type KakaoMarker = Readonly<{
  setMap: (map: KakaoMap | null) => void;
}>;

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (
          container: HTMLElement,
          options: { center: KakaoLatLng; level: number },
        ) => KakaoMap;
        Marker: new (options: { position: KakaoLatLng }) => KakaoMarker;
      };
    };
  }
}

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<KakaoMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadKakaoMapsSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.kakao?.maps) {
        resolve();
        return;
      }

      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src*="dapi.kakao.com/v2/maps/sdk.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(), {
          once: true,
        });
        existingScript.addEventListener(
          'error',
          () => reject(new Error('Kakao Maps SDK 로드 실패 (existing script)')),
          { once: true },
        );
        return;
      }

      const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_JS_KEY;
      if (!appKey) {
        reject(
          new Error(
            'NEXT_PUBLIC_KAKAO_MAP_JS_KEY 가 비어있음 (.env.local 확인 후 dev 서버 재시작 필요)',
          ),
        );
        return;
      }

      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
      script.async = true;

      script.addEventListener('load', () => resolve(), { once: true });
      script.addEventListener(
        'error',
        () => reject(new Error(`Kakao Maps SDK 로드 실패 (src=${script.src})`)),
        { once: true },
      );

      document.head.appendChild(script);
    });
  };

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    const center = new window.kakao.maps.LatLng(
      35.1403364595896,
      126.860721694235,
    );
    const map = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
    });

    mapInstance.current = map;

    const marker = new window.kakao.maps.Marker({ position: center });
    marker.setMap(map);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadMap = async () => {
      try {
        await loadKakaoMapsSDK();
        if (cancelled) return;

        window.kakao?.maps.load(() => {
          if (cancelled) return;
          initMap();
          setIsLoading(false);
        });
      } catch (e) {
        console.error('Kakao Maps 로드 실패:', e);
        if (!cancelled) {
          setHasError(true);
          setIsLoading(false);
          toast.error('지도를 불러오는데 실패했습니다.', {
            description: '쿠키 설정을 확인하거나 페이지를 새로고침해 주세요.',
          });
        }
      }
    };

    loadMap();

    return () => {
      cancelled = true;
      mapInstance.current = null;
    };
  }, [initMap]);

  return (
    <>
      <div className="mobile:max-w-[300px] relative h-[300px] w-full max-w-[500px] overflow-hidden rounded-[20px] bg-gray-100">
        <div ref={mapRef} className="h-full w-full" />

        {isLoading && !hasError && (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          >
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
            <p className="text-sm text-gray-600">지도 로딩 중...</p>
          </div>
        )}

        {hasError && (
          <div
            role="alert"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
          >
            <svg
              aria-hidden="true"
              className="h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="font-semibold text-gray-800">
                지도를 불러올 수 없습니다
              </p>
              <p className="mt-1 text-sm text-gray-600">
                광주광역시 서구 금부로 103번길 4-11
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
