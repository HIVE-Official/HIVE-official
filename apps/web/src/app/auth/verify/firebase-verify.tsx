'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyFirebaseMagicLink } from '@/lib/firebase-email-service';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function FirebaseVerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your magic link...');

  useEffect(() => {
    const verifyLink = async () => {
      try {
        // Get the full URL (which is the email link)
        const emailLink = window.location.href;
        
        // Get email from URL params or localStorage
        const emailFromUrl = searchParams.get('email');
        const emailFromStorage = window.localStorage.getItem('emailForSignIn');
        const email = emailFromUrl || emailFromStorage;

        if (!email) {
          setStatus('error');
          setMessage('Email not found. Please request a new magic link.');
          return;
        }

        // Verify the magic link
        const result = await verifyFirebaseMagicLink(emailLink, email);

        if (result.success) {
          setStatus('success');
          setMessage('Success! Redirecting...');
          
          // Store user info for the app
          if (result.user) {
            localStorage.setItem('hive-user-id', result.user.uid);
            localStorage.setItem('hive-user-email', result.user.email || email);
            localStorage.setItem('hive-id-token', result.user.idToken);
          }

          // Redirect based on whether user is new
          setTimeout(() => {
            if (result.isNewUser) {
              router.push('/onboarding');
            } else {
              router.push('/dashboard');
            }
          }, 1500);
        } else {
          setStatus('error');
          setMessage(result.error || 'Failed to verify magic link');
        }
      } catch (error) {

        setStatus('error');
        setMessage('An unexpected error occurred');
      }
    };

    verifyLink();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
              <h2 className="mt-6 text-2xl font-bold text-foreground">
                Verifying your magic link
              </h2>
              <p className="mt-2 text-muted">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="mt-6 text-2xl font-bold text-foreground">
                Verification successful!
              </h2>
              <p className="mt-2 text-muted">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="mt-6 text-2xl font-bold text-foreground">
                Verification failed
              </h2>
              <p className="mt-2 text-muted">{message}</p>
              <button
                onClick={() => router.push('/auth')}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}