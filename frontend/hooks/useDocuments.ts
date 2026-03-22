'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import type { Document, PaginatedDocuments } from '@/types/document.types';

export function useDocumentHistory(page = 1) {
  return useQuery<PaginatedDocuments>({
    queryKey: ['documents', page],
    queryFn: () =>
      apiClient.get(`/api/documents?page=${page}`).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDocument(id: string) {
  return useQuery<Document>({
    queryKey: ['document', id],
    queryFn: () => apiClient.get(`/api/documents/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

export function useSendEmailMutation() {
  return useMutation({
    mutationFn: (payload: { to: string; subject: string; body: string }) =>
      apiClient.post('/api/send-email', payload).then((r) => r.data),
  });
}
