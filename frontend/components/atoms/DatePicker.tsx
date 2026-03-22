'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Calendar } from 'lucide-react';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, helper, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="label-caps text-text-secondary">
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <Calendar
            size={16}
            className="absolute left-3 text-text-muted pointer-events-none"
          />
          <input
            ref={ref}
            type="date"
            id={inputId}
            className={clsx(
              'w-full h-10 pl-10 pr-3 bg-white border rounded-[var(--radius-md)] text-text-primary text-sm',
              'transition-colors duration-150 cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500',
              error
                ? 'border-danger focus:ring-danger/30 focus:border-danger'
                : 'border-border hover:border-navy-200',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-danger text-xs">{error}</p>}
        {!error && helper && <p className="text-text-muted text-xs">{helper}</p>}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
export default DatePicker;
