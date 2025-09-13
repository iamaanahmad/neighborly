
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <HeartHandshake className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Neighborly</span>
        </Link>
        <TooltipProvider>
          {menuItems.map(item => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    pathname === item.href && 'bg-accent text-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
          {isAdmin && (
             <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/admin/dashboard"
                         className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                            pathname === '/admin/dashboard' && 'bg-accent text-accent-foreground'
                        )}
                    >
                        <Shield className="h-5 w-5" />
                        <span className="sr-only">Admin Insights</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Admin Insights</TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
