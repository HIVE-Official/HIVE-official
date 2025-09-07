'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@hive/hooks';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
  redirectTo?: string;
}

/**
 * Auth guard component that uses global auth store
 * Protects routes and handles authentication redirects
 */
export function AuthGuard({ 
  children, 
  requireOnboarding = false,
  redirectTo = '/auth/login'
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, profile } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated) {
        const returnUrl = encodeURIComponent(pathname);
        router.push(`${redirectTo}?returnUrl=${returnUrl}`);
        return;
      }

      // Authenticated but needs onboarding
      if (requireOnboarding && profile && !profile.onboardingCompleted) {
        router.push('/onboarding');
        return;
      }

      // Authenticated but hasn't completed onboarding (and it's required)
      if (!requireOnboarding && profile && !profile.onboardingCompleted) {
        // Allow access to onboarding pages
        if (!pathname.startsWith('/onboarding')) {
          router.push('/onboarding');
          return;
        }
      }
    }
  }, [isAuthenticated, isLoading, profile, requireOnboarding, router, pathname, redirectTo]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-muted">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-muted">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Needs onboarding
  if (requireOnboarding && profile && !profile.onboardingCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-muted">Redirecting to complete your profile...</p>
        </div>
      </div>
    );
  }

  // All checks passed - render children
  return <>{children}</>;
}

/**
 * Hook to check if user can access a route
 */
export function useAuthGuard(requireOnboarding = false) {
  const { isAuthenticated, isLoading, profile } = useAuthStore();

  const canAccess = 
    !isLoading && 
    isAuthenticated && 
    (!requireOnboarding || (profile && profile.onboardingCompleted));

  return {
    canAccess,
    isLoading,
    isAuthenticated,
    needsOnboarding: isAuthenticated && profile && !profile.onboardingCompleted,
  };
}