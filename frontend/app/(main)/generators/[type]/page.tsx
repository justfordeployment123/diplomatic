import { notFound } from 'next/navigation';
import { GENERATOR_CONFIGS } from '@/config/generators';
import GeneratorForm from '@/components/organisms/GeneratorForm';
import OutputPanel from '@/components/organisms/OutputPanel';

interface Props {
  params: Promise<{ type: string }>;
}

export default async function GeneratorPage({ params }: Props) {
  // Next.js 16: params is a Promise
  const { type } = await params;
  const config = GENERATOR_CONFIGS[type];

  if (!config) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {config.title}
        </h1>
        <p className="text-text-secondary mt-1">{config.description}</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="sticky top-20">
          <GeneratorForm config={config} />
        </div>
        <div>
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(GENERATOR_CONFIGS).map((type) => ({ type }));
}
