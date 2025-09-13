
'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, HandHelping, CircleDot, CheckCircle2, Hourglass } from 'lucide-react';
import type { User, HelpRequest } from '@/lib/types';

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersUnsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => doc.data() as User));
      setLoading(false);
    });

    const requestsUnsub = onSnapshot(collection(db, 'requests'), (snapshot) => {
      setRequests(snapshot.docs.map(doc => doc.data() as HelpRequest));
      setLoading(false);
    });

    return () => {
      usersUnsub();
      requestsUnsub();
    };
  }, []);

  const userRoleCounts = users.reduce(
    (acc, user) => {
      if (user.role === 'seeker') acc.seekers++;
      if (user.role === 'helper') acc.helpers++;
      if (user.role === 'both') acc.both++;
      return acc;
    },
    { seekers: 0, helpers: 0, both: 0 }
  );

  const requestStatusCounts = requests.reduce(
    (acc, request) => {
      if (request.status === 'open') acc.open++;
      if (request.status === 'in-progress') acc.inProgress++;
      if (request.status === 'closed') acc.closed++;
      return acc;
    },
    { open: 0, inProgress: 0, closed: 0 }
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
         <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
         </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Insights</h1>
          <p className="text-muted-foreground">
            A high-level overview of community activity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                members in the community
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <HandHelping className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.length}</div>
              <p className="text-xs text-muted-foreground">
                help requests created
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>User Role Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="font-medium">Seekers</span>
                        <span className="font-bold text-lg">{userRoleCounts.seekers}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-medium">Helpers</span>
                        <span className="font-bold text-lg">{userRoleCounts.helpers}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-medium">Both</span>
                        <span className="font-bold text-lg">{userRoleCounts.both}</span>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Request Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <CircleDot className="text-primary" />
                            <span className="font-medium">Open</span>
                        </div>
                        <span className="font-bold text-lg">{requestStatusCounts.open}</span>
                    </div>
                     <div className="flex justify-between items-center">
                         <div className="flex items-center gap-2">
                            <Hourglass className="text-yellow-500" />
                            <span className="font-medium">In Progress</span>
                        </div>
                        <span className="font-bold text-lg">{requestStatusCounts.inProgress}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-green-500" />
                            <span className="font-medium">Closed</span>
                        </div>
                        <span className="font-bold text-lg">{requestStatusCounts.closed}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
