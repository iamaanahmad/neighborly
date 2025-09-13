import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, HandHelping, HeartHandshake } from 'lucide-react';
import { recentRequests, recentOffers, users } from '@/lib/data';
import { AppHeader } from '@/components/app-header';

export default function HomePage() {
  const activities = [...recentRequests, ...recentOffers].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getUser = (userId: string) => users.find(u => u.id === userId);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to Neighborly
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Your local community support and resource finder. Connect with your neighbors to give and receive help.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/request-help">
                      Request Help
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/offer-help">
                      Offer Help
                    </Link>
                  </Button>
                </div>
              </div>
               <img
                src="https://picsum.photos/seed/welcome/600/400"
                width="600"
                height="400"
                alt="Community"
                data-ai-hint="community people"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <Card>
                    <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                        See what's happening in your community.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Activity</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="hidden md:table-cell">User</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {activities.slice(0, 5).map(activity => {
                            const user = getUser(activity.userId);
                            const isRequest = 'status' in activity;
                            return (
                            <TableRow key={activity.id}>
                                <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    {isRequest ? (
                                    <Badge variant="secondary">Request</Badge>
                                    ) : (
                                    <Badge variant="outline">Offer</Badge>
                                    )}
                                    <span className="truncate">{activity.description.substring(0, 40)}...</span>
                                </div>
                                </TableCell>
                                <TableCell>{activity.type}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.avatarUrl} alt={user?.name} data-ai-hint="person portrait" />
                                    <AvatarFallback>
                                        {user?.name.charAt(0)}
                                    </AvatarFallback>
                                    </Avatar>
                                    <span>{user?.name}</span>
                                </div>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                {new Date(activity.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Neighborly. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
