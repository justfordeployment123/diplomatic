import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

interface GeneratorCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function GeneratorCard({ id, title, description, icon }: GeneratorCardProps) {
  // Dynamically resolve the Lucide icon by name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as Record<string, any>)[icon] as React.ComponentType<{ size?: number; className?: string }> | undefined;

  return (
    <Link
      href={`/generators/${id}`}
      className="group flex flex-col gap-4 p-6 bg-white border border-border rounded-[var(--radius-xl)] shadow-sm hover:shadow-md hover:border-gold-400 transition-all duration-200"
    >
      <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-navy-050 flex items-center justify-center text-navy-700 group-hover:bg-gold-100 group-hover:text-gold-700 transition-colors duration-200">
        {IconComponent ? <IconComponent size={24} /> : <Icons.FileText size={24} />}
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-base font-semibold text-navy-900 group-hover:text-navy-800">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center gap-1 text-sm font-medium text-gold-600 group-hover:text-gold-500 transition-colors">
        Generate
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
