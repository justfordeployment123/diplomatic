export interface Document {
  id: string;
  type: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface DocumentListItem {
  id: string;
  type: string;
  subject: string;
  createdAt: string;
}

export interface PaginatedDocuments {
  data: DocumentListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
