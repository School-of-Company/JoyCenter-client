import { useState } from 'react';
import { AxiosError } from 'axios';
import { createPost } from '../api/post';
import { usePostMedia } from './usePostMedia';
import type { Preview, CreatePostBlock } from './types';

export const usePostWrite = () => {
  const media = usePostMedia();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const submitPost = async (): Promise<boolean> => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      alert('제목을 입력하세요');
      return false;
    }

    if (media.isUploadingFiles) {
      alert('파일 업로드가 완료될 때까지 기다려주세요');
      return false;
    }

    setIsSubmitting(true);
    try {
      const blocks: CreatePostBlock[] = [];
      let order = 0;

      if (trimmedContent) {
        blocks.push({
          order: order++,
          blockType: 'TEXT',
          text: trimmedContent,
        });
      }

      const uploaded = media.previews.filter(
        (p): p is Preview & { attachmentId: number } => typeof p.attachmentId === 'number',
      );

      uploaded.forEach((p) => {
        blocks.push({
          order: order++,
          blockType: 'ATTACHMENT',
          attachmentId: p.attachmentId,
        });
      });

      await createPost({ title: trimmedTitle, blocks });
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
    ...media,
    title,
    content,
    isSubmitting,
    onTitleChange,
    onContentChange,
    submitPost,
  };
};
