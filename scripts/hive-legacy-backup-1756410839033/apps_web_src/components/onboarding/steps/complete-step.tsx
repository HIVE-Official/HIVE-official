"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, ButtonEnhanced, OnboardingCompleteStep as OnboardingCompleteStepUI } from '@hive/ui';
import { useUnifiedAuth } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { AlertCircle, Loader2 } from 'lucide-react';
import { logger } from '@hive/core';

export function OnboardingCompleteStep() {
  const router = useRouter();
  const { user, isLoading } = useUnifiedAuth();
  const { data: onboardingData, reset } = useOnboardingStore();
  const [completionState, setCompletionState] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const completeOnboarding = async () => {
      if (!user) {
        logger.error("No authenticated user found");
        router.push(ROUTES.AUTH.SCHOOL_SELECT);
        return;
      }

      if (!onboardingData) {
        logger.error("No onboarding data found");
        router.push(ROUTES.ONBOARDING.STEP_2);
        return;
      }

      try {
        setCompletionState('loading');
        logger.info("Completing onboarding", { userId: user.uid });

        const response = await fetch('/api/auth/complete-onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...onboardingData,
            consentGiven: true, // Ensure consent is marked as given
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to complete onboarding');
        }

        const result = await response.json();
        logger.info("Onboarding completed successfully:", result);

        setCompletionState('success');
        
        // Clear onboarding data from store
        reset();
        
        // Redirect to feed after a brief success display
        setTimeout(() => {
          router.push(ROUTES.APP.FEED);
        }, 3000);

      } catch (error) {
        logger.error("Failed to complete onboarding", { 
          error: error instanceof Error ? error : new Error(String(error))
        });
        setCompletionState('error');
        setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };

    if (!isLoading && user) {
      void completeOnboarding();
    }
  }, [user, isLoading, onboardingData, router, reset]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (completionState === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-display text-card-foreground">
                  Completing your profile...
                </h2>
                <p className="text-muted-foreground">
                  We&apos;re setting up your HIVE account with all your information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (completionState === 'success') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <OnboardingCompleteStepUI onGoToFeed={() => router.push(ROUTES.APP.FEED)} />
      </div>
    );
  }

  if (completionState === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-card border-border">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-surface-01 border border-border rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-muted" />
            </div>
            <CardTitle className="text-xl font-display text-card-foreground">
              Something went wrong
            </CardTitle>
            <CardDescription className="text-muted-foreground font-sans">
              {errorMessage || 'We encountered an error while setting up your profile.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex space-x-3">
              <ButtonEnhanced
                variant="outline"
                className="flex-1 h-12"
                onClick={() => router.push(ROUTES.ONBOARDING.STEP_2)}
              >
                Start Over
              </ButtonEnhanced>
              <ButtonEnhanced
                variant="default"
                className="flex-1 h-12"
                onClick={() => window.location.reload()}
              >
                Try Again
              </ButtonEnhanced>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
} 