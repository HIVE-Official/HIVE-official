'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@hive/ui';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('No verification token provided');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verify-magic-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        setStatus('success');
        
        // Redirect based on user status
        setTimeout(() => {
          if (data.needsOnboarding) {
            router.push('/onboarding');
          } else {
            router.push('/');
          }
        }, 2000);

      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <div className="mx-auto w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
              </div>
              <CardTitle className="text-white">Verifying...</CardTitle>
              <CardDescription className="text-zinc-400">
                Please wait while we verify your magic link
              </CardDescription>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-white">Welcome to HIVE!</CardTitle>
              <CardDescription className="text-zinc-400">
                You&apos;ve been successfully signed in
              </CardDescription>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <CardTitle className="text-white">Verification Failed</CardTitle>
              <CardDescription className="text-zinc-400">
                {error || 'Unable to verify your magic link'}
              </CardDescription>
            </>
          )}
        </CardHeader>
        
        {status === 'success' && (
          <CardContent className="text-center">
            <p className="text-sm text-zinc-500">
              Redirecting you to HIVE...
            </p>
          </CardContent>
        )}
        
        {status === 'error' && (
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-zinc-500">
              The link may have expired or been used already.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/welcome')}
            >
              Try again
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
} 