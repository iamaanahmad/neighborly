'use client';

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
  const title = pageTitles[pathname] || 'Neighborly';
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (!user) {
    return (
     <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.id.substring(0,10)}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
