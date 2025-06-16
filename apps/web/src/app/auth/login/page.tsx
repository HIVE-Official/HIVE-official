'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@hive/ui';
import { Input } from '@hive/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { Label } from '@hive/ui';
import { Alert, AlertDescription } from '@hive/ui';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface LoginFormData {
  email: string;
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const schoolId = searchParams.get('schoolId');
  const schoolName = searchParams.get('schoolName');
  const schoolDomain = searchParams.get('domain');

  const [formData, setFormData] = useState<LoginFormData>({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Redirect if no school context
  if (!schoolId || !schoolName || !schoolDomain) {
    router.push('/welcome');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          schoolId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send magic link');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    setError(null);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-yellow-500" />
            </div>
            <CardTitle className="text-white">Check your inbox</CardTitle>
            <CardDescription className="text-zinc-400">
              We&apos;ve sent a magic link to {formData.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-zinc-500">
              Click the link in your email to sign in. The link will expire in 15 minutes.
            </p>
            <p className="text-xs text-zinc-600">
              Don&apos;t see it? Check your spam folder or try again.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSuccess(false)}
            >
              Send another link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center mb-4">
            <Link href="/welcome">
              <Button variant="ghost" size="sm" className="p-2 text-zinc-400 hover:text-white">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <CardTitle className="text-white">Sign in to HIVE</CardTitle>
          <CardDescription className="text-zinc-400">
            Join {schoolName} on HIVE
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                placeholder={`Enter your @${schoolDomain} address...`}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                required
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />
            </div>

            {error && (
              <Alert className="bg-red-500/10 border-red-500/20">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              disabled={isLoading || !formData.email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending magic link...
                </>
              ) : (
                'Send magic link'
              )}
            </Button>
          </form>

          <p className="text-xs text-zinc-500 mt-4 text-center">
            We&apos;ll send you a secure link to sign in without a password.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 