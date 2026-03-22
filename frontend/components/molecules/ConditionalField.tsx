'use client';

interface ConditionalFieldProps {
  show: boolean;
  children: React.ReactNode;
}

export default function ConditionalField({ show, children }: ConditionalFieldProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-200 ${
        show ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="pt-2">{children}</div>
    </div>
  );
}
