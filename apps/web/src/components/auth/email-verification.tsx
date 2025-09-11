'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  Shield,
  AlertCircle,
  Send,
  Inbox,
  ExternalLink,
  Copy,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button, Badge } from '@hive/ui';
import { cn } from '../../lib/utils';
import { authenticatedFetch } from '../../lib/auth-utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface EmailVerificationProps {
  email?: string;
  token?: string;
  userId?: string;
  mode?: 'verify' | 'resend' | 'change';
  className?: string;
}

export function EmailVerification({
  email: initialEmail,
  token,
  userId,
  mode = 'verify',
  className = ''
}: EmailVerificationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(initialEmail || '');
  const [newEmail, setNewEmail] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);

  // Auto-verify if token is present
  useEffect(() => {
    if (token && mode === 'verify') {
      verifyEmail(token);
    }
  }, [token]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await authenticatedFetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: verificationToken })
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationStatus('success');
        setSuccessMessage('Your email has been verified successfully!');
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        setVerificationStatus('error');
        setErrorMessage(data.error || 'Verification failed. Please try again.');
      }
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage('An error occurred during verification.');
    }
  };

  const verifyWithCode = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit code');
      return;
    }

    try {
      const response = await authenticatedFetch('/api/auth/verify-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId,
          code,
          email 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationStatus('success');
        setSuccessMessage('Your email has been verified successfully!');
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        setErrorMessage(data.error || 'Invalid verification code');
      }
    } catch (error) {
      setErrorMessage('An error occurred during verification.');
    }
  };

  const resendVerificationEmail = async () => {
    if (countdown > 0) return;

    setSending(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await authenticatedFetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email || newEmail,
          userId 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Verification email sent! Check your inbox.');
        setCountdown(60); // 60 second cooldown
        if (newEmail) {
          setEmail(newEmail);
          setShowChangeEmail(false);
          setNewEmail('');
        }
      } else {
        setErrorMessage(data.error || 'Failed to send verification email.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCode = value.slice(0, 6).split('');
      const newCode = [...verificationCode];
      pastedCode.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit;
        }
      });
      setVerificationCode(newCode);
      
      // Focus last input or next empty
      const nextIndex = Math.min(index + pastedCode.length, 5);
      document.getElementById(`code-${nextIndex}`)?.focus();
    } else {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email);
    setSuccessMessage('Email copied to clipboard!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getEmailProvider = (emailAddress: string) => {
    const domain = emailAddress.split('@')[1];
    const providers: Record<string, string> = {
      'gmail.com': 'https://mail.google.com',
      'outlook.com': 'https://outlook.live.com',
      'yahoo.com': 'https://mail.yahoo.com',
      'buffalo.edu': 'https://mail.google.com',
      'hotmail.com': 'https://outlook.live.com'
    };
    return providers[domain];
  };

  if (verificationStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('text-center py-12', className)}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-10 w-10 text-green-400" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
          Email Verified!
        </h2>
        <p className="text-neutral-400 mb-6">
          {successMessage}
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Redirecting to dashboard...
        </div>
      </motion.div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-[var(--hive-brand-secondary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-[var(--hive-brand-secondary)]" />
        </div>
        
        <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
          Verify Your Email
        </h2>
        <p className="text-neutral-400">
          {mode === 'verify' 
            ? 'Enter the verification code sent to your email'
            : 'We need to verify your email address to continue'}
        </p>
      </div>

      {/* Email Display */}
      {email && !showChangeEmail && (
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Inbox className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Verification email sent to:</p>
                <p className="font-medium text-[var(--hive-text-inverse)]">{email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyEmailToClipboard}
                className="text-neutral-400"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChangeEmail(true)}
                className="text-neutral-400"
              >
                Change
              </Button>
            </div>
          </div>

          {getEmailProvider(email) && (
            <a
              href={getEmailProvider(email)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 text-sm text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors"
            >
              Open email inbox
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      )}

      {/* Change Email Form */}
      {showChangeEmail && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-lg border border-white/10 p-4"
        >
          <label htmlFor="new-email" className="block text-sm text-neutral-400 mb-2">
            New Email Address
          </label>
          <div className="flex gap-2">
            <input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e: any) => setNewEmail(e.target.value)}
              placeholder="your.email@buffalo.edu"
              aria-label="New email address"
              aria-required="true"
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowChangeEmail(false);
                setNewEmail('');
              }}
              className="border-white/20"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Verification Code Input */}
      {mode === 'verify' && (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-neutral-400 mb-4">
              Enter the 6-digit code from your email
            </p>
            
            <div className="flex items-center justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e: any) => handleCodeInput(index, e.target.value)}
                  onKeyDown={(e: any) => handleKeyDown(index, e)}
                  aria-label={`Verification code digit ${index + 1}`}
                  aria-required="true"
                  inputMode="numeric"
                  pattern="[0-9]"
                  className="w-12 h-12 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)] focus:bg-white/10 transition-all"
                />
              ))}
            </div>
          </div>

          <Button
            onClick={verifyWithCode}
            disabled={verificationCode.join('').length !== 6}
            className="w-full bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
          >
            Verify Code
          </Button>
        </div>
      )}

      {/* Resend Section */}
      <div className="text-center space-y-3">
        <p className="text-sm text-neutral-400">
          Didn't receive the email?
        </p>
        
        <Button
          variant="outline"
          onClick={resendVerificationEmail}
          disabled={sending || countdown > 0}
          className="border-white/20"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : countdown > 0 ? (
            <>
              <Clock className="h-4 w-4 mr-2" />
              Resend in {countdown}s
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Resend Email
            </>
          )}
        </Button>

        <p className="text-xs text-neutral-500">
          Make sure to check your spam folder
        </p>
      </div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400" />
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          </motion.div>
        )}

        {successMessage && !verificationStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <p className="text-sm text-green-300">{successMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Note */}
      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-blue-400 mt-0.5" />
          <div className="text-xs text-blue-300">
            <p className="font-medium mb-1">Why verify your email?</p>
            <ul className="space-y-1 text-blue-300/80">
              <li>• Secure your account and enable recovery options</li>
              <li>• Connect with your campus community</li>
              <li>• Receive important notifications and updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}