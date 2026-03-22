'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface MultiSelectProps {
  label?: string;
  options: string[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string;
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  error,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const displayText =
    value.length === 0
      ? placeholder
      : value.length === 1
      ? value[0]
      : `${value.length} selected`;

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      {label && <span className="label-caps text-text-secondary">{label}</span>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={clsx(
            'w-full h-10 pl-3 pr-9 bg-white border rounded-[var(--radius-md)] text-sm text-left',
            'flex items-center transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500',
            error
              ? 'border-danger text-danger'
              : value.length
              ? 'border-border text-text-primary'
              : 'border-border text-text-muted',
            'hover:border-navy-200'
          )}
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown
            size={16}
            className={`absolute right-3 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute z-50 top-full mt-1 w-full bg-white border border-border rounded-[var(--radius-md)] shadow-md max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-text-primary hover:bg-surface-2 transition-colors"
              >
                <span
                  className={clsx(
                    'w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors',
                    value.includes(option)
                      ? 'bg-gold-500 border-gold-500'
                      : 'border-border bg-white'
                  )}
                >
                  {value.includes(option) && <Check size={11} className="text-navy-900" />}
                </span>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
}
