'use client';
import React, { useRef, useState, useEffect } from 'react';
import FolderIcon from '@/shared/assets/svg/Folder';
import Arrow from '@/shared/assets/svg/Arrow';
import ArrowFilled from '@/shared/assets/svg/arrowFilled';

export default function PostWritePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([]);
  const [current, setCurrent] = useState<number>(0);

  const openFile = () => fileRef.current?.click();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    const newPreviews = files.map((f: File) => ({ name: f.name, url: URL.createObjectURL(f) }));
    const prevLen = previews.length;
    setPreviews((prev) => [...prev, ...newPreviews]);
    setCurrent(prevLen);

    if (fileRef.current) fileRef.current.value = '';
  };

  const prev = () => {
    setCurrent((c) => (previews.length ? (c - 1 + previews.length) % previews.length : 0));
  };

  const next = () => {
    setCurrent((c) => (previews.length ? (c + 1) % previews.length : 0));
  };

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    if (delta > 50) next();
    else if (delta < -50) prev();
    touchStartX.current = null;
  };

  const previewsRef = useRef(previews);
  useEffect(() => {
    previewsRef.current = previews;
  }, [previews]);

  useEffect(() => {
    return () => {
      previewsRef.current.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  return (
    <>
      <div className="mt-9 flex justify-center">
        <div className="w-225 p-3">
          <div className="text-body5 flex items-center gap-2 text-gray-900">
            <Arrow direction="left" width={12} height={12} color="#000000" />
            <span>돌아가기</span>
          </div>
          <div className="mt-3">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="text-h2 w-full p-3 pb-1 placeholder-gray-300 focus:outline-none"
            />
            <hr className="mt-2 border-gray-600" />
          </div>
          <div className="mt-3">
            <div className="p-2 text-body4 flex justify-end gap-6 text-gray-400">
              <button
                type="button"
                className="flex items-center gap-2"
                onClick={openFile}
              >
                <FolderIcon />
                <span>파일 추가</span>
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileRef}
                style={{ display: 'none' }}
                onChange={onFile}
              />
            </div>
            {previews.length > 0 && (
              <div className="mt-2 relative">
                <div className="overflow-hidden rounded-2xl border border-gray-100">
                  <img
                    key={current}
                    src={previews[current].url}
                    alt={previews[current].name}
                    className="block w-[calc(100%+24px)] -mx-3 object-cover mb-2 min-h-125 h-auto"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  />
                </div>

                {previews.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="이전 이미지"
                      className="absolute -left-10 top-1/2 -translate-y-1/2 p-3 rotate-180"
                    >
                      <ArrowFilled />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="다음 이미지"
                      className="absolute -right-10 top-1/2 -translate-y-1/2 p-3"
                    >
                      <ArrowFilled />
                    </button>

                  </>
                )}

              </div>
            )}
          </div>
          <textarea
            placeholder="글을 작성하세요"
            className="text-body3 mt-2 min-h-125 w-full resize-none rounded-2xl border border-gray-100 p-5 placeholder-gray-400 focus:outline-none"
          />
          <div className="mt-3">
            <div className="flex justify-end gap-4 p-1 pr-2">
              <button className="border-main-yellow-800 text-body3 rounded-lg border px-8 py-2 text-gray-900">
                취소
              </button>
              <button className="bg-main-yellow-100 border-main-yellow-400 text-body3 rounded-lg border px-8 py-2 text-gray-900">
                게시
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
