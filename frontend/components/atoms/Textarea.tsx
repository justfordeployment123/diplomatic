'use client';

import { forwardRef, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
  showCharCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helper, error, showCharCount, className, id, value, onChange, ...props }, ref) => {
    const inputId = id || props.name;
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLTextAreaElement>) || innerRef;

    const autoGrow = (el: HTMLTextAreaElement) => {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };

    useEffect(() => {
      if (combinedRef.current) autoGrow(combinedRef.current);
    }, [value]);

    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <div className="flex justify-between items-center">
            <label htmlFor={inputId} className="label-caps text-text-secondary">
              {label}
              {props.required && <span className="text-danger ml-1">*</span>}
            </label>
            {showCharCount && props.maxLength && (
              <span className="text-xs text-text-muted">
                {charCount}/{props.maxLength}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={combinedRef}
          id={inputId}
          value={value}
          onChange={(e) => {
            autoGrow(e.target);
            onChange?.(e);
          }}
          rows={props.rows || 3}
          className={clsx(
            'w-full px-3 py-2.5 bg-white border rounded-[var(--radius-md)] text-text-primary text-sm',
            'placeholder:text-text-muted resize-none overflow-hidden',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500',
            error
              ? 'border-danger focus:ring-danger/30 focus:border-danger'
              : 'border-border hover:border-navy-200',
            className
          )}
          {...props}
        />
        {error && <p className="text-danger text-xs">{error}</p>}
        {!error && helper && <p className="text-text-muted text-xs">{helper}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
