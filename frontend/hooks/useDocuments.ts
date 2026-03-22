'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { MOCK_PAGINATED, MOCK_FULL_DOCUMENT } from '@/lib/mockData';
import type { Document, PaginatedDocuments } from '@/types/document.types';
import { toast } from 'sonner';

export function useDocumentHistory(_page = 1) {
  return useQuery<PaginatedDocuments>({
    queryKey: ['documents', _page],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return MOCK_PAGINATED;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useDocument(id: string) {
  return useQuery<Document>({
    queryKey: ['document', id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      const doc = MOCK_FULL_DOCUMENT[id];
      if (!doc) throw new Error('Document not found');
      return doc;
    },
    enabled: !!id,
  });
}

export function useSendEmailMutation() {
  return useMutation({
    mutationFn: async (payload: { to: string; subject: string; body: string }) => {
      await new Promise((r) => setTimeout(r, 800));
      console.log('Mock email sent to:', payload.to);
      toast.success(`Email sent to ${payload.to}`);
      return { success: true };
    },
  });
}
