
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';
import {
  HandHelping,
  HeartHandshake,
  LayoutGrid,
  BookMarked,
  MessagesSquare,
  Settings,
  CircleHelp,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

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

  return (
    <TooltipProvider>
    <div className="flex flex-col h-full">
        <header className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                <HeartHandshake className="size-7" />
                <span className="text-foreground">Neighborly</span>
            </Link>
        </header>
        <nav className="flex-1 overflow-auto py-2">
            <div className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map(item => (
                <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                        <Link
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                pathname === item.href && 'bg-muted text-primary'
                            )}
                            >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>

            ))}
            </div>
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
    </div>
    </TooltipProvider>
  );
}
