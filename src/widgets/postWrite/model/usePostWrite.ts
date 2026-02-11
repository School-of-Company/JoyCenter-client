import { useRef, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { uploadAttachment, deleteAttachment, createPost } from '../api/write';
import type { AttachmentType, Preview } from './types';

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
    const previews = previewsRef.current;

    return () => {
      controllers.forEach((controller) => controller.abort());
      controllers.clear();

      previews.forEach((p) => {
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

    const newPreviews = files.map((f: File) => {
      const kind: 'IMAGE' | 'VIDEO' = f.type.startsWith('video/') ? 'VIDEO' : 'IMAGE';
      return {
        tempId: Math.random().toString(36).substring(7),
        name: f.name,
        url: URL.createObjectURL(f),
        kind,
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

      const attachmentsType: AttachmentType = file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE';

      const controller = new AbortController();
      abortControllersRef.current.set(preview.tempId, controller);

      try {
        const uploadedData = await uploadAttachment({
          file,
          attachmentsType,
          imageOrder: uploadOrder,
          signal: controller.signal,
        });

        setPreviews((previousPreviews) => {
          const updatedPreviews = previousPreviews.map((item) => {
            if (item.tempId !== preview.tempId) return item;

            const temporaryUrl = item.url;
            if (temporaryUrl.startsWith('blob:')) {
              try {
                URL.revokeObjectURL(temporaryUrl);
              } catch {}
            }

            return {
              ...item,
              url: uploadedData.url,
              attachmentsId: uploadedData.attachmentsId,
              uploading: false,
            };
          });
          previewsRef.current = updatedPreviews;
          return updatedPreviews;
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

        setPreviews((previousPreviews) => {
          const updatedPreviews = previousPreviews.map((item) =>
            item.tempId === preview.tempId ? { ...item, uploading: false } : item,
          );
          previewsRef.current = updatedPreviews;
          return updatedPreviews;
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

    if (targetFile.attachmentsId) {
      try {
        await deleteAttachment(targetFile.attachmentsId);
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
    setCurrent((currentIndex) =>
      previews.length ? (currentIndex - 1 + previews.length) % previews.length : 0,
    );
  };

  const goToNext = () => {
    setCurrent((currentIndex) => (previews.length ? (currentIndex + 1) % previews.length : 0));
  };

  const isUploadingFiles = previews.some((preview) => preview.uploading);

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

      const uploadedAttachments = previews.filter((preview) => preview.attachmentsId);
      uploadedAttachments.forEach((attachment) => {
        blocks.push({
          order: order++,
          blockType: 'ATTACHMENT',
          attachmentId: attachment.attachmentsId!,
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
