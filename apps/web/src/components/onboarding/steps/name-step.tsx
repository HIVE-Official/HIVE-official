"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { User, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { logger  } from '@/types/core';
import { useHandleAvailability } from '@hive/hooks';

export function OnboardingNameStep() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [handle, setHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Parse existing display name if available
  useEffect(() => {
    if (onboardingData?.displayName) {
      const parts = onboardingData.displayName.split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
    }
    if (onboardingData?.handle) {
      setHandle(onboardingData.handle);
    }
  }, [onboardingData]);

  // Handle availability checking
  const { available: isAvailable, isChecking, error: handleError } = useHandleAvailability(handle);

  // Auto-generate handle from first and last name
  useEffect(() => {
    if (firstName || lastName) {
      const fullName = `${firstName} ${lastName}`.trim();
      const generatedHandle = fullName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);
      setHandle(generatedHandle);
    }
  }, [firstName, lastName]);

  const isFormValid = firstName.trim().length >= 1 &&
                     lastName.trim().length >= 1 &&
                     handle.length >= 3 && 
                     isAvailable && 
                     !isChecking;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setIsLoading(true);
    
    try {
      const displayName = `${firstName.trim()} ${lastName.trim()}`;
      await update({
        displayName,
        handle: handle.toLowerCase()
      });

      logger.info('Name and handle saved:', { displayName, handle });
      router.push('/onboarding/leader');
      
    } catch (error) {
      logger.error('Failed to save name and handle', { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
              <User className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Identity</h1>
          <p className="text-base text-muted-foreground">How should we know you?</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Field */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
              First Name *
            </Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="h-12 text-base bg-input border-border focus:border-accent"
              required
              minLength={1}
              maxLength={50}
              autoFocus
            />
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
              Last Name *
            </Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="h-12 text-base bg-input border-border focus:border-accent"
              required
              minLength={1}
              maxLength={50}
            />
          </div>

          {/* Handle Field */}
          <div className="space-y-2 mt-8">
            <div className="flex items-center justify-between">
              <Label htmlFor="handle" className="text-sm font-medium text-foreground">
                Handle
              </Label>
              <span className="text-xs font-medium text-accent">Auto-generated</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-accent text-base">@</span>
              </div>
              <Input
                id="handle"
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="handle"
                className="h-12 pl-10 text-base text-accent bg-input/50 border-border focus:border-accent"
                disabled
                minLength={3}
                maxLength={20}
                pattern="^[a-z0-9_]{3,20}$"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your handle will be automatically generated from your name
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Back
            </Button>

            <Button
              type="submit"
              size="lg"
              disabled={!isFormValid || isLoading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 