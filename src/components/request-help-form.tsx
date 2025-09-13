
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
import { useActionState, useEffect, useTransition } from 'react';
import { getHelpRequestSuggestion, createHelpRequest } from '@/app/actions';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  requestType: z.string({
    required_error: 'Please select a request type.',
  }).min(1, "Please select a request type."),
  details: z.string().min(10, {
    message: 'Details must be at least 10 characters.',
  }),
});

export function RequestHelpForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const [aiState, aiFormAction, isAiPending] = useActionState(getHelpRequestSuggestion, {
    error: null,
    suggestion: null,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestType: '',
      details: '',
    },
  });

  useEffect(() => {
    if (aiState.suggestion) {
      form.setValue('details', aiState.suggestion);
    }
    if (aiState.error) {
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: aiState.error,
      });
    }
  }, [aiState, form, toast]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be logged in to post a request.',
      });
      return;
    }

    startSubmitTransition(async () => {
        const result = await createHelpRequest({ ...values, userId: user.id });
        if (result.error) {
            toast({
                variant: 'destructive',
                title: 'Error submitting request',
                description: result.error,
            });
        } else {
            toast({
                title: 'Request Submitted!',
                description: 'Your help request has been posted to the community.',
            });
            form.reset();
            router.push('/dashboard');
        }
    });
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
              <Select onValueChange={field.onChange} defaultValue={field.value} name="requestType">
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
                You can write your own description or get a suggestion from our AI assistant below.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitPending || isAiPending}>
            {isSubmitPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post Request
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={isSubmitPending || isAiPending}
            onClick={() => {
                const formData = new FormData();
                formData.append('requestType', form.getValues('requestType'));
                formData.append('additionalDetails', form.getValues('details'));
                aiFormAction(formData);
            }}
          >
            {isAiPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            Get AI Suggestion
          </Button>
        </div>
      </form>
    </Form>
  );
}
