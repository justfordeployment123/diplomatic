import ToneImprover from '@/components/organisms/ToneImprover';

export const metadata = {
  title: 'Tone Improver — DiploDocs',
  description: 'Polish rough text into formal diplomatic language',
};

export default function ToneImproverPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Tone Improver
        </h1>
        <p className="text-text-secondary mt-1">
          Paste rough text and get a polished, diplomatically appropriate version instantly.
        </p>
      </div>
      <ToneImprover />
    </div>
  );
}
