'use client';

import { ShieldAlert } from 'lucide-react';
import { useGeneratorStore } from '@/stores/generatorStore';

export default function ConfidentialModeBar() {
  const isConfidentialMode = useGeneratorStore((s) => s.isConfidentialMode);

  if (!isConfidentialMode) return null;

  return (
    <div className="sticky top-0 z-40 w-full bg-gold-500 text-navy-900 px-4 py-2 flex items-center gap-3 shadow-sm">
      <ShieldAlert size={18} className="shrink-0" />
      <span className="text-sm font-semibold">
        Confidential Mode Active — sensitive fields will be replaced with placeholders before sending
      </span>
    </div>
  );
}
