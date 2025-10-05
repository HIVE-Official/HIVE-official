'use client';

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
// Temporarily using temp-stubs to avoid SSG useRef errors
// import { Button, Card, HiveLogo, Input, Dialog, DialogContent } from '@hive/ui';
const Button = ({ children, variant = "default", size = "default", className = "", disabled = false, onClick, ...props }: any) => <button className={`px-4 py-2 rounded font-medium transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} ${className}`} disabled={disabled} onClick={onClick} {...props}>{children}</button>;
const Card = ({ children, className = "", ...props }: any) => <div className={`border rounded-lg ${className}`} {...props}>{children}</div>;
const HiveLogo = ({ size = "default", variant = "gradient", showText = false, ...props }: any) => <div className="flex items-center gap-2" {...props}><div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"><span className="text-black font-bold text-sm">H</span></div>{showText && <span className="font-bold text-white">HIVE</span>}</div>;
const Input = ({ type = "text", className = "", ...props }: any) => <input type={type} className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 ${className}`} {...props} />;
const Dialog = ({ children, open, onOpenChange, size = "default", ...props }: any) => open ? <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => onOpenChange && onOpenChange(false)} {...props}>{children}</div> : null;
const DialogContent = ({ children, className = "", ...props }: any) => <div className={`relative bg-gray-900 rounded-lg p-6 max-w-md mx-4 ${className}`} onClick={(e: React.MouseEvent) => e.stopPropagation()} {...props}>{children}</div>;
import { Clock, AlertTriangle, ArrowLeft, RefreshCw, Mail, CheckCircle2, Loader2, ShieldAlert } from 'lucide-react';
// Temporarily removing framer-motion for SSR issues
// import { motion, AnimatePresence } from 'framer-motion';

export default function ExpiredPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [devMagicLink, setDevMagicLink] = useState<string | null>(null);

  // Hooks must be called unconditionally
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  // Extract email and school from URL params or localStorage
  useEffect(() => {
    if (!mounted) return; // Only run after mounting

    const urlEmail = searchParams?.get('email');
    const urlSchoolId = searchParams?.get('schoolId');
    const storedEmail = localStorage.getItem('emailForSignIn');
    const storedSchool = localStorage.getItem('hive_last_school');

    if (urlEmail) setEmail(urlEmail);
    else if (storedEmail) setEmail(storedEmail);

    if (urlSchoolId) setSchoolId(urlSchoolId);
    else if (storedSchool) {
      try {
        const school = JSON.parse(storedSchool);
        setSchoolId(school.id);
      } catch (e) {
        console.error('Failed to parse stored school');
      }
    }

    // Check for stored resend attempts
    const storedAttempts = localStorage.getItem('hive_resend_attempts');
    if (storedAttempts) {
      try {
        const attempts = JSON.parse(storedAttempts);
        setAttemptNumber(attempts.count || 1);

        // Calculate remaining countdown
        const now = Date.now();
        const nextAllowedTime = attempts.nextRetryTime || 0;
        if (nextAllowedTime > now) {
          setCountdown(Math.ceil((nextAllowedTime - now) / 1000));
        }
      } catch (e) {
        console.error('Failed to parse resend attempts');
      }
    }
  }, [searchParams, mounted]);

  // Countdown timer management
  useEffect(() => {
    if (countdown > 0) {
      countdownInterval.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownInterval.current) {
              clearInterval(countdownInterval.current);
              countdownInterval.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (countdownInterval.current) {
          clearInterval(countdownInterval.current);
        }
      };
    }
  }, [countdown]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const handleResendLink = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!schoolId) {
      // If we don't have a school ID, redirect to login to select one
      if (router) {
        router.push(`/auth/login?email=${encodeURIComponent(email)}`);
      }
      return;
    }

    if (countdown > 0) {
      setError(`Please wait ${formatCountdown(countdown)} before requesting another link`);
      return;
    }

    setIsResending(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/resend-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          schoolId,
          attemptNumber
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle rate limiting with countdown
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          if (retryAfter) {
            const seconds = parseInt(retryAfter, 10);
            setCountdown(seconds);

            // Store next retry time
            const nextRetryTime = Date.now() + (seconds * 1000);
            localStorage.setItem('hive_resend_attempts', JSON.stringify({
              count: attemptNumber + 1,
              nextRetryTime
            }));
          }
        }

        throw new Error(data.error || 'Failed to resend magic link');
      }

      // Store dev magic link if available
      if (data.devMode && data.magicLink) {
        setDevMagicLink(data.magicLink);
      }

      // Update attempt tracking
      setAttemptNumber(data.attemptNumber || attemptNumber + 1);

      // Set countdown for next attempt
      if (data.nextRetryDelay) {
        setCountdown(data.nextRetryDelay);

        const nextRetryTime = Date.now() + (data.nextRetryDelay * 1000);
        localStorage.setItem('hive_resend_attempts', JSON.stringify({
          count: data.attemptNumber,
          nextRetryTime
        }));
      }

      setResendSuccess(true);

    } catch (err) {
      console.error('Error resending magic link:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');

      // Auto-clear error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsResending(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((e.target as any).value);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B] via-[#0F0F10] to-[#0A0A0B]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.015)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.025)_0%,transparent_50%)]" />

      {/* Floating glass orbs */}
      <div className="absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-r from-white/[0.02] to-[var(--hive-brand-primary)]/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-[15%] w-40 h-40 bg-gradient-to-l from-[var(--hive-brand-primary)]/[0.02] to-white/[0.01] rounded-full blur-3xl" />

      {/* Header */}
      <div
        className="relative z-10 border-b border-white/[0.08] backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to login</span>
            </Link>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
                <HiveLogo size="default" variant="gradient" showText={true} />
              </Link>
            </div>

            <div className="w-32" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-[var(--hive-brand-primary)]/10 rounded-full">
                <Clock className="w-8 h-8 text-[var(--hive-brand-primary)]" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">Magic Link Expired</h1>
              <p className="text-lg text-white/70">
                No worries! Let's get you a fresh one.
              </p>
            </div>

            <Card className="p-8 bg-white/[0.02] border-white/[0.08] shadow-2xl backdrop-blur-xl">
              {/* Security Info Box */}
              <div className="p-4 mb-6 bg-[var(--hive-brand-primary)]/[0.08] border border-[var(--hive-brand-primary)]/20 rounded-xl">
                <div className="flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-[var(--hive-brand-primary)] mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm text-[var(--hive-brand-primary)] font-medium">For your security</p>
                    <p className="text-xs text-white/60">
                      Magic links expire after 1 hour. This keeps your account safe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Input or Display */}
              {!email ? (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Your email address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your school email"
                    disabled={isResending}
                    autoFocus
                    className="w-full bg-white/[0.03] border-white/[0.15] focus:border-[var(--hive-brand-primary)]/50"
                  />
                </div>
              ) : (
                <div className="mb-6 p-4 bg-white/[0.02] rounded-xl border border-white/[0.08]">
                  <p className="text-sm text-white/60 mb-1">Resending to:</p>
                  <p className="text-white font-medium break-all">{email}</p>
                  <button
                    onClick={() => setEmail('')}
                    className="text-xs text-[var(--hive-brand-primary)] hover:underline mt-2"
                  >
                    Use a different email
                  </button>
                </div>
              )}

              {/* Attempt Counter */}
              {attemptNumber > 1 && (
                <div className="mb-4 text-center">
                  <p className="text-xs text-white/50">
                    Attempt {attemptNumber} of 5
                  </p>
                  {attemptNumber >= 4 && (
                    <p className="text-xs text-[var(--hive-brand-primary)] mt-1">
                      {5 - attemptNumber} attempt{5 - attemptNumber === 1 ? '' : 's'} remaining
                    </p>
                  )}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleResendLink}
                  disabled={isResending || countdown > 0 || (!email && !schoolId)}
                  variant="default"
                  className="max-w-lg w-full bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/90 text-black font-semibold disabled:opacity-50"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending new link...
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                      Wait {formatCountdown(countdown)}
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Send new magic link
                    </>
                  )}
                </Button>

                <Link href="/auth/login" className="block">
                  <Button
                    variant="outline"
                    className="max-w-lg w-full text-white/60 hover:text-white hover:bg-white/[0.05]"
                  >
                    Start over with new login
                  </Button>
                </Link>
              </div>

              {/* Progress Indicator for Countdown */}
              {countdown > 0 && (
                <div className="mt-4">
                  <div className="w-full bg-white/[0.05] rounded-full h-1 overflow-hidden">
                    <div
                      className="h-full bg-[var(--hive-brand-primary)]/50"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Support Link */}
            <p className="text-center text-sm text-white/40 mt-8">
              Still having trouble?{' '}
              <a
                href="mailto:support@hive.college"
                className="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80 transition-colors"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog
        open={resendSuccess}
        onOpenChange={() => setResendSuccess(false)}
        className="max-w-sm"
      >
        <DialogContent className="bg-[#0F0F10] border-white/[0.08] backdrop-blur-2xl">
          <div
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-green-500/20 border border-green-500/30">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">
                Magic link sent!
              </h3>
              <p className="text-white/70">
                Check your inbox at:
              </p>
              <p className="text-[var(--hive-brand-primary)] font-semibold break-all">
                {email}
              </p>
              <p className="text-xs text-white/50">
                The link will expire in 1 hour
              </p>
            </div>

            {/* Development mode - show the magic link */}
            {devMagicLink && (
              <Card className="p-4 bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/30 text-left">
                <p className="text-xs text-[var(--hive-brand-primary)] font-medium mb-2">
                  🛠️ Development Mode - Magic Link:
                </p>
                <Button
                  variant="default"
                  className="max-w-sm w-full bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/90 text-black text-xs"
                  onClick={() => window.location.href = devMagicLink}
                >
                  Use Dev Magic Link
                </Button>
              </Card>
            )}

            <Button
              variant="default"
              className="max-w-lg w-full bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/90 text-black font-semibold"
              onClick={() => {
                setResendSuccess(false);
                // Clear the form for next attempt
                if (attemptNumber >= 5) {
                  setAttemptNumber(1);
                  localStorage.removeItem('hive_resend_attempts');
                }
              }}
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
