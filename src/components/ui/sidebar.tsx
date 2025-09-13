
'use client';

import { AppSidebar } from '@/components/app-sidebar';

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="hidden border-r bg-background sm:block">
        {children}
    </aside>
  );
}
