import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center px-4 py-12">
      {/* Back to home */}
      <div className="w-full max-w-md mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-navy-400 hover:text-navy-200 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span
              className="text-3xl font-bold text-gold-400 hover:text-gold-300 transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              DiploDocs
            </span>
          </Link>
          <p className="text-navy-300 text-sm mt-2">Diplomatic Document Platform</p>
        </div>

        <div className="bg-white rounded-[var(--radius-xl)] shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
