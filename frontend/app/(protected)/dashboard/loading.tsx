export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="h-8 w-48 bg-navy-100 rounded animate-pulse mb-2" />
        <div className="h-4 w-72 bg-navy-050 rounded animate-pulse" />
      </div>
      <div className="bg-white border border-border rounded-[var(--radius-xl)] overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border">
          <div className="h-5 w-40 bg-navy-100 rounded animate-pulse" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-border-light animate-pulse">
            <div className="w-5 h-5 bg-navy-100 rounded" />
            <div className="flex-1">
              <div className="h-4 bg-navy-100 rounded w-2/3 mb-2" />
              <div className="h-3 bg-navy-050 rounded w-1/4" />
            </div>
            <div className="h-5 w-20 bg-navy-050 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
