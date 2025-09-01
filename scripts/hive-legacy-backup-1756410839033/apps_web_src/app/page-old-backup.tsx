"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useUnifiedAuth } from '@hive/ui';

/**
 * Root page - Clean authentication router (no longer tries to be dashboard)
 * Handles routing logic: unauthenticated → schools, authenticated → profile (command center)
 */
export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, requiresOnboarding, devLogin } = useUnifiedAuth();
  
  // Development mode detection
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return;

    // Development mode: create dev session if none exists
    if (isDev && !isAuthenticated) {
      console.log('🛠️ Dev mode: Creating dev session');
      devLogin().then(() => {
        router.replace('/profile');
      }).catch(() => {
        router.push('/schools');
      });
      return;
    }

    // Not authenticated - redirect to schools selection
    if (!isAuthenticated) {
      router.push('/schools');
      return;
    }

    // User needs onboarding
    if (requiresOnboarding()) {
      console.log('🔄 Redirecting to onboarding');
      router.push('/onboarding');
      return;
    }

    // Authenticated and onboarded - redirect to profile
    console.log('✅ Authenticated user, redirecting to profile');
    router.replace('/profile');

  }, [isLoading, isAuthenticated, requiresOnboarding, router, isDev, devLogin]);

  // Show loading while auth is initializing
  return (
    <div className="min-h-screen bg-void-900 text-[var(--hive-text-inverse)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 text-[var(--hive-brand-secondary)]-500 animate-spin mx-auto" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Welcome to HIVE</h2>
          <p className="text-neutral-400">
            {isLoading ? 'Checking your authentication...' : 'Redirecting...'}
          </p>
          {isDev && (
            <p className="text-xs text-neutral-500 mt-4">
              🛠️ Dev Mode: UnifiedAuth routing
            </p>
          )}
        </div>
      </div>
    </div>
  );
}