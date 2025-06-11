'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Label } from '../label/Label';
import { useToast } from '../toast/use-toast';
import { cn } from '@/lib/utils';

const functions = getFunctions();
const sendMagicLink = httpsCallable(functions, 'sendMagicLink');

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await sendMagicLink({ email: data.email });
      if (result.data.success) {
        toast({
          title: 'Magic Link Sent!',
          description: 'Check your email for a link to sign in.',
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Magic Link'}
          </Button>
        </div>
      </form>
    </div>
  );
} 