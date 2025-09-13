
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HandHelping,
  HeartHandshake,
  LayoutGrid,
  BookMarked,
  MessagesSquare,
  Settings,
  CircleHelp,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/request-help', label: 'Request Help', icon: HandHelping },
    { href: '/offer-help', label: 'Offer Help', icon: HeartHandshake },
    { href: '/messages', label: 'Messages', icon: MessagesSquare },
    { href: '/resources', label: 'Resources', icon: BookMarked },
  ];

  // A simple way to show admin link, in a real app this would be more robust
  const isAdmin = user?.email?.endsWith('@admin.com');

  return (
    <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
      <header className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <HeartHandshake className="size-7" />
          <span className="text-foreground">Neighborly</span>
        </Link>
      </header>
      <nav className="flex-1 overflow-auto py-2">
        <div className="grid items-start px-2 text-sm font-medium lg:px-4">
          {menuItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === item.href && 'bg-muted text-primary'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
        {isAdmin && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">
                Admin
            </div>
            <div className="grid items-start px-2 text-sm font-medium lg:px-4">
                 <Link
                    href="/admin/dashboard"
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname === '/admin/dashboard' && 'bg-muted text-primary'
                    )}
                    >
                    <Shield className="h-4 w-4" />
                    Insights
                </Link>
            </div>
          </>
        )}
      </nav>
      <div className="mt-auto p-4">
        <div className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <CircleHelp className="h-4 w-4" />
            Help
          </Link>
        </div>
      </div>
    </aside>
  );
}
