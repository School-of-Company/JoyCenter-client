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

export interface Preview {
    tempId: string;
    name: string;
    url: string;
    kind: 'IMAGE' | 'VIDEO';
    attachmentsId?: number;
    uploading?: boolean;
}
