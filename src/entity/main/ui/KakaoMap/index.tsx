'use client';

import { useCallback, useEffect, useRef } from 'react';

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

    loadKakaoMapsSDK()
      .then(() => {
        if (cancelled) return;
        window.kakao?.maps.load(() => {
          if (cancelled) return;
          initMap();
        });
      })
      .catch((e) => {
        console.error(e);
      });

    return () => {
      cancelled = true;
      mapInstance.current = null;
    };
  }, [initMap]);

  return (
    <div className="mobile:max-w-[300px] flex h-[300px] w-full max-w-[500px] items-center justify-center rounded-[20px]">
      <div ref={mapRef} className="h-full w-full rounded-[20px]" />
    </div>
  );
}
