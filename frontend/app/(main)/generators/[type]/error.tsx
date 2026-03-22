'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';

export default function GeneratorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
        <span className="text-danger text-2xl">⚠</span>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-navy-900 mb-2">Something went wrong</h2>
        <p className="text-text-secondary text-sm">
          The document generator encountered an error. This may be because the backend is
          unreachable.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="primary" onClick={reset}>Try again</Button>
        <Link href="/">
          <Button variant="secondary">Go home</Button>
        </Link>
      </div>
    </div>
  );
}
