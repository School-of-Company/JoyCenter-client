import { instance } from '@/shared/lib/axios';
import type { UploadAttachmentParams, AttachmentResponse } from '../model/types';

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
    timeout: 60000,
    signal,
  });

  return res.data;
};

export const deleteAttachment = async (attachmentId: number): Promise<void> => {
  await instance.delete(`/attachments/${attachmentId}`);
};
