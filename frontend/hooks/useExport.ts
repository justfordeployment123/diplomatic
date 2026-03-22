'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type ExportFormat = 'docx' | 'pdf';

export function useExportMutation(format: ExportFormat) {
  return useMutation({
    mutationFn: async (_content: string) => {
      await new Promise((r) => setTimeout(r, 600));
      // Mock: show a toast instead of downloading
      toast.success(`Demo mode: .${format} download will work once backend is connected`);
    },
  });
}
