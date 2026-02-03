'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FolderIcon from '@/shared/assets/svg/Folder';
import Arrow from '@/shared/assets/svg/Arrow';
import ArrowFilled from '@/shared/assets/svg/arrowFilled';
import { instance } from '@/shared/lib/axios';
import { AUTH_TOKEN_KEY, getCookie } from '@/shared/lib/cookie';
import Trash from '@/shared/assets/svg/trash';

export default function PostWritePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<
    {
      name: string;
      url: string;
      kind: 'IMAGE' | 'VIDEO';
      attachmentsId?: number;
      uploading?: boolean;
    }[]
  >([]);
  const [current, setCurrent] = useState<number>(0);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openFile = () => fileRef.current?.click();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    const newPreviews = files.map((f: File) => {
      const kind: 'IMAGE' | 'VIDEO' = f.type.startsWith('video/')
        ? 'VIDEO'
        : 'IMAGE';

      return {
        name: f.name,
        url: URL.createObjectURL(f),
        kind,
        uploading: true,
      };
    });

    const prevLen = previews.length;
    setPreviews((prev) => [...prev, ...newPreviews]);
    setCurrent(prevLen);

    if (fileRef.current) fileRef.current.value = '';

    files.forEach(async (file, idx) => {
      const order = prevLen + idx + 1;

      const attachmentsType: 'IMAGE' | 'VIDEO' = file.type.startsWith('video/')
        ? 'VIDEO'
        : 'IMAGE';

      try {
        const fd = new FormData();
        fd.append('file', file);

        const res = await instance.post('/attachments', fd, {
          params: { attachmentsType, imageOrder: order },
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });

        const data = res.data;

        setPreviews((prev) => {
          const newArr = [...prev];
          const targetIdx = prevLen + idx;
          if (!newArr[targetIdx]) return prev;

          const oldUrl = newArr[targetIdx].url;
          if (oldUrl.startsWith('blob:')) {
            try {
              URL.revokeObjectURL(oldUrl);
            } catch {}
          }

          newArr[targetIdx] = {
            ...newArr[targetIdx],
            url: data.url,
            attachmentsId: data.attachmentsId,
            uploading: false,
          };
          return newArr;
        });
      } catch (err) {
        const e = err as any;
        console.error('업로드 실패', {
          status: e?.response?.status,
          data: e?.response?.data,
          token: getCookie(AUTH_TOKEN_KEY),
          err: e,
        });

        setPreviews((prev) => {
          const newArr = [...prev];
          const targetIdx = prevLen + idx;
          if (!newArr[targetIdx]) return prev;
          newArr[targetIdx] = { ...newArr[targetIdx], uploading: false };
          return newArr;
        });
      }
    });
  };

  const prev = () => {
    setCurrent((c) =>
      previews.length ? (c - 1 + previews.length) % previews.length : 0,
    );
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
      previewsRef.current.forEach((p) => {
        if (p.url.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(p.url);
          } catch {}
        }
      });
    };
  }, []);

  const hasUploading = previews.some((p) => p.uploading);

  const submitPost = async () => {
    if (!title.trim()) {
      alert('제목을 입력하세요');
      return;
    }

    if (hasUploading) {
      alert('파일 업로드가 완료될 때까지 기다려주세요');
      return;
    }

    setIsSubmitting(true);
    try {
      const blocks: {
        order: number;
        blockType: 'TEXT' | 'ATTACHMENT';
        text?: string;
        attachmentId?: number;
      }[] = [];

      let order = 0;

      if (content.trim()) {
        blocks.push({
          order: order++,
          blockType: 'TEXT',
          text: content,
        });
      }

      const attachments = previews.filter((p) => p.attachmentsId);
      attachments.forEach((p) => {
        blocks.push({
          order: order++,
          blockType: 'ATTACHMENT',
          attachmentId: p.attachmentsId!,
        });
      });

      const res = await instance.post('/post', { title, blocks });
      if (res.status === 201) {
        router.push('/main');
      } else {
        alert('게시 실패');
      }
    } catch (err) {
      console.error('게시 실패', err);
      alert('게시 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <hr className="mt-2 border-gray-600" />
          </div>
          <div className="mt-3">
            <div className="text-body4 relative flex justify-end gap-6 p-2 text-gray-400">
              {previews.length > 0 && (
                <div className="mr-2 flex items-center">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
                    onClick={async () => {
                      const target = previews[current];
                      setPreviews((prev) => {
                        if (!prev[current]) return prev;
                        const nextArr = prev.filter(
                          (_, idx) => idx !== current,
                        );
                        if (nextArr.length === 0) setCurrent(0);
                        else if (current >= nextArr.length)
                          setCurrent(nextArr.length - 1);
                        return nextArr;
                      });

                      if (!target) return;

                      if (target.attachmentsId) {
                        try {
                          await instance.delete(
                            `/attachments/${target.attachmentsId}`,
                            { withCredentials: true },
                          );
                        } catch (err) {
                          console.error('첨부파일 삭제 실패', err);
                        }
                      } else {
                        try {
                          URL.revokeObjectURL(target.url);
                        } catch {}
                      }
                    }}
                  >
                    <Trash />
                    <span>파일 제거</span>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
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
                  accept="image/*, video/*"
                  multiple
                  ref={fileRef}
                  style={{ display: 'none' }}
                  onChange={onFile}
                />
              </div>
            </div>
            {previews.length > 0 && (
              <div className="relative mt-2">
                <div className="overflow-hidden rounded-2xl border border-gray-100">
                  <div className="relative -mx-3 h-125 w-[calc(100%+24px)]">
                    {previews[current].kind === 'VIDEO' ? (
                      <video
                        key={current}
                        src={previews[current].url}
                        controls
                        playsInline
                        className="h-full w-full object-cover"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                      />
                    ) : (
                      <img
                        key={current}
                        src={previews[current].url}
                        alt={previews[current].name}
                        className="h-full w-full object-cover"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                      />
                    )}
                  </div>
                </div>

                {previews.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="이전"
                      className="absolute top-1/2 -left-10 -translate-y-1/2 rotate-180 p-3"
                    >
                      <ArrowFilled />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="다음"
                      className="absolute top-1/2 -right-10 -translate-y-1/2 p-3"
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-3">
            <div className="flex justify-end gap-4 p-1 pr-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="border-main-yellow-800 text-body3 rounded-lg border px-8 py-2 text-gray-900"
              >
                취소
              </button>
              <button
                type="button"
                className="bg-main-yellow-100 border-main-yellow-400 text-body3 rounded-lg border px-8 py-2 text-gray-900"
                onClick={submitPost}
                disabled={isSubmitting || hasUploading}
              >
                {isSubmitting
                  ? '게시 중...'
                  : hasUploading
                    ? '업로드 중...'
                    : '게시'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
