export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-navy-900 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <span
          className="text-base font-bold text-gold-400"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          DiploDocs
        </span>
        <p className="text-sm text-navy-400">
          &copy; {year} DiploDocs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
