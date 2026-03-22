'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  mono?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper, error, mono, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="label-caps text-text-secondary"
          >
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-text-muted pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full h-10 px-3 bg-white border rounded-[var(--radius-md)] text-text-primary text-sm',
              'placeholder:text-text-muted',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500',
              error
                ? 'border-danger focus:ring-danger/30 focus:border-danger'
                : 'border-border hover:border-navy-200',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              mono && 'font-mono text-[13px]',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-text-muted pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-danger text-xs">{error}</p>}
        {!error && helper && <p className="text-text-muted text-xs">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
