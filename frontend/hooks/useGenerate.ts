'use client';

import { useGeneratorStore } from '@/stores/generatorStore';
import { useAuthStore } from '@/stores/authStore';
import { streamGenerate } from '@/lib/streamGenerate';
import { applyConfidentialMode } from '@/lib/confidentialMode';
import type { GeneratorConfig } from '@/types/generator.types';
import { toast } from 'sonner';

export function useGenerate(config: GeneratorConfig) {
  const {
    formData,
    isConfidentialMode,
    appendOutput,
    clearOutput,
    setIsGenerating,
  } = useGeneratorStore();

  const token = useAuthStore((s) => s.token);

  const generate = async () => {
    if (!token) {
      toast.error('Please log in to generate documents');
      return;
    }

    clearOutput();
    setIsGenerating(true);

    const payload = isConfidentialMode
      ? applyConfidentialMode(formData, config.confidentialFields)
      : formData;

    try {
      for await (const chunk of streamGenerate(config.id, payload, token)) {
        appendOutput(chunk);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed';
      toast.error(message);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generate };
}
