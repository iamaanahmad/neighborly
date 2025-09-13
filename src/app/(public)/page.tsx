
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
import Image from 'next/image';
import { HandHelping, FileSearch, MessagesSquare, ShieldCheck, Bot } from 'lucide-react';
import { requests as mockRequests, users as mockUsers } from '@/lib/data';
import type { HelpRequest, User } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

type RequestWithUser = HelpRequest & { user?: User };

// Using mock data for the public homepage
const recentActivity: RequestWithUser[] = mockRequests
  .filter(r => r.status === 'open')
  .slice(0, 5)
  .map(request => ({
    ...request,
    user: mockUsers.find(u => u.id === request.userId)
  }));


export default function HomePage() {
  return (
    <>
      <section className="w-full py-20 md:py-28 lg:py-36 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-6xl/none">
                  Get and Give Help in Your Community — Powered by AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Seekers can ask for help, Helpers can offer assistance, and Gemini AI makes it simple to connect.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/request-help">Sign Up to Request Help</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/offer-help">Sign Up to Offer Help</Link>
                </Button>
              </div>
            </div>
            <Image
              src="/image.png"
              width="600"
              height="400"
              alt="Community helping hands"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              priority
              data-ai-hint="community people"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Connecting with your community is easy. Here’s how you can get started in just three simple steps.
                </p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 sm:grid-cols-3">
                <div className="grid gap-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <HandHelping className="h-8 w-8" />
                    </div>
                    <div className="grid gap-1">
                        <h3 className="text-lg font-bold">1. Sign Up</h3>
                        <p className="text-sm text-muted-foreground">
                            Choose your role as a Seeker, a Helper, or both to join the community.
                        </p>
                    </div>
                </div>
                <div className="grid gap-4 text-center">
                     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FileSearch className="h-8 w-8" />
                    </div>
                    <div className="grid gap-1">
                        <h3 className="text-lg font-bold">2. Post or Browse</h3>
                        <p className="text-sm text-muted-foreground">
                           Create a request for assistance or browse requests from your neighbors.
                        </p>
                    </div>
                </div>
                <div className="grid gap-4 text-center">
                     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MessagesSquare className="h-8 w-8" />
                    </div>
                    <div className="grid gap-1">
                        <h3 className="text-lg font-bold">3. Connect Securely</h3>
                        <p className="text-sm text-muted-foreground">
                            Use our secure chat to coordinate details and get the help you need.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">AI in Action</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">AI-Powered Assistance</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our app uses Gemini to make communication clearer and faster. AI helps you write effective help requests and suggests polite replies, so you can focus on what matters: helping each other.
              </p>
            </div>
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bot className="text-primary"/> AI Assistant</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">User's rough draft:</p>
                        <p className="p-3 rounded-md bg-muted text-sm">"need groceries"</p>
                        <p className="text-sm text-muted-foreground">AI's suggested post:</p>
                        <p className="p-3 rounded-md border border-primary/20 bg-primary/10 text-sm">"I'm in need of some essential groceries this week. Any help picking them up would be greatly appreciated!"</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Live Community Activity</CardTitle>
              <CardDescription>
                See what's happening in your community right now.
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
                {recentActivity.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">
                        No recent activity in the community.
                        </TableCell>
                    </TableRow>
                ) : (
                  recentActivity.map(activity => {
                    const activityUser = activity.user;
                    const createdAt = new Date(activity.createdAt);

                    return (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                              <Badge variant="secondary">Request</Badge>
                            <span className="truncate">
                              {activity.description.substring(0, 40)}...
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={activityUser?.avatarUrl}
                                alt={activityUser?.name}
                              />
                              <AvatarFallback>
                                {activityUser?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{activityUser?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                            {formatDistanceToNow(createdAt, { addSuffix: true })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-primary"/>
                        <span>Trust & Safety</span>
                    </div>
                </div>
                <p className="text-muted-foreground md:text-xl">
                    We moderate all posts with AI to ensure a safe and respectful community environment.
                </p>
            </div>
          </div>
      </section>

      <footer className="border-t bg-muted">
        <div className="container mx-auto flex flex-col gap-4 sm:flex-row py-6 items-center px-4 md:px-6">
             <p className="text-sm text-muted-foreground">
                Made with Firebase Studio and Gemini (Genkit)
              </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="/about"
              >
                About
              </Link>
              <a
                className="text-xs hover:underline underline-offset-4"
                href="https://github.com/iamaanahmad/neighborly"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </a>
               <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Contact
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="/terms"
              >
                Terms
              </Link>
            </nav>
        </div>
      </footer>
    </>
  );
}

    