import { recentRequests, users } from '@/lib/data';
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

export function OfferList() {
  const getUser = (userId: string) => users.find(u => u.id === userId);

  return (
    <div className="space-y-4">
      {recentRequests.map(request => {
        const user = getUser(request.userId);
        return (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{request.type}</CardTitle>
                  <CardDescription>
                    Posted by {user?.name} on{' '}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{request.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt={user?.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">{request.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Offer to Help</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
