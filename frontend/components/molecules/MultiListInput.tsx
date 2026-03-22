'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface MultiListInputProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (values: string[]) => void;
  error?: string;
  addLabel?: string;
}

export default function MultiListInput({
  label,
  placeholder = 'Add item...',
  value,
  onChange,
  error,
  addLabel = 'Add',
}: MultiListInputProps) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setDraft('');
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="label-caps text-text-secondary">{label}</span>}

      {value.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-3 py-2 bg-surface-2 border border-border rounded-[var(--radius-md)] text-sm text-text-primary"
        >
          <span className="text-text-muted text-xs w-5 shrink-0">{i + 1}.</span>
          <span className="flex-1">{item}</span>
          <button
            type="button"
            onClick={() => remove(i)}
            aria-label={`Remove item ${i + 1}`}
            className="text-text-muted hover:text-danger transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            flex-1 h-9 px-3 bg-white border border-border rounded-[var(--radius-md)]
            text-sm text-text-primary placeholder:text-text-muted
            focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500
            hover:border-navy-200 transition-colors
          "
        />
        <Button type="button" variant="secondary" size="sm" onClick={add}>
          <Plus size={14} />
          {addLabel}
        </Button>
      </div>

      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
}
