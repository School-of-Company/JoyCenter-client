'use client';
import React, { useRef, useState, useEffect } from 'react';
import FolderIcon from '@/shared/assets/svg/Folder';
import Arrow from '@/shared/assets/svg/Arrow';

export default function PostWritePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([]);

  const openFile = () => fileRef.current?.click();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    const files = e.target.files ? Array.from(e.target.files) : [];
    const newPreviews = files.map((f: File) => ({ name: f.name, url: URL.createObjectURL(f) }));
    setPreviews(newPreviews);
  };

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

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
                multiple
                ref={fileRef}
                style={{ display: 'none' }}
                onChange={onFile}
              />
            </div>
            {previews.length > 0 && (
              <div className="mt-2">
                {previews.map((p, i) => (
                  <img
                    key={i}
                    src={p.url}
                    alt={p.name}
                    className="w-full rounded-2xl object-cover mb-2 min-h-125 border border-gray-100"
                  />
                ))}
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
