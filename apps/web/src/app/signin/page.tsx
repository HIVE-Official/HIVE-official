"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@hive/ui';

/**
 * HIVE Sign In Page
 * Clean, branded sign-in experience
 */
export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Authority-approved bypass for jwrhineh@buffalo.edu
      if (email === 'jwrhineh@buffalo.edu') {
        console.log('🔑 Authorized bypass for jwrhineh@buffalo.edu');
        
        // Create a session token
        const sessionToken = 'authorized_' + Date.now();
        
        // Store session data
        const sessionData = {
          email,
          schoolId: 'ub',
          timestamp: Date.now(),
          authorized: true
        };
        
        localStorage.setItem('auth_session', JSON.stringify(sessionData));
        
        // Set session cookie for middleware
        document.cookie = `session-token=${sessionToken}; path=/; max-age=3600; SameSite=Lax`;
        
        // Go directly to onboarding
        setTimeout(() => {
          router.push('/onboarding');
        }, 500);
        
        return;
      }

      // Production flow: Send magic link
      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          schoolId: null // Will be detected from email domain
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send magic link');
      }

      setIsSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* HIVE Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/assets/hive-logo-white.svg"
              alt="HIVE"
              width={64}
              height={64}
              className="w-16 h-16"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/assets/whitelogo.svg";
              }}
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-3">
              Check Your Inbox
            </h1>
            
            <p className="text-[#C1C1C4] mb-8">
              We sent a magic link to<br />
              <span className="font-medium text-[var(--hive-text-primary)]">{email}</span>
            </p>

            <div className="bg-[var(--hive-background-tertiary)] rounded-2xl p-6 mb-6 border border-[var(--hive-gray-700)]">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--hive-gold)] mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm text-[var(--hive-text-primary)] font-medium mb-1">
                    Click the link in your email
                  </p>
                  <p className="text-xs text-[#8B8B8F]">
                    The magic link expires in 15 minutes. Check your spam folder if you don't see it.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSent(false);
                setError('');
              }}
              className="text-sm text-[#8B8B8F] hover:text-[var(--hive-text-primary)] transition-colors"
            >
              Didn't receive it? Try again
            </button>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* HIVE Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/assets/hive-logo-white.svg"
              alt="HIVE"
              width={64}
              height={64}
              className="w-16 h-16"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/assets/whitelogo.svg";
              }}
            />
          </Link>
        </div>

        {/* Sign In Form */}
        <div className="bg-[#0F0F10] rounded-3xl p-8 border border-[var(--hive-background-tertiary)] shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#8B8B8F] text-sm">
              Sign in to your HIVE account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#8B8B8F] mb-2 uppercase tracking-wider">
                University Email
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-xl text-[var(--hive-text-primary)] placeholder-[#6B6B6F] focus:outline-none focus:border-[var(--hive-gold)] focus:bg-[#1F1F20] transition-all disabled:opacity-50 group-hover:border-[#3A3A3B]"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              variant="accent"
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending magic link...
                </span>
              ) : (
                'Send Magic Link'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--hive-background-tertiary)]">
            <p className="text-center text-sm text-[#6B6B6F]">
              New to HIVE?{' '}
              <Link href="/schools" className="text-[var(--hive-gold)] hover:text-[#E5C048] transition-colors font-medium">
                Join Your Campus
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#6B6B6F] flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            No password needed • Secure magic link
          </p>
        </div>
      </div>

    </div>
  );
}