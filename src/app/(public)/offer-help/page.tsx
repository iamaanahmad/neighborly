
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OfferList } from '@/components/offer-list';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { LogIn } from 'lucide-react';

export default function OfferHelpPage() {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <h1 className="text-2xl font-bold tracking-tight mb-6">Open Requests</h1>
            <OfferList />
        </div>

        <div>
           {!user && (
            <Card>
              <CardHeader>
                <CardTitle>Want to lend a hand?</CardTitle>
                <CardDescription>
                  Sign up or log in to offer your help to the community and connect with neighbors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/login">
                    <LogIn className="mr-2" />
                    Sign Up to Offer Help
                  </Link>
                </Button>
              </CardContent>
            </Card>
           )}
        </div>
        </div>
    </div>
  );
}
