export type PageType = 'text' | 'image';

export interface Page {
  id: string;
  type: PageType;
  content: string;
  createdAt: number;
  updatedAt?: number;
}
