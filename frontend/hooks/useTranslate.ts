'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

interface TranslatePayload {
  text: string;
  targetLanguage: string;
}

interface TranslateResult {
  translatedText: string;
}

export function useTranslateMutation() {
  return useMutation<TranslateResult, Error, TranslatePayload>({
    mutationFn: (payload) =>
      apiClient.post('/api/translate', payload).then((r) => r.data),
  });
}
