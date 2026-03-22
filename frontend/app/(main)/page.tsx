import Link from 'next/link';
import { ArrowRight, Wand2 } from 'lucide-react';
import GeneratorCard from '@/components/molecules/GeneratorCard';
import { getAllGenerators } from '@/config/generators';

export default function HomePage() {
  const generators = getAllGenerators();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
      {/* Hero */}
      <section className="text-center flex flex-col gap-4 items-center">
        <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full border border-gold-400 uppercase tracking-widest">
          AI-Powered Document Generation
        </span>
        <h1
          className="text-4xl sm:text-5xl font-bold text-navy-900 max-w-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Diplomatic documents,
          <br />
          <span className="text-gold-600">drafted in moments.</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-xl">
          Generate formal diplomatic documents — Note Verbales, speeches, briefings, and more —
          with the precision and gravitas expected by foreign ministries worldwide.
        </p>
      </section>

      {/* Generator Grid */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2
            className="text-2xl font-semibold text-navy-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Document Generators
          </h2>
          <span className="text-sm text-text-muted">{generators.length} types available</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {generators.map((gen) => (
            <GeneratorCard
              key={gen.id}
              id={gen.id}
              title={gen.title}
              description={gen.description}
              icon={gen.icon}
            />
          ))}
        </div>
      </section>

      {/* Tone Improver CTA */}
      <section>
        <Link
          href="/tone-improver"
          className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-navy-900 rounded-[var(--radius-xl)] hover:bg-navy-800 transition-colors"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-navy-800 group-hover:bg-navy-700 flex items-center justify-center transition-colors">
              <Wand2 size={24} className="text-gold-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Tone Improver</h3>
              <p className="text-sm text-navy-200 mt-0.5">
                Polish rough text into formal diplomatic language instantly
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gold-400 text-sm font-medium">
            Try it free
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      </section>
    </div>
  );
}
