'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { HiveAuthFlowEnhanced } from '@/components/auth/HiveAuthFlowEnhanced';
import { ROUTES } from '@/lib/routes';

// Force dynamic rendering to avoid SSG issues with auth
export const dynamic = 'force-dynamic';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get school parameters from URL
  const schoolId = searchParams?.get('schoolId') || 'ub-buffalo';
  const schoolName = searchParams?.get('schoolName') || 'University at Buffalo';
  const schoolDomain = searchParams?.get('domain') || 'buffalo.edu';

  // Handle auth completion
  const handleAuthSuccess = (user: { id: string; email: string; name: string; isNewUser: boolean }) => {
    console.log('🔐 Login successful:', { email: user.email, isNewUser: user.isNewUser });
    
    if (user.isNewUser) {
      // New user needs onboarding
      router.push(ROUTES.ONBOARDING.STEP_1);
    } else {
      // Existing user goes to dashboard
      router.push('/');
    }
  };

  // Redirect if missing required school context
  if (!schoolId || !schoolName || !schoolDomain) {
    router.push('/schools');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 text-accent animate-spin mx-auto" />
          <p className="text-muted">Redirecting to school selection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 text-center p-6">
        <h1 className="text-2xl font-bold">HIVE Development Mode</h1>
        <p className="text-muted-foreground">
          The auth component is not yet implemented. Use debug auth to test the profile slice.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/debug-auth?returnTo=/profile')}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-md"
          >
            Go to Debug Auth
          </button>
          <a 
            href="/debug-auth?returnTo=/profile"
            className="block text-accent hover:underline text-sm"
          >
            Or click here to test the Profile Slice directly
          </a>
        </div>
      </div>
    </div>
  );
}

function LoginPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-accent animate-spin" />
          <span className="text-muted">Loading...</span>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}

export default function LoginPage() {
  return <LoginPageWrapper />;
}