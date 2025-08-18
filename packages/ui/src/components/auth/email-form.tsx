'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { cn } from '../lib/utils';
import { LoadingSpinner } from '../loading-spinner';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';

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

  const { variants: _variants } = useAdaptiveMotion('academic');

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className={cn('grid gap-4', className)}
      variants={hiveVariants.container}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="grid gap-2" variants={hiveVariants.item}>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email')}
          id="email"
          placeholder="name@example.com"
          type="email"
          variant="accent"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          aria-invalid={!!errors.email}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p 
              className="text-sm text-muted"
              variants={hiveVariants.slideDown}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.div variants={hiveVariants.item}>
        <Button 
          type="submit" 
          disabled={!isValid || isLoading}
          variant="ritual"
          fullWidth
        >
          {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
          Continue
        </Button>
      </motion.div>
      
      <AnimatePresence>
        {apiError && (
          <motion.p 
            className="text-sm text-center text-muted"
            variants={hiveVariants.slideDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {apiError}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}; 