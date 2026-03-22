import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import ConfidentialModeBar from '@/components/molecules/ConfidentialModeBar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <ConfidentialModeBar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
