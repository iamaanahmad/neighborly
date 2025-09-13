
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/auth-context';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { HeartHandshake, LogIn, PanelLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { AppSidebar } from './app-sidebar';

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

  const title = pageTitles[pathname] || 'Neighborly';
  const isAuthedPage = !!user;

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      {isAuthedPage && (
         <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs p-0">
                <AppSidebar />
            </SheetContent>
          </Sheet>
      )}
      
      {!isAuthedPage ? (
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary mr-auto">
            <HeartHandshake className="size-6" />
            <span className="text-foreground">Neighborly</span>
          </Link>
      ) : (
         <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl hidden sm:block">{title}</h1>
         </div>
      )}

      <div className="flex items-center gap-4 ml-auto">
        {!isAuthedPage && (
          <nav className="hidden md:flex gap-2">
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
              <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
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
