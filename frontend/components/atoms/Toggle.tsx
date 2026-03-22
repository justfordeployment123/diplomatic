'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  helper?: string;
  id?: string;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, label, helper, id, disabled }: ToggleProps) {
  const toggleId = id || 'toggle';
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        id={toggleId}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2
          focus-visible:ring-gold-500 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${checked ? 'bg-gold-500' : 'bg-navy-200'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm
            ring-0 transition-transform duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      {label && (
        <div className="flex flex-col">
          <label htmlFor={toggleId} className="text-sm font-medium text-text-primary cursor-pointer">
            {label}
          </label>
          {helper && <span className="text-xs text-text-muted mt-0.5">{helper}</span>}
        </div>
      )}
    </div>
  );
}
