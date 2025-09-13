'use client';

import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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
import { HeartHandshake, Loader2, User as UserIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { User } from '@/lib/types';
import { AppHeader } from '@/components/app-header';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<User['role']>('seeker');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  
  const demoEmail = 'demo@user.com';
  const demoPassword = 'demouser';

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

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
      // The useEffect hook will handle the redirect
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

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      // First, try to sign in the demo user.
      await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
    } catch (error: any) {
      // If the user doesn't exist, create them.
      if (error.code === 'auth/user-not-found') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
          const user = userCredential.user;
          
          // Create the user document in Firestore.
          await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            name: 'Demo User',
            email: user.email,
            role: 'both',
            avatarUrl: `https://picsum.photos/seed/demouser/100/100`,
          });

          // Now, sign in again (though createUserWithEmailAndPassword also signs the user in)
          // This is just to be absolutely sure.
          await signInWithEmailAndPassword(auth, demoEmail, demoPassword);

        } catch (creationError: any) {
          toast({
            variant: 'destructive',
            title: 'Demo User Setup Failed',
            description: creationError.message,
          });
          setLoading(false);
          return;
        }
      } else {
        // For other sign-in errors, show the error message.
        toast({
          variant: 'destructive',
          title: 'Authentication Error',
          description: error.message,
        });
        setLoading(false);
        return;
      }
    }
    
    // If sign-in (or creation and sign-in) was successful.
    toast({
        title: 'Signed In as Demo User',
        description: "You're now logged in as a user with the 'Both' role.",
    });

    // The useEffect will handle the redirect, but we can turn off loading.
    setLoading(false);
  }


  if (authLoading || user) {
     return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 font-bold text-2xl text-primary mb-8">
            <HeartHandshake className="size-8" />
            <span className="text-foreground">Neighborly</span>
          </div>
          <Tabs defaultValue="signin" className="w-full" onValueChange={setActiveTab}>
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
                      <RadioGroup defaultValue="seeker" onValueChange={(value: User['role']) => setRole(value)} value={role}>
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

          <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                  </span>
              </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserIcon className="size-5" />
                Demo Mode
              </CardTitle>
               <CardDescription>
                For judging or a quick tour, log in as a pre-configured demo user with the 'Both' role.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full" onClick={handleDemoLogin} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login as Demo User
              </Button>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
