import { clsx } from 'clsx';

type Variant = 'default' | 'success' | 'danger' | 'warning' | 'info' | 'gold';

const variantClasses: Record<Variant, string> = {
  default: 'bg-surface-2 text-text-secondary border-border',
  success: 'bg-green-50 text-success border-green-200',
  danger: 'bg-red-50 text-danger border-red-200',
  warning: 'bg-amber-50 text-warning border-amber-200',
  info: 'bg-blue-50 text-info border-blue-200',
  gold: 'bg-gold-100 text-gold-700 border-gold-400',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] text-xs font-medium border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
