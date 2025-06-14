'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@hive/ui/components/button';
import Link from 'next/link';

type VerificationState = 'verifying' | 'success' | 'error' | 'expired';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<VerificationState>('verifying');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyMagicLink = async () => {
      try {
        // Get the current URL for verification
        const currentUrl = window.location.href;
        const schoolId = searchParams.get('schoolId');

        if (!schoolId) {
          setState('error');
          setError('Missing school information');
          return;
        }

        const response = await fetch('/api/auth/verify-magic-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: currentUrl,
            schoolId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 400 && data.error?.includes('expired')) {
            setState('expired');
          } else {
            setState('error');
            setError(data.error || 'Verification failed');
          }
          return;
        }

        setState('success');
        
        // Redirect based on user status
        setTimeout(() => {
          if (data.isNewUser) {
            router.push('/onboarding');
          } else {
            router.push('/');
          }
        }, 2000);

      } catch (err) {
        console.error('Verification error:', err);
        setState('error');
        setError('Something went wrong during verification');
      }
    };

    verifyMagicLink();
  }, [searchParams, router]);

  const getStateContent = () => {
    switch (state) {
      case 'verifying':
        return {
          icon: <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />,
          title: 'Verifying your magic link...',
          description: 'Please wait while we sign you in.',
          showRetry: false,
        };

      case 'success':
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          title: 'Welcome to HIVE!',
          description: 'You&apos;re successfully signed in. Redirecting you now...',
          showRetry: false,
        };

      case 'expired':
        return {
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          title: 'Link expired',
          description: 'This magic link has expired. Please request a new one.',
          showRetry: true,
        };

      case 'error':
        return {
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          title: 'Verification failed',
          description: error || 'Something went wrong. Please try again.',
          showRetry: true,
        };

      default:
        return {
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          title: 'Unknown error',
          description: 'Please try again.',
          showRetry: true,
        };
    }
  };

  const content = getStateContent();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
            {content.icon}
          </div>
          <CardTitle className="text-white">{content.title}</CardTitle>
          <CardDescription className="text-zinc-400">
            {content.description}
          </CardDescription>
        </CardHeader>
        
        {content.showRetry && (
          <CardContent className="text-center space-y-4">
            <Link href="/welcome">
              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              >
                Try again
              </Button>
            </Link>
            <p className="text-xs text-zinc-600">
              Need help? Contact support
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
} 