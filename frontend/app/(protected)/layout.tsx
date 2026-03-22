import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // Mock mode: just check cookie exists — no backend fetch needed
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) redirect('/login');

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
