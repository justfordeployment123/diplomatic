'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Wand2, User } from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/atoms/Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tone-improver', label: 'Tone Improver', icon: Wand2 },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, clearAuth } = useAuthStore();

  const handleLogout = () => {
    // Clear session cookie + in-memory store
    document.cookie = 'session=; path=/; max-age=0';
    clearAuth();
    router.push('/login');
    toast.success('Logged out successfully');
  };

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-30 w-full bg-navy-900 border-b border-navy-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span
            className="text-xl font-bold text-gold-400"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            DiploDocs
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-3 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-navy-700 text-white'
                  : 'text-navy-200 hover:text-white hover:bg-navy-800'
              )}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className={clsx(
                'px-3 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors flex items-center gap-1.5',
                pathname.startsWith('/dashboard')
                  ? 'bg-navy-700 text-white'
                  : 'text-navy-200 hover:text-white hover:bg-navy-800'
              )}
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth area */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-navy-700 border border-navy-600 flex items-center justify-center">
                  {initials ? (
                    <span className="text-xs font-semibold text-gold-400">{initials}</span>
                  ) : (
                    <User size={14} className="text-navy-200" />
                  )}
                </div>
                <span className="hidden sm:block text-sm text-navy-200">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-navy-400 hover:text-white hover:bg-navy-800 rounded-[var(--radius-sm)] transition-colors"
                aria-label="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-navy-900 bg-gold-400 hover:bg-gold-300 rounded-[var(--radius-md)] transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
