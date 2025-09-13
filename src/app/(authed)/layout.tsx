'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Sidebar } from '@/components/ui/sidebar';
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
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
      <div className="relative flex min-h-screen w-full">
        <Sidebar>
            <AppSidebar />
        </Sidebar>
        <div className="flex flex-col flex-1">
            <AppHeader />
            <main className="p-4 lg:p-6">{children}</main>
        </div>
    </div>
  );
}
