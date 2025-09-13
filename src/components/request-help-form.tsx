'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, LogIn } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { getHelpRequestSuggestion } from '@/app/actions';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';

const formSchema = z.object({
  requestType: z.string({
    required_error: 'Please select a request type.',
  }),
  details: z.string().min(10, {
    message: 'Details must be at least 10 characters.',
  }),
});

export function RequestHelpForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: '',
    },
  });

  const [state, formAction] = useFormState(getHelpRequestSuggestion, {
    error: null,
    suggestion: null,
  });

  useEffect(() => {
    if (state.suggestion) {
      form.setValue('details', state.suggestion);
    }
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: state.error,
      });
    }
  }, [state, form, toast]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be logged in to post a request.',
      });
      return;
    }
    console.log(values);
    toast({
      title: 'Request Submitted!',
      description: 'Your help request has been posted to the community.',
    });
    form.reset();
  }
  
  function AiButton() {
    const { pending } = useFormStatus();
    return (
       <Button
        type="submit"
        variant="secondary"
        className="w-full"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Bot className="mr-2 h-4 w-4" />
        )}
        Get AI Suggestion
      </Button>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Login to Continue</h3>
        <p className="text-muted-foreground mb-4">You need to be logged in to create a help request.</p>
        <Button asChild>
          <Link href="/login">
            <LogIn className="mr-2" />
            Login or Sign Up
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="requestType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Help</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Errands">Errands</SelectItem>
                  <SelectItem value="Medical Aid">Medical Aid</SelectItem>
                  <SelectItem value="Gardening">Gardening</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little more about what you need help with."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide as much detail as possible so neighbors can understand your needs.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button type="submit" className="w-full">
            Post Request
          </Button>
          <form action={formAction}>
            <input type="hidden" name="requestType" value={form.watch('requestType')} />
            <input type="hidden" name="additionalDetails" value={form.watch('details')} />
            <AiButton/>
          </form>
        </div>
      </form>
    </Form>
  );
}
