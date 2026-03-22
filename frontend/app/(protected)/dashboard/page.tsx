import DashboardTable from '@/components/organisms/DashboardTable';

export const metadata = {
  title: 'Dashboard — DiploDocs',
};

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          My Documents
        </h1>
        <p className="text-text-secondary mt-1">All your generated diplomatic documents</p>
      </div>
      <DashboardTable />
    </div>
  );
}
