"use client";

import { useEffect, useState, Suspense } from 'react';
import { logger } from '@hive/core/utils/logger';

import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useFirebaseAuth } from '@/providers/firebase-auth-provider';

/**
 * HIVE Magic Link Verification Page - Clean Firebase Implementation
 * 
 * Handles magic link verification and Firebase authentication
 * Works with new Firebase Custom Token flow
 */

interface VerificationState {
  status: 'loading' | 'verifying' | 'success' | 'error' | 'already-signed-in';
  message: string;
  error?: string;
}

function VerifyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithMagicLink, firebaseUser, requiresOnboarding, signOut } = useFirebaseAuth();
  
  const [state, setState] = useState<VerificationState>({
    status: 'loading',
    message: 'Preparing verification...'
  });

  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const schoolId = searchParams.get('schoolId');

  useEffect(() => {
    const verifyMagicLink = async () => {
      // First check if user is already signed in
      if (firebaseUser) {
        // User is already signed in
        setState({
          status: 'already-signed-in',
          message: 'You are already signed in',
          error: 'Please sign out before using a new magic link'
        });
        
        // Offer to sign out and retry
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            message: 'Signing you out to use the new link...'
          }));
          signOut().then(() => {
            // After sign out, reload the page to retry verification
            window.location.reload();
          });
        }, 2000);
        return;
      }

      if (!token || !email) {
        setState({
          status: 'error',
          message: 'Invalid verification link',
          error: 'Missing required parameters (token or email)'
        });
        return;
      }

      setState({
        status: 'verifying',
        message: 'Verifying your magic link...'
      });

      try {
        // Step 1: Verify magic link and get Firebase Custom Token
        const payload: any = { token, email };
        // Only include schoolId if it exists and isn't "undefined" string
        if (schoolId && schoolId !== 'undefined' && schoolId !== 'null') {
          payload.schoolId = schoolId;
        }
        
        const verifyResponse = await fetch('/api/auth/verify-magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!verifyResponse.ok) {
          const errorData = await verifyResponse.json();
          throw new Error(errorData.error || 'Magic link verification failed');
        }

        const verifyData = await verifyResponse.json();
        
        setState({
          status: 'verifying',
          message: 'Signing you in...'
        });

        // Step 2: Sign in with Firebase custom token using auth context
        try {
          await signInWithMagicLink(verifyData.token);
        } catch (firebaseError: any) {
          logger.error('❌ Firebase sign in failed:', {
            error: firebaseError,
            code: firebaseError?.code,
            message: firebaseError?.message,
            hasToken: !!verifyData.token
          });
          
          // Check if it's a configuration error
          if (firebaseError?.code === 'auth/configuration-not-found') {
            throw new Error('Firebase authentication is not properly configured. Please contact support.');
          }
          
          throw firebaseError;
        }

        // Auth context will handle profile loading automatically
        setState({
          status: 'success',
          message: 'Authentication successful!'
        });

        // Wait for auth context to update, then redirect
        setTimeout(() => {
          // The auth context's requiresOnboarding will determine the redirect
          // AuthGuard will handle the actual redirection
          router.push('/');
        }, 1500);

      } catch (error) {
        logger.error('Magic link verification failed:', error);
        
        setState({
          status: 'error',
          message: 'Verification failed',
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    };

    verifyMagicLink();
  }, [token, email, router, firebaseUser, signOut, signInWithMagicLink]);

  const getIcon = () => {
    switch (state.status) {
      case 'loading':
      case 'verifying':
        return <Loader2 className="h-16 w-16 text-hive-brand-primary animate-spin" />;
      case 'success':
        return <CheckCircle className="h-16 w-16 text-hive-status-success" />;
      case 'error':
        return <XCircle className="h-16 w-16 text-hive-status-error" />;
      case 'already-signed-in':
        return <AlertCircle className="h-16 w-16 text-hive-status-warning" />;
    }
  };

  const getStatusColor = () => {
    switch (state.status) {
      case 'success':
        return 'var(--hive-status-success)';
      case 'error':
        return 'var(--hive-status-error)';
      case 'already-signed-in':
        return 'var(--hive-status-warning)';
      default:
        return 'var(--hive-brand-primary)';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          {getIcon()}
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
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
          <div className="bg-hive-status-error/10 border border-hive-status-error/20 rounded-lg p-4">
            <p className="text-sm text-hive-status-error">
              {state.error}
            </p>
          </div>
        )}

        {/* Loading progress for verification */}
        {state.status === 'verifying' && (
          <div className="space-y-2">
            <div className="w-full bg-hive-background-tertiary rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  backgroundColor: 'var(--hive-brand-primary)',
                  width: '75%'
                }}
              />
            </div>
            <p className="text-sm text-white/80">
              This may take a moment...
            </p>
          </div>
        )}

        {/* Success message */}
        {state.status === 'success' && (
          <div className="space-y-2">
            <div className="w-full bg-hive-status-success/20 rounded-full h-2">
              <div 
                className="w-full h-2 bg-hive-status-success rounded-full"
              />
            </div>
            <p className="text-sm text-white/80">
              Redirecting you to HIVE...
            </p>
          </div>
        )}

        {/* Manual navigation for errors */}
        {state.status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={() => router.push('/schools')}
              className="w-full bg-hive-brand-primary text-hive-background-primary py-3 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Return to Login
            </button>
            <p className="text-xs text-white/80">
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
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-hive-brand-primary animate-spin" />
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  );
}