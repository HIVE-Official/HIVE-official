'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthStore, useAuthOperations } from '@hive/hooks';
import { auth, db } from '@/lib/firebase';
import { ROUTES } from '@/lib/routes';
import { Button, Input, Card } from '@hive/ui';

// Force dynamic rendering
export const runtime = 'edge';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  
  // Global auth state
  const { user, profile, isAuthenticated, isLoading, error } = useAuthStore();
  const { login } = useAuthOperations(auth, db);
  
  // Get school parameters from URL
  const schoolId = searchParams?.get('schoolId') || 'ub-buffalo';
  const schoolName = searchParams?.get('schoolName') || 'University at Buffalo';
  const schoolDomain = searchParams?.get('domain') || 'buffalo.edu';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && profile) {
      if (profile.onboardingCompleted) {
        router.push('/');
      } else {
        router.push(ROUTES.ONBOARDING.STEP_1);
      }
    }
  }, [isAuthenticated, profile, router]);

  // Handle email submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.endsWith(`@${schoolDomain}`)) {
      useAuthStore.getState().setError(`Please use your ${schoolName} email address`);
      return;
    }

    try {
      await login(email);
      setEmailSent(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-accent animate-spin" />
          <span className="text-muted">Checking authentication...</span>
        </div>
      </div>
    );
  }

  // Email sent confirmation
  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">📧</span>
          </div>
          <h1 className="text-2xl font-bold">Check your email!</h1>
          <p className="text-muted">
            We've sent a magic link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-muted">
            Click the link in the email to sign in. The link will expire in 60 minutes.
          </p>
          <Button
            onClick={() => {
              setEmailSent(false);
              setEmail('');
            }}
            variant="outline"
            className="w-full"
          >
            Use a different email
          </Button>
        </Card>
      </div>
    );
  }

  // Login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
            HIVE
          </h1>
          <p className="text-muted">Sign in to {schoolName}</p>
        </div>

        {/* Login Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                School Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder={`yourname@${schoolDomain}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Magic Link'
              )}
            </Button>

            {/* Dev Mode */}
            {process.env.NODE_ENV === 'development' && (
              <div className="pt-4 border-t space-y-2">
                <p className="text-xs text-muted text-center">Development Mode</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setEmail('test@buffalo.edu')}
                >
                  Use Test Email
                </Button>
              </div>
            )}
          </form>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted">
          Don't have access? <a href="/waitlist" className="text-accent hover:underline">Join the waitlist</a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-accent animate-spin" />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}