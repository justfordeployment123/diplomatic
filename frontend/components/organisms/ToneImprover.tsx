'use client';

import { useState } from 'react';
import { Copy, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/apiClient';
import Textarea from '@/components/atoms/Textarea';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';

const TONES = ['Formal', 'Neutral', 'Friendly', 'Assertive', 'Diplomatic', 'Urgent'];

export default function ToneImprover() {
  const [input, setInput] = useState('');
  const [selectedTone, setSelectedTone] = useState('Formal');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImprove = async () => {
    if (!input.trim()) { toast.error('Please enter some text'); return; }
    setIsLoading(true);
    setOutput('');
    try {
      const res = await apiClient.post('/api/tone-improve', {
        text: input,
        tone: selectedTone,
      });
      setOutput(res.data.result || res.data.text || '');
    } catch {
      toast.error('Tone improvement failed');
    } finally {
      setIsLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input side */}
      <div className="flex flex-col gap-4">
        <Textarea
          label="Original Text"
          placeholder="Paste your rough draft here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
        />
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Select
              label="Target Tone"
              options={TONES}
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
            />
          </div>
          <Button
            size="md"
            onClick={handleImprove}
            isLoading={isLoading}
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <Wand2 size={15} />
            Improve
          </Button>
        </div>
      </div>

      {/* Output side */}
      <div className="flex flex-col gap-3">
        <div className="label-caps text-text-secondary">Polished Result</div>
        <div className="relative flex-1 bg-white border border-border rounded-[var(--radius-lg)] min-h-64">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Spinner />
                <p className="text-sm text-text-muted">Improving tone...</p>
              </div>
            </div>
          )}
          {!isLoading && !output && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-text-muted text-center px-6">
                Your polished text will appear here
              </p>
            </div>
          )}
          {!isLoading && output && (
            <>
              <div className="p-5 text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {output}
              </div>
              <button
                onClick={copyOutput}
                className="absolute top-3 right-3 p-2 text-text-muted hover:text-navy-700 hover:bg-surface-2 rounded transition-colors"
                aria-label="Copy improved text"
              >
                <Copy size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
