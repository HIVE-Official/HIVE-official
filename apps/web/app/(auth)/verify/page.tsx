'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

const verifyMagicLink = httpsCallable(getFunctions(), 'verifyMagicLink');

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);

  const handleVerification = useCallback(async () => {
    const token = searchParams.get('token');
    const redirectTo = searchParams.get('redirect_to') || '/feed';

    if (!token) {
      router.push('/auth/expired');
      return;
    }

    try {
      const result = await verifyMagicLink({ token });
      const { success, customToken, isOnboarded } = result.data as any;

      if (success) {
        const auth = getAuth();
        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken();
        
        Cookies.set('firebaseIdToken', idToken, { expires: 7, secure: true, sameSite: 'strict' });
        
        setStatus('success');

        if (isOnboarded) {
          router.push(redirectTo);
        } else {
          router.push('/auth/onboarding');
        }
      } else {
        throw new Error('Verification failed');
      }
    } catch (err: any) {
      console.error("Verification failed:", err);
      setError(err.message || 'An unknown error occurred.');
      setStatus('error');
      setTimeout(() => router.push('/auth/expired'), 3000);
    }
  }, [searchParams, router]);

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      {status === 'verifying' && (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-accent-gold mb-4" />
          <p className="text-lg text-primary">Verifying your link...</p>
        </>
      )}
      {status === 'success' && (
        <>
          <p className="text-lg text-primary">Success! Redirecting...</p>
        </>
      )}
       {status === 'error' && (
        <>
          <p className="text-lg text-destructive">Verification Failed</p>
          <p className="text-muted">{error}</p>
          <p className="text-sm text-muted mt-4">Redirecting you to login...</p>
        </>
      )}
    </div>
  );
} 