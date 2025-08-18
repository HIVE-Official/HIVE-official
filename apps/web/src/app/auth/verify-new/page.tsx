"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@hive/ui/firebase/client-config';
import { useHiveAuth } from '@hive/ui';

/**
 * HIVE Magic Link Verification Page - Clean Firebase Implementation
 * 
 * Handles magic link verification and Firebase authentication
 * Works with new Firebase Custom Token flow
 */

interface VerificationState {
  status: 'loading' | 'verifying' | 'success' | 'error';
  message: string;
  error?: string;
}

function VerifyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUserData } = useHiveAuth();
  
  const [state, setState] = useState<VerificationState>({
    status: 'loading',
    message: 'Preparing verification...'
  });

  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const schoolId = searchParams.get('schoolId');

  useEffect(() => {
    const verifyMagicLink = async () => {
      if (!token || !email || !schoolId) {
        setState({
          status: 'error',
          message: 'Invalid verification link',
          error: 'Missing required parameters'
        });
        return;
      }

      setState({
        status: 'verifying',
        message: 'Verifying your magic link...'
      });

      try {
        // Step 1: Verify magic link with backend
        const verifyResponse = await fetch('/api/auth/verify-magic-link-new', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email, schoolId })
        });

        if (!verifyResponse.ok) {
          const errorData = await verifyResponse.json();
          throw new Error(errorData.error || 'Magic link verification failed');
        }

        const verifyData = await verifyResponse.json();
        
        setState({
          status: 'verifying',
          message: 'Authenticating with Firebase...'
        });

        // Step 2: Sign in with Firebase using the custom token
        await signInWithCustomToken(auth, verifyData.token);

        setState({
          status: 'verifying',
          message: 'Loading your profile...'
        });

        // Step 3: Refresh user data to get latest profile info
        await refreshUserData();

        setState({
          status: 'success',
          message: verifyData.needsOnboarding 
            ? 'Welcome to HIVE! Let\'s set up your profile.'
            : 'Welcome back to HIVE!'
        });

        // Step 4: Redirect based on onboarding status
        setTimeout(() => {
          if (verifyData.needsOnboarding) {
            router.push('/onboarding');
          } else {
            router.push('/');
          }
        }, 2000);

      } catch (error) {
        console.error('Magic link verification failed:', error);
        
        setState({
          status: 'error',
          message: 'Verification failed',
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    };

    verifyMagicLink();
  }, [token, email, schoolId, router, refreshUserData]);

  const getIcon = () => {
    switch (state.status) {
      case 'loading':
      case 'verifying':
        return <Loader2 className="h-16 w-16 text-[var(--hive-brand-primary)] animate-spin" />;
      case 'success':
        return <CheckCircle className="h-16 w-16 text-[var(--hive-status-success)]" />;
      case 'error':
        return <XCircle className="h-16 w-16 text-[var(--hive-status-error)]" />;
    }
  };

  const getStatusColor = () => {
    switch (state.status) {
      case 'success':
        return 'var(--hive-status-success)';
      case 'error':
        return 'var(--hive-status-error)';
      default:
        return 'var(--hive-brand-primary)';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          {getIcon()}
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
            {state.status === 'error' ? 'Verification Failed' : 'Verifying Your Account'}
          </h1>
          <p 
            className="text-lg"
            style={{ color: getStatusColor() }}
          >
            {state.message}
          </p>
        </div>

        {/* Error details */}
        {state.status === 'error' && state.error && (
          <div className="bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/20 rounded-lg p-4">
            <p className="text-sm text-[var(--hive-status-error)]">
              {state.error}
            </p>
          </div>
        )}

        {/* Loading progress for verification */}
        {state.status === 'verifying' && (
          <div className="space-y-2">
            <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  backgroundColor: 'var(--hive-brand-primary)',
                  width: '75%'
                }}
              />
            </div>
            <p className="text-sm text-[var(--hive-text-muted)]">
              This may take a moment...
            </p>
          </div>
        )}

        {/* Success message */}
        {state.status === 'success' && (
          <div className="space-y-2">
            <div className="w-full bg-[var(--hive-status-success)]/20 rounded-full h-2">
              <div 
                className="w-full h-2 bg-[var(--hive-status-success)] rounded-full"
              />
            </div>
            <p className="text-sm text-[var(--hive-text-muted)]">
              Redirecting you to HIVE...
            </p>
          </div>
        )}

        {/* Manual navigation for errors */}
        {state.status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={() => router.push('/schools')}
              className="w-full bg-[var(--hive-brand-primary)] text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Return to Login
            </button>
            <p className="text-xs text-[var(--hive-text-muted)]">
              Need help? The magic link may have expired or been already used.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-[var(--hive-brand-primary)] animate-spin" />
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  );
}