"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@hive/auth-logic';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * Authentication guard that protects routes and handles authentication redirects.
 * Uses UnifiedAuth context for consistent authentication state.
 */
export function AuthGuard({ 
  children, 
  requireAuth = true,
  redirectTo = '/schools' 
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    // Don't redirect while auth is loading
    if (isLoading) {
      return;
    }

    // If auth is required but user is not authenticated, redirect to login
    if (requireAuth && !isAuthenticated) {
      // Store the intended destination for post-login redirect
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // If user is authenticated but needs onboarding, redirect to onboarding
    if (isAuthenticated && user && !user.onboardingCompleted) {
      // Allow access to onboarding pages
      if (pathname.startsWith('/onboarding')) {
        return;
      }
      
      router.push('/onboarding');
      return;
    }

    // If user is authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated && (pathname.startsWith('/auth') || pathname.startsWith('/schools'))) {
      router.push('/');
      return;
    }

  }, [isLoading, isAuthenticated, user, pathname, requireAuth, redirectTo, router]);

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-[var(--hive-text-primary)]">
          <div className="w-6 h-6 bg-[var(--hive-brand-primary)] rounded-lg animate-pulse" />
          <span className="font-medium">Loading HIVE...</span>
        </div>
      </div>
    );
  }

  // For protected routes, only render if authenticated
  if (requireAuth && !isAuthenticated) {
    return null; // Redirect is handled in useEffect
  }

  return <>{children}</>;
}