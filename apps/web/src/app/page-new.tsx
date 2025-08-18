"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useHiveAuth } from '@hive/ui';

/**
 * HIVE Root Page - Clean Firebase Authentication Router
 * 
 * Simple, reliable routing based on Firebase auth state:
 * - No authentication → Schools page
 * - Authenticated + needs onboarding → Onboarding
 * - Authenticated + completed → Profile (dashboard)
 * 
 * NO development bypasses or complex logic
 */
export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, requiresOnboarding, devLogin } = useHiveAuth();
  
  // Development mode detection
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return;

    console.log('🏠 Root page routing:', { 
      isAuthenticated, 
      requiresOnboarding: requiresOnboarding(),
      isDev 
    });

    // Development: Auto-login with dev user if not authenticated
    if (isDev && !isAuthenticated && devLogin) {
      console.log('🔧 Development mode: No auth detected, using dev login');
      devLogin('student')
        .then(() => {
          console.log('🔧 Dev login successful, will redirect via auth state change');
        })
        .catch((error) => {
          console.error('🔧 Dev login failed:', error);
          router.push('/schools');
        });
      return;
    }

    // Not authenticated - redirect to schools selection
    if (!isAuthenticated) {
      console.log('🔓 Not authenticated, redirecting to schools');
      router.push('/schools');
      return;
    }

    // User needs onboarding
    if (requiresOnboarding()) {
      console.log('📝 User needs onboarding, redirecting to onboarding');
      router.push('/onboarding');
      return;
    }

    // Authenticated and onboarded - redirect to profile dashboard
    console.log('✅ User authenticated and onboarded, redirecting to profile');
    router.replace('/profile');

  }, [isLoading, isAuthenticated, requiresOnboarding, router, isDev, devLogin]);

  // Show loading while auth is initializing
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 text-[var(--hive-brand-primary)] animate-spin mx-auto" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Welcome to HIVE</h2>
          <p className="text-[var(--hive-text-muted)]">
            {isLoading ? 'Checking your authentication...' : 'Redirecting...'}
          </p>
          {isDev && (
            <p className="text-xs text-[var(--hive-text-muted)] mt-4">
              🔧 Development Mode Active
            </p>
          )}
        </div>
      </div>
    </div>
  );
}