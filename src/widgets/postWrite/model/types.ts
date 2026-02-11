export type AttachmentType = 'IMAGE' | 'VIDEO';

export interface UploadAttachmentParams {
  file: File;
  attachmentsType: AttachmentType;
  imageOrder: number;
  signal?: AbortSignal;
}

export interface AttachmentResponse {
  attachmentId: number;
  attachmentUrl: string;
  attachmentsType: AttachmentType;
}

export type CreatePostBlock =
  | {
      order: number;
      blockType: 'TEXT';
      text: string;
    }
  | {
      order: number;
      blockType: 'ATTACHMENT';
      attachmentId: number;
    };

export interface CreatePostParams {
  title: string;
  blocks: CreatePostBlock[];
}

export interface PostResponse {
  title: string;
  createdAt: string;
  updatedAt: string;
  member: {
    memberId: number;
    email: string;
  };
  blocks: PostBlock[];
}

export type PostBlock =
  | {
      blockId: number;
      order: number;
      type: 'TEXT';
      text: string;
    }
  | {
      blockId: number;
      order: number;
      type: 'ATTACHMENT';
      attachment: {
        attachmentId: number;
        attachmentsType: AttachmentType;
        attachmentUrl: string;
      };
    };

export interface Preview {
  tempId: string; 
  name: string;
  url: string;   
  attachmentsType: AttachmentType;
  attachmentId?: number; 
  uploading: boolean; 
}
