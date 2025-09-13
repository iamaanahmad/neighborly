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
  Home,
  BookMarked,
  MessagesSquare,
  Settings,
  CircleHelp,
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/request-help', label: 'Request Help', icon: HandHelping },
  { href: '/offer-help', label: 'Offer Help', icon: HeartHandshake },
  { href: '/resources', label: 'Resources', icon: BookMarked },
  { href: '/messages', label: 'Messages', icon: MessagesSquare },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
          <HeartHandshake className="size-7" />
          <span className="text-foreground">Neighborly</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map(item => (
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
