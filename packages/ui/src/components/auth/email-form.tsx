'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { cn } from '../../lib/utils';
import { LoadingSpinner } from '../loading-spinner';

const emailFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

interface EmailFormProps {
  onSubmit: (data: EmailFormValues) => void;
  isLoading?: boolean;
  apiError?: string | null;
  className?: string;
}

export const EmailForm = ({
  onSubmit,
  isLoading = false,
  apiError = null,
  className,
}: EmailFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('grid gap-4', className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email')}
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" disabled={!isValid || isLoading}>
        {isLoading && <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />}
        Continue
      </Button>
      {apiError && (
        <p className="text-sm text-center text-red-500">{apiError}</p>
      )}
    </form>
  );
}; 