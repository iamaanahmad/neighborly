
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
import { formatDistanceToNow } from 'date-fns';
import { HandHelping, HeartHandshake } from 'lucide-react';

type RequestWithUser = HelpRequest & { user: User | null };

export function OfferList() {
  const [requests, setRequests] = useState<RequestWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) {
        // Wait until auth state is confirmed before fetching data
        return;
    }
    
    const q = query(collection(db, 'requests'), where('status', '==', 'open'));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      setLoading(true);
      const requestsData: RequestWithUser[] = await Promise.all(
        querySnapshot.docs.map(async (requestDoc) => {
          const requestData = requestDoc.data() as HelpRequest;
          let userData: User | null = null;
          
          if (currentUser && requestData.userId === currentUser.id) {
            return null; // Don't show users their own requests
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
      
      setRequests(requestsData.filter(Boolean) as RequestWithUser[]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, authLoading]);

  const handleOfferHelp = (request: RequestWithUser) => {
    if (!currentUser) {
        router.push('/login');
        return;
    }
    
    if (!request.user) return;

    const queryParams = new URLSearchParams({
      requestId: request.id,
      seekerId: request.userId,
      seekerName: request.user.name,
      seekerAvatar: request.user.avatarUrl || '',
      requestDescription: request.description
    });
    
    router.push(`/messages?${queryParams.toString()}`);
  }

  if (loading || authLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-1/2" />
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
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-muted/50 min-h-[400px]">
        <div className="p-4 rounded-full bg-primary/10 mb-4">
            <HandHelping className="size-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Open Requests</h3>
        <p className="text-muted-foreground max-w-sm">
            It looks like all neighbors are taken care of for now. Check back soon to lend a hand!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {requests.map(request => {
        const user = request.user;
        const createdAt = request.createdAt?.toDate ? request.createdAt.toDate() : new Date();

        return (
          <Card key={request.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <div className='flex-grow'>
                  <CardTitle className="text-lg">{request.type}</CardTitle>
                  <CardDescription>
                    Posted by {user?.name ?? 'Anonymous'}{' '}
                    <span className="hidden sm:inline">- {formatDistanceToNow(createdAt, { addSuffix: true })}</span>
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="capitalize">{request.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt={user?.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{user?.name?.charAt(0)?.toUpperCase() ?? 'A'}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground mt-1">{request.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleOfferHelp(request)}>
                <HeartHandshake className="mr-2" />
                Offer to Help
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
