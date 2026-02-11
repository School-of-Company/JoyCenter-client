import { useRef, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { uploadAttachment, deleteAttachment, createPost } from '../api/write';
import type { AttachmentType, Preview, CreatePostBlock } from './types';

export const usePostWrite = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());
  const previewsRef = useRef<Preview[]>([]);

  const [previews, setPreviews] = useState<Preview[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    previewsRef.current = previews;
  }, [previews]);

  useEffect(() => {
    const controllers = abortControllersRef.current;
    const previewsSnapshot = previewsRef.current;

    return () => {
      controllers.forEach((controller) => controller.abort());
      controllers.clear();

      previewsSnapshot.forEach((p) => {
        if (p.url.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(p.url);
          } catch {}
        }
      });
    };
  }, []);

  const openFile = () => fileRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    const newPreviews: Preview[] = files.map((f) => {
      const attachmentsType: AttachmentType = f.type.startsWith('video/') ? 'VIDEO' : 'IMAGE';

      return {
        tempId: Math.random().toString(36).substring(7),
        name: f.name,
        url: URL.createObjectURL(f),
        attachmentsType,
        uploading: true,
      };
    });

    const currentPreviews = previewsRef.current;
    const previousLength = currentPreviews.length;

    const updatedPreviews = [...currentPreviews, ...newPreviews];
    previewsRef.current = updatedPreviews;

    setPreviews(updatedPreviews);
    setCurrent(previousLength);

    if (fileRef.current) fileRef.current.value = '';

    newPreviews.forEach(async (preview, index) => {
      const file = files[index];
      const uploadOrder = previousLength + index + 1;

      const controller = new AbortController();
      abortControllersRef.current.set(preview.tempId, controller);

      try {
        const uploadedData = await uploadAttachment({
          file,
          attachmentsType: preview.attachmentsType,
          imageOrder: uploadOrder,
          signal: controller.signal,
        });

        setPreviews((prev) => {
          const next = prev.map((item) => {
            if (item.tempId !== preview.tempId) return item;

            const temporaryUrl = item.url;
            if (temporaryUrl.startsWith('blob:')) {
              try {
                URL.revokeObjectURL(temporaryUrl);
              } catch {}
            }

            return {
              ...item,
              url: uploadedData.attachmentUrl,
              attachmentsType: uploadedData.attachmentsType,
              attachmentId: uploadedData.attachmentId,
              uploading: false,
            };
          });

          previewsRef.current = next;
          return next;
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Upload canceled for', preview.name);
          return;
        }

        if (err instanceof AxiosError) {
          console.error('업로드 실패', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message,
          });
        } else {
          console.error('업로드 실패 (알 수 없는 오류)', err);
        }

        setPreviews((prev) => {
          const next = prev.map((item) =>
            item.tempId === preview.tempId ? { ...item, uploading: false } : item,
          );
          previewsRef.current = next;
          return next;
        });
      } finally {
        abortControllersRef.current.delete(preview.tempId);
      }
    });
  };

  const removeFile = async () => {
    const targetFile = previews[current];

    const currentPreviews = previewsRef.current;
    if (!currentPreviews[current]) return;

    const remainingPreviews = currentPreviews.filter((_, index) => index !== current);

    const newCurrentIndex =
      remainingPreviews.length === 0
        ? 0
        : current >= remainingPreviews.length
          ? remainingPreviews.length - 1
          : current;

    previewsRef.current = remainingPreviews;
    setPreviews(remainingPreviews);
    setCurrent(newCurrentIndex);

    if (!targetFile) return;

    if (typeof targetFile.attachmentId === 'number') {
      try {
        await deleteAttachment(targetFile.attachmentId);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('첨부파일 삭제 실패', {
            status: err.response?.status,
            message: err.message,
          });
        } else {
          console.error('첨부파일 삭제 실패', err);
        }
      }
    } else {
      try {
        URL.revokeObjectURL(targetFile.url);
      } catch {}
    }
  };

  const goToPrevious = () => {
    setCurrent((idx) => (previews.length ? (idx - 1 + previews.length) % previews.length : 0));
  };

  const goToNext = () => {
    setCurrent((idx) => (previews.length ? (idx + 1) % previews.length : 0));
  };

  const isUploadingFiles = previews.some((p) => p.uploading);

  const submitPost = async (): Promise<boolean> => {
    if (!title.trim()) {
      alert('제목을 입력하세요');
      return false;
    }

    if (isUploadingFiles) {
      alert('파일 업로드가 완료될 때까지 기다려주세요');
      return false;
    }

    setIsSubmitting(true);
    try {
      const blocks: CreatePostBlock[] = [];
      let order = 0;

      const trimmedContent = content.trim();
      if (trimmedContent) {
        blocks.push({
          order: order++,
          blockType: 'TEXT',
          text: trimmedContent,
        });
      }

      const uploaded = previews.filter(
        (p): p is Preview & { attachmentId: number } => typeof p.attachmentId === 'number',
      );

      uploaded.forEach((p) => {
        blocks.push({
          order: order++,
          blockType: 'ATTACHMENT',
          attachmentId: p.attachmentId,
        });
      });

      await createPost({ title, blocks });
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('게시 실패', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
      } else {
        console.error('게시 실패', err);
      }
      alert('게시 실패');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    fileRef,
    previews,
    current,
    title,
    setTitle,
    content,
    setContent,
    isSubmitting,
    isUploadingFiles,
    openFile,
    onFile,
    removeFile,
    goToPrevious,
    goToNext,
    submitPost,
  };
};
