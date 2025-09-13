
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import type { HelpRequest, User } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

type RequestWithUser = HelpRequest & { user: User | null };

export function OfferList() {
  const [requests, setRequests] = useState<RequestWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'requests'), where('status', '==', 'open'));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      setLoading(true);
      const requestsData: RequestWithUser[] = await Promise.all(
        querySnapshot.docs.map(async (requestDoc) => {
          const requestData = requestDoc.data() as HelpRequest;
          let userData: User | null = null;
          
          // Prevent showing user's own requests
          if (currentUser && requestData.userId === currentUser.id) {
            return null;
          }

          if (requestData.userId) {
            const userDoc = await getDoc(doc(db, 'users', requestData.userId));
            if (userDoc.exists()) {
              userData = userDoc.data() as User;
            }
          }
          return { ...requestData, id: requestDoc.id, user: userData };
        })
      );
      
      // Filter out null values (user's own requests)
      setRequests(requestsData.filter(Boolean) as RequestWithUser[]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleOfferHelp = (requestId: string) => {
    if (!currentUser) {
        router.push('/login');
        return;
    }
    // For now, let's navigate to messages. Later this would initiate a chat.
    router.push(`/messages?requestId=${requestId}`);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/50 h-64">
        <h3 className="text-lg font-semibold mb-2">No Open Requests</h3>
        <p className="text-muted-foreground">It looks like there are no open requests from your neighbors right now. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {requests.map(request => {
        const user = request.user;
        const createdAt = typeof request.createdAt === 'string' 
            ? new Date(request.createdAt)
            : new Date(request.createdAt.seconds * 1000);

        return (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{request.type}</CardTitle>
                  <CardDescription>
                    Posted by {user?.name ?? 'Anonymous'} on{' '}
                    {createdAt.toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{request.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt={user?.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{user?.name?.charAt(0) ?? 'A'}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">{request.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleOfferHelp(request.id)}>
                Offer to Help
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
