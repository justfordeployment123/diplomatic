'use client';

import { useState } from 'react';
import { Languages, Copy } from 'lucide-react';
import { toast } from 'sonner';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import { useTranslateMutation } from '@/hooks/useTranslate';

const LANGUAGES = [
  'Arabic', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Dutch',
  'French', 'German', 'Hindi', 'Indonesian', 'Italian', 'Japanese',
  'Korean', 'Malay', 'Persian', 'Polish', 'Portuguese', 'Russian',
  'Spanish', 'Swedish', 'Turkish', 'Urdu',
];

interface TranslationPanelProps {
  sourceText: string;
}

export default function TranslationPanel({ sourceText }: TranslationPanelProps) {
  const [language, setLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const { mutateAsync, isPending } = useTranslateMutation();

  const handleTranslate = async () => {
    if (!language) { toast.error('Please select a language'); return; }
    try {
      const result = await mutateAsync({ text: sourceText, targetLanguage: language });
      setTranslatedText(result.translatedText);
    } catch {
      toast.error('Translation failed');
    }
  };

  const copyTranslation = () => {
    navigator.clipboard.writeText(translatedText);
    toast.success('Copied');
  };

  return (
    <div className="mt-4 border-t border-border pt-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
        <Languages size={16} />
        Translate
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Select
            options={LANGUAGES}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Select language..."
          />
        </div>
        <Button
          variant="secondary"
          onClick={handleTranslate}
          isLoading={isPending}
          disabled={!language || isPending}
        >
          {isPending ? 'Translating...' : 'Translate'}
        </Button>
      </div>

      {isPending && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}

      {translatedText && !isPending && (
        <div className="relative bg-navy-050 border border-border rounded-[var(--radius-md)] p-4">
          <button
            onClick={copyTranslation}
            className="absolute top-3 right-3 p-1.5 text-text-muted hover:text-navy-700 hover:bg-white rounded transition-colors"
            aria-label="Copy translation"
          >
            <Copy size={14} />
          </button>
          <p className="text-sm text-text-primary whitespace-pre-wrap pr-8">{translatedText}</p>
        </div>
      )}
    </div>
  );
}
