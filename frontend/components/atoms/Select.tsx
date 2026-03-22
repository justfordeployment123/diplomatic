'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helper?: string;
  error?: string;
  options: string[] | { label: string; value: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helper, error, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    const normalizedOptions = options.map((o) =>
      typeof o === 'string' ? { label: o, value: o } : o
    );

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="label-caps text-text-secondary">
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full h-10 pl-3 pr-9 bg-white border rounded-[var(--radius-md)] text-text-primary text-sm',
              'appearance-none cursor-pointer',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500',
              error
                ? 'border-danger focus:ring-danger/30 focus:border-danger'
                : 'border-border hover:border-navy-200',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {normalizedOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
        </div>
        {error && <p className="text-danger text-xs">{error}</p>}
        {!error && helper && <p className="text-text-muted text-xs">{helper}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
