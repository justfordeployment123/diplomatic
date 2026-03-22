'use client';

import { useMutation } from '@tanstack/react-query';

interface TranslatePayload {
  text: string;
  targetLanguage: string;
}

interface TranslateResult {
  translatedText: string;
}

export function useTranslateMutation() {
  return useMutation<TranslateResult, Error, TranslatePayload>({
    mutationFn: async ({ text, targetLanguage }) => {
      await new Promise((r) => setTimeout(r, 1000));
      // Mock: return a placeholder translation note
      return {
        translatedText: `[Mock translation to ${targetLanguage}]\n\n${text.slice(0, 200)}...\n\nThis is a demo translation. Connect the backend to get real AI-powered translations.`,
      };
    },
  });
}
