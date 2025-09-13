'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/auth-context';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { HeartHandshake, LogIn } from 'lucide-react';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/request-help': 'Request Help',
  '/offer-help': 'Offer Help',
  '/resources': 'Resource Directory',
  '/messages': 'Messages',
  '/settings': 'Settings',
  '/profile': 'Profile',
};

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const title = pageTitles[pathname] || (user ? 'Dashboard' : 'Neighborly');

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const isAuthedPage = !!user;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      {isAuthedPage ? <SidebarTrigger className="md:hidden" /> : null}
      
      {!isAuthedPage ? (
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <HeartHandshake className="size-6" />
            <span className="text-foreground">Neighborly</span>
          </Link>
      ) : (
         <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
      )}


      <div className="ml-auto flex items-center gap-4">
        {!isAuthedPage && (
          <nav className="hidden md:flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/offer-help">Find Requests</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/resources">Find Resources</Link>
            </Button>
             <Button variant="ghost" asChild>
              <Link href="/request-help">Post a Request</Link>
            </Button>
          </nav>
        )}

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">
              <LogIn className="mr-2" />
              Login / Sign Up
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
