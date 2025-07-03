"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Label } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { logger } from '@hive/core';
import { useHandleAvailability } from '@/hooks/use-handle-availability';

export function OnboardingNameStep() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  
  const [displayName, setDisplayName] = useState(onboardingData?.displayName || '');
  const [handle, setHandle] = useState(onboardingData?.handle || '');
  const [isLoading, setIsLoading] = useState(false);

  // Handle availability checking
  const { available: isAvailable, isChecking, error: handleError } = useHandleAvailability(handle);

  // Auto-generate handle from display name
  useEffect(() => {
    if (displayName && !handle) {
      const generatedHandle = displayName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '')
        .substring(0, 20);
      setHandle(generatedHandle);
    }
  }, [displayName, handle]);

  const isFormValid = displayName.trim().length >= 2 &&
                     handle.length >= 3 && 
                     isAvailable && 
                     !isChecking;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setIsLoading(true);
    
    try {
      await update({
        displayName: displayName.trim(),
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

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <User className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-xl font-display text-card-foreground">
            Create Your Profile
          </CardTitle>
          <CardDescription className="text-muted-foreground font-sans">
            Choose your display name and unique handle
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div className="space-y-3">
              <Label htmlFor="displayName" className="text-sm font-medium text-card-foreground">
                Display Name
              </Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
                required
                minLength={2}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground">
                This is how others will see your name on HIVE
              </p>
            </div>

            {/* Handle */}
            <div className="space-y-3">
              <Label htmlFor="handle" className="text-sm font-medium text-card-foreground">
                Username
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-muted-foreground text-sm">@</span>
                </div>
                <Input
                  id="handle"
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="your_username"
                  className="pl-8"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="^[a-z0-9_]{3,20}$"
                />
                
                {/* Handle validation indicator */}
                {handle.length >= 3 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {isChecking ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : isAvailable ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Handle feedback */}
              {handle.length >= 3 && (
                <div className="text-xs">
                  {isChecking ? (
                    <span className="text-muted-foreground">Checking availability...</span>
                  ) : isAvailable ? (
                    <span className="text-green-600">✓ Username is available</span>
                  ) : handleError ? (
                    <span className="text-red-600">✗ {handleError}</span>
                  ) : (
                    <span className="text-red-600">✗ Username is not available</span>
                  )}
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                3-20 characters, letters, numbers, and underscores only
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Next'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 