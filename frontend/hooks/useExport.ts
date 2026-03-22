'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

type ExportFormat = 'docx' | 'pdf';

export function useExportMutation(format: ExportFormat) {
  return useMutation({
    mutationFn: async (content: string) => {
      const res = await apiClient.post(
        `/api/export/${format}`,
        { content },
        { responseType: 'blob' }
      );
      // Trigger browser file download
      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });
}
