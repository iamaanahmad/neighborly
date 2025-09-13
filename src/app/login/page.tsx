'use client';

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { HeartHandshake, Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { User } from '@/lib/types';

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<User['role']>('seeker');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          name: name || user.email?.split('@')[0] || 'New User',
          email: user.email,
          role: role,
          avatarUrl: `https://picsum.photos/seed/${user.uid}/100/100`,
        });

        toast({
          title: 'Account Created',
          description: "You've been successfully signed up!",
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Signed In',
          description: "You're now logged in.",
        });
      }
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
       <div className="flex items-center gap-2 font-bold text-2xl text-primary mb-8">
          <HeartHandshake className="size-8" />
          <span className="text-foreground">Neighborly</span>
        </div>
      <Tabs defaultValue="signin" className="w-full max-w-sm" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <form onSubmit={handleAuthAction}>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Welcome back! Please enter your details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <Input id="email-signin" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signin">Password</Label>
                <Input id="password-signin" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create an account to join your community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name-signup">Name</Label>
                <Input id="name-signup" type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label>I want to...</Label>
                <RadioGroup defaultValue="seeker" onValueChange={(value: User['role']) => setRole(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seeker" id="r1" />
                    <Label htmlFor="r1">Get help from my community</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="helper" id="r2" />
                    <Label htmlFor="r2">Offer help to my community</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="r3" />
                    <Label htmlFor="r3">Do both!</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
