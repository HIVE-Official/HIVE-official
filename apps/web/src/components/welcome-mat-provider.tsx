'use client';

import { useEffect } from 'react';
import { useAuth } from '@hive/hooks';
import { WelcomeMat, useWelcomeMat } from '@hive/ui';

interface WelcomeMatProviderProps {
  children: React.ReactNode;
}

export const WelcomeMatProvider = ({ children }: WelcomeMatProviderProps) => {
  const { user, isLoading } = useAuth();
  const { isVisible, dismissWelcomeMat, hasCheckedStorage } = useWelcomeMat();

  // Only show welcome mat for authenticated users who have completed onboarding
  const shouldShowWelcomeMat = 
    !isLoading && 
    user && 
    user.onboardingCompleted && 
    hasCheckedStorage && 
    isVisible;

  return (
    <>
      {children}
      {shouldShowWelcomeMat && (
        <WelcomeMat
          isVisible={true}
          onDismiss={dismissWelcomeMat}
          userName={user.fullName}
        />
      )}
    </>
  );
}; 