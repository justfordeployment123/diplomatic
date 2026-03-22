'use client';

import { useGeneratorStore } from '@/stores/generatorStore';
import { applyConfidentialMode } from '@/lib/confidentialMode';
import { MOCK_GENERATED_TEXT } from '@/lib/mockData';
import type { GeneratorConfig } from '@/types/generator.types';
import { toast } from 'sonner';

/** Simulates streaming by yielding one word at a time */
async function* mockStream(text: string): AsyncIterable<string> {
  const words = text.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise((r) => setTimeout(r, 30 + Math.random() * 40));
  }
}

export function useGenerate(config: GeneratorConfig) {
  const {
    formData,
    isConfidentialMode,
    appendOutput,
    clearOutput,
    setIsGenerating,
  } = useGeneratorStore();

  const generate = async () => {
    clearOutput();
    setIsGenerating(true);

    // Apply confidential mode if on (still works client-side)
    if (isConfidentialMode) {
      applyConfidentialMode(formData, config.confidentialFields);
    }

    try {
      const mockText =
        MOCK_GENERATED_TEXT[config.id] ||
        `This is a sample ${config.title} document generated in demo mode. Connect the backend to generate real AI-powered diplomatic documents tailored to your inputs.`;

      for await (const chunk of mockStream(mockText)) {
        appendOutput(chunk);
      }
    } catch {
      toast.error('Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return { generate };
}
