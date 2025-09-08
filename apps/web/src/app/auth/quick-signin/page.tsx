"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@hive/ui';

/**
 * Quick Sign In Page for returning HIVE users
 * Streamlined authentication for users who already have accounts
 */
export default function QuickSignInPage() {
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
        <div className="text-center max-w-md w-full">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-3">
            Check Your Email
          </h1>
          
          <p className="text-[#C1C1C4] mb-6">
            We've sent a magic link to <span className="font-medium text-[var(--hive-text-primary)]">{email}</span>
          </p>

          <div className="bg-[var(--hive-background-tertiary)] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#8B8B8F]">
              Click the link in your email to sign in to HIVE. The link expires in 15 minutes.
            </p>
          </div>

          <p className="text-sm text-[#6B6B6F]">
            Didn't receive the email?{' '}
            <button
              onClick={() => {
                setIsSent(false);
                setError('');
              }}
              className="text-[var(--hive-gold)] hover:text-[var(--hive-gold)] transition-colors"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex flex-col">
      {/* Header */}
      <div className="border-b border-[var(--hive-background-tertiary)]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-[#8B8B8F] hover:text-[var(--hive-text-primary)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/hive-logo-white.svg"
                alt="HIVE"
                width={32}
                height={32}
                className="w-8 h-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/whitelogo.svg";
                }}
              />
              <span className="text-xl font-bold text-[var(--hive-text-primary)]">HIVE</span>
            </Link>
            
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-3">
              Welcome Back
            </h1>
            <p className="text-[#C1C1C4]">
              Sign in to your HIVE account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#C1C1C4] mb-2">
                Your university email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 pl-11 bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-lg text-[var(--hive-text-primary)] placeholder-[#6B6B6F] focus:outline-none focus:border-[var(--hive-gold)] transition-colors disabled:opacity-50"
                />
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B6B6F]" />
              </div>
              
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="accent"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending magic link...
                </>
              ) : (
                'Send Magic Link'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#8B8B8F]">
              New to HIVE?{' '}
              <Link href="/schools" className="text-[var(--hive-gold)] hover:text-[var(--hive-gold)] transition-colors">
                Join your campus
              </Link>
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-[var(--hive-background-tertiary)]/50 rounded-lg p-4 border border-[var(--hive-gray-700)]">
            <p className="text-xs text-[#6B6B6F] text-center">
              We'll send you a secure link to sign in. No password needed.
            </p>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--hive-gold)] rounded-full blur-[300px] opacity-[0.01]" />
      </div>
    </div>
  );
}