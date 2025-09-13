'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
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

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid, authed: true },
    { href: '/request-help', label: 'Request Help', icon: HandHelping, authed: false },
    { href: '/offer-help', label: 'Offer Help', icon: HeartHandshake, authed: false },
    { href: '/resources', label: 'Resources', icon: BookMarked, authed: false },
    { href: '/messages', label: 'Messages', icon: MessagesSquare, authed: true },
  ];

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <HeartHandshake className="size-7" />
          <span className="text-foreground">Neighborly</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.filter(item => !item.authed || (item.authed && user)).map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="mb-2" />
        <SidebarMenu>
           <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Help">
                <Link href="#">
                  <CircleHelp />
                  <span>Help</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
