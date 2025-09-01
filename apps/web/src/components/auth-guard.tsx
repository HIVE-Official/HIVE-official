"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUnifiedAuth } from '@hive/ui';
import { useAuthErrorHandler } from './auth/auth-error-boundary';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@hive/ui';

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
  const { reportAuthError } = useAuthErrorHandler();
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Get auth state - hooks must be called unconditionally
  const authState = useUnifiedAuth();
  
  // Handle auth context errors after hook is called
  useEffect(() => {
    if (!authState) {
      setAuthError('Authentication system unavailable');
    }
  }, [authState]);
  
  const { isAuthenticated, isLoading, requiresOnboarding } = authState || { 
    isAuthenticated: false, 
    isLoading: false, 
    requiresOnboarding: () => false 
  };

  useEffect(() => {
    // Reset redirect attempts when pathname changes significantly
    if (redirectAttempts > 0 && !pathname.includes('auth') && !pathname.includes('onboarding')) {
      setRedirectAttempts(0);
    }

    // Don't redirect while auth is loading
    if (isLoading) {
      return;
    }

    // Prevent infinite redirect loops
    if (redirectAttempts >= 3) {
      const error = new Error(`Authentication redirect loop detected. Path: ${pathname}, Attempts: ${redirectAttempts}`);
      setAuthError('Authentication redirect loop detected. Please try refreshing the page.');
      reportAuthError(error, { pathname, redirectAttempts, requireAuth });
      return;
    }

    // If auth is required but user is not authenticated, redirect to login
    if (requireAuth && !isAuthenticated) {
      // Don't redirect if already on auth pages (prevent loop)
      if (pathname.startsWith('/auth') || pathname.startsWith('/schools') || pathname.startsWith('/landing')) {
        return;
      }
      
      setRedirectAttempts(prev => prev + 1);
      // Store the intended destination for post-login redirect
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // If user is authenticated but needs onboarding, redirect to onboarding
    if (isAuthenticated && requiresOnboarding()) {
      // Allow access to onboarding pages
      if (pathname.startsWith('/onboarding')) {
        return;
      }
      
      setRedirectAttempts(prev => prev + 1);
      router.push('/onboarding');
      return;
    }

    // If user is authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated && (pathname.startsWith('/auth') || pathname.startsWith('/schools'))) {
      setRedirectAttempts(prev => prev + 1);
      router.push('/');
      return;
    }
  }, [isLoading, isAuthenticated, requiresOnboarding, pathname, requireAuth, redirectTo, router, redirectAttempts, reportAuthError]);

  // Show auth error state if there's an error
  if (authError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold mb-2">Authentication Error</h2>
          <p className="text-muted-foreground mb-4">{authError}</p>
          <Button 
            onClick={() => {
              setAuthError(null);
              setRedirectAttempts(0);
              window.location.reload();
            }}
            className="mr-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/schools'}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-primary rounded-lg animate-pulse" />
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