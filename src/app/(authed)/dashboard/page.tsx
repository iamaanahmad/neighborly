
'use client';

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
import { useAuth } from '@/contexts/auth-context';

export default function DashboardPage() {
  const { user } = useAuth();
  const activities = [...recentRequests, ...recentOffers].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getUser = (userId: string) => users.find(u => u.id === userId);

  const canRequestHelp = user?.role === 'seeker' || user?.role === 'both';
  const canOfferHelp = user?.role === 'helper' || user?.role === 'both';

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Hello, {user?.name}!</h1>
          <p className="text-muted-foreground">
            How can you contribute to your community today?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {canRequestHelp && (
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-secondary">
                    <HandHelping className="size-6 text-secondary-foreground" />
                  </div>
                  <CardTitle>Need a Hand?</CardTitle>
                </div>
                <CardDescription className="pt-2">
                  Post a request for help and let your neighbors assist you.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild className="w-full">
                  <Link href="/request-help">
                    Request Help <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          {canOfferHelp && (
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-secondary">
                    <HeartHandshake className="size-6 text-secondary-foreground" />
                  </div>
                  <CardTitle>Lend a Hand?</CardTitle>
                </div>
                <CardDescription className="pt-2">
                  Browse requests and offer your support to a neighbor in need.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild className="w-full">
                  <Link href="/offer-help">
                    Offer Help <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

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
                  const activityUser = getUser(activity.userId);
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
                            <AvatarImage src={activityUser?.avatarUrl} alt={activityUser?.name} data-ai-hint="person portrait" />
                            <AvatarFallback>
                              {activityUser?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{activityUser?.name}</span>
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
    </div>
  );
}
