
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';


export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
      <div className="flex min-h-screen w-full bg-muted/40">
        <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
            <AppSidebar />
        </aside>
        <div className="flex flex-1 flex-col">
            <AppHeader />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    </div>
  );
}
