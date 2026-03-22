'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export default function FormSection({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
}: FormSectionProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className="bg-white border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      <div
        className={`flex items-center justify-between px-5 py-4 border-b border-border-light ${
          collapsible ? 'cursor-pointer hover:bg-surface-2 transition-colors' : ''
        }`}
        onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
      >
        <h3 className="text-base font-semibold text-navy-800">{title}</h3>
        {collapsible && (
          <ChevronDown
            size={18}
            className={`text-text-muted transition-transform duration-200 ${
              collapsed ? '' : 'rotate-180'
            }`}
          />
        )}
      </div>
      {!collapsed && (
        <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
      )}
    </div>
  );
}
