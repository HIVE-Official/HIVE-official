"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { logger } from '@hive/core';

export function OnboardingCompleteStep() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { data: onboardingData, reset } = useOnboardingStore();
  const [completionState, setCompletionState] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const completeOnboarding = async () => {
      if (!user) {
        logger.error("No authenticated user found");
        router.push("/auth/email");
        return;
      }

      if (!onboardingData) {
        logger.error("No onboarding data found");
        router.push("/onboarding/name");
        return;
      }

      try {
        setCompletionState('loading');
        logger.info("Completing onboarding for user:", user.uid);

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
          router.push("/feed");
        }, 3000);

      } catch (error) {
        logger.error("Failed to complete onboarding:", error);
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
        <Card className="w-full max-w-lg bg-card border-border">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-xl font-display text-card-foreground">
              Welcome to HIVE!
            </CardTitle>
            <CardDescription className="text-muted-foreground font-sans">
              Your profile has been created successfully. You&apos;ll be redirected to your feed shortly.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-card-foreground">You&apos;re all set!</h3>
                  <p className="text-sm text-muted-foreground">
                    Start exploring spaces, connecting with peers, and building your campus community.
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="w-full h-12"
              onClick={() => router.push("/feed")}
            >
              Go to Feed Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (completionState === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-card border-border">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-destructive" />
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
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={() => router.push("/onboarding/name")}
              >
                Start Over
              </Button>
              <Button
                className="flex-1 h-12"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
} 