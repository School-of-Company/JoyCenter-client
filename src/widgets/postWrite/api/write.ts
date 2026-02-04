import { instance } from '@/shared/lib/axios';

export type AttachmentType = 'IMAGE' | 'VIDEO';

export interface UploadAttachmentParams {
    file: File;
    attachmentsType: AttachmentType;
    imageOrder: number;
    signal?: AbortSignal;
}

export interface AttachmentResponse {
    url: string;
    attachmentsId: number;
}

export interface CreatePostParams {
    title: string;
    blocks: {
        order: number;
        blockType: 'TEXT' | 'ATTACHMENT';
        text?: string;
        attachmentId?: number;
    }[];
}

export const uploadAttachment = async ({
    file,
    attachmentsType,
    imageOrder,
    signal,
}: UploadAttachmentParams): Promise<AttachmentResponse> => {
    const fd = new FormData();
    fd.append('file', file);

    const res = await instance.post<AttachmentResponse>('/attachments', fd, {
        params: { attachmentsType, imageOrder },
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        timeout: 60000,
        signal,
    });

    return res.data;
};

export const deleteAttachment = async (attachmentsId: number): Promise<void> => {
    await instance.delete(`/attachments/${attachmentsId}`, {
        withCredentials: true,
    });
};

export const createPost = async (params: CreatePostParams): Promise<void> => {
    await instance.post('/post', params);
};
