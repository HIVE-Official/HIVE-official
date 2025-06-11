'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { useUser } from '@/hooks/useUser';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Label } from '../label/Label';
import { useToast } from '../toast/use-toast';
import { cn } from '@/lib/utils';
import { UserSchema } from '../../../../../schemas/user.schema';

const db = getFirestore();

// We only need a subset of the UserSchema for the onboarding form
const formSchema = UserSchema.pick({
  handle: true,
  major: true,
  year: true,
  residentialStatus: true,
  agreements: true,
});

type FormData = z.infer<typeof formSchema>;

export function OnboardingWizard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({ title: 'Error', description: 'You must be logged in.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        ...data,
        onboardingStatus: 'completed',
        updatedAt: new Date(),
      });
      toast({ title: 'Profile Updated!', description: 'Welcome to HIVE!' });
      // The parent page will handle the redirect
    } catch (error: any) {
      console.error(error);
      toast({ title: 'Error', description: error.message || 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    const fields: (keyof FormData)[] = step === 1 ? ['handle'] : ['major', 'year', 'residentialStatus'];
    const isValid = await trigger(fields);
    if (isValid) {
      setStep(step + 1);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div className="grid gap-4">
            {/* Step 1: Handle */}
            <div className="grid gap-1">
              <Label htmlFor="handle">Choose a unique handle</Label>
              <Input id="handle" {...register('handle')} />
              {errors.handle && <p className="text-sm text-destructive">{errors.handle.message}</p>}
            </div>
            <Button type="button" onClick={nextStep}>Next</Button>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            {/* Step 2: Profile Info */}
            <div className="grid gap-1">
              <Label htmlFor="major">Major</Label>
              <Input id="major" {...register('major')} />
            </div>
            {/* ... other fields like year, residentialStatus with appropriate inputs (e.g., Select) */}
            <Button type="button" onClick={nextStep}>Next</Button>
          </div>
        )}

        {step === 3 && (
            <div className="grid gap-4">
                {/* Step 3: Agreements */}
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="termsOfService" {...register('agreements.termsOfService')} />
                    <Label htmlFor="termsOfService">I agree to the Terms of Service</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="privacyPolicy" {...register('agreements.privacyPolicy')} />
                    <Label htmlFor="privacyPolicy">I agree to the Privacy Policy</Label>
                </div>
                {errors.agreements && <p className="text-sm text-destructive">You must agree to both policies.</p>}
                <Button disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Finish Setup'}
                </Button>
            </div>
        )}
      </form>
    </div>
  );
} 