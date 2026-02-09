export interface BlockType {
  title: string;
  createdAt: string;
  updatedAt: string;
  member: {
    memberId: number;
    email: string;
  };
  blocks: Array<{
    blockId: number;
    order: number;
    type: 'TEXT';
    text: string;
    attachment: {
      attachmentId: number;
      attachmentsType: 'IMAGE' | 'VIDEO';
      attachmentUrl: string;
    };
  }>;
}
