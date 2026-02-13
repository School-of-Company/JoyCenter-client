import { useRef, useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { uploadAttachment, deleteAttachment } from '../api/attachments';
import type { AttachmentType, Preview } from './types';

export const usePostMedia = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const abortControllersRef = useRef<Map<string, AbortController>>(new Map());
    const previewsRef = useRef<Preview[]>([]);

    const [previews, setPreviews] = useState<Preview[]>([]);
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        previewsRef.current = previews;
    }, [previews]);

    useEffect(() => {
        const controllers = abortControllersRef.current;
        return () => {
            controllers.forEach((controller) => controller.abort());
            controllers.clear();
            previewsRef.current.forEach((p) => {
                if (p.url.startsWith('blob:')) {
                    try { URL.revokeObjectURL(p.url); } catch { }
                }
            });
        };
    }, []);

    const openFile = useCallback(() => fileRef.current?.click(), []);

    const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;

        const newPreviewsSnapshot: Preview[] = files.map((f) => ({
            tempId: Math.random().toString(36).substring(7),
            name: f.name,
            url: URL.createObjectURL(f),
            attachmentsType: f.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
            uploading: true,
        }));

        const previousLength = previewsRef.current.length;
        setPreviews((prev) => [...prev, ...newPreviewsSnapshot]);
        setCurrent(previousLength);

        if (fileRef.current) fileRef.current.value = '';

        await Promise.all(newPreviewsSnapshot.map(async (preview, index) => {
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

                setPreviews((prev) => prev.map((item) => {
                    if (item.tempId !== preview.tempId) return item;
                    if (item.url.startsWith('blob:')) {
                        try { URL.revokeObjectURL(item.url); } catch { }
                    }
                    return {
                        ...item,
                        url: uploadedData.url,
                        attachmentsType: uploadedData.attachmentType,
                        attachmentId: uploadedData.attachmentsId,
                        uploading: false,
                    };
                }));
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error('업로드 실패', err);
                }
                setPreviews((prev) => prev.map((item) =>
                    item.tempId === preview.tempId ? { ...item, uploading: false } : item,
                ));
            } finally {
                abortControllersRef.current.delete(preview.tempId);
            }
        }));
    };

    const removeFile = async () => {
        const target = previews[current];
        if (!target) return;

        setPreviews((prev) => prev.filter((_, i) => i !== current));
        setCurrent((prev) => (prev > 0 ? prev - 1 : 0));

        if (typeof target.attachmentId === 'number') {
            try {
                await deleteAttachment(target.attachmentId);
            } catch (err) {
                console.error('첨부파일 삭제 실패', err);
            }
        } else if (target.url.startsWith('blob:')) {
            try { URL.revokeObjectURL(target.url); } catch { }
        }
    };

    const goToPrevious = useCallback(() => {
        setPreviews((prev) => {
            if (prev.length === 0) return prev;
            setCurrent((idx) => (idx - 1 + prev.length) % prev.length);
            return prev;
        });
    }, []);

    const goToNext = useCallback(() => {
        setPreviews((prev) => {
            if (prev.length === 0) return prev;
            setCurrent((idx) => (idx + 1) % prev.length);
            return prev;
        });
    }, []);

    const isUploadingFiles = previews.some((p) => p.uploading);

    return {
        fileRef,
        previews,
        current,
        isUploadingFiles,
        openFile,
        onFile,
        removeFile,
        goToPrevious,
        goToNext,
    };
};
