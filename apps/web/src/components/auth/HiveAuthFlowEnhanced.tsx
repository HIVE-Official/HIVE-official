"use client";

import React, { useState } from 'react';
import { logger } from '@/lib/logger';

import { motion } from 'framer-motion';
import { Button, Card, Input } from '@hive/ui';
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface HiveAuthFlowEnhancedProps {
  onAuthSuccess: (user: { id: string; email: string; name: string; isNewUser: boolean }) => void;
  schoolId?: string;
  schoolName?: string;
  schoolDomain?: string;
  initialStep?: string;
  mockMode?: boolean;
}

type AuthStep = 'email' | 'sent' | 'error';

interface AuthState {
  step: AuthStep;
  email: string;
  isLoading: boolean;
  error: string | null;
  retryAfter?: number;
}

export function HiveAuthFlowEnhanced({
  onAuthSuccess,
  schoolId = 'ub-buffalo',
  schoolName = 'University at Buffalo',
  schoolDomain = 'buffalo.edu',
  mockMode = false
}: HiveAuthFlowEnhancedProps) {
  const [state, setState] = useState<AuthState>({
    step: 'email',
    email: '',
    isLoading: false,
    error: null
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.email) {
      setState(prev => ({ ...prev, error: 'Email address is required' }));
      return;
    }

    // Validate email domain
    const emailDomain = state.email.split('@')[1]?.toLowerCase();
    if (emailDomain !== schoolDomain.toLowerCase()) {
      setState(prev => ({ 
        ...prev, 
        error: `Please use your ${schoolDomain} email address` 
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Mock mode for development
      if (mockMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setState(prev => ({ ...prev, step: 'sent', isLoading: false }));
        
        // Simulate auth success after delay
        setTimeout(() => {
          onAuthSuccess({
            id: 'mock-user-id',
            email: state.email,
            name: 'Mock User',
            isNewUser: false
          });
        }, 2000);
        return;
      }

      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: state.email,
          schoolId: schoolId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setState(prev => ({ 
            ...prev, 
            step: 'error',
            error: data.error || 'Too many requests. Please try again later.',
            retryAfter: data.retryAfter,
            isLoading: false 
          }));
        } else {
          setState(prev => ({ 
            ...prev, 
            step: 'error',
            error: data.error || 'Failed to send magic link',
            isLoading: false 
          }));
        }
        return;
      }

      setState(prev => ({ ...prev, step: 'sent', isLoading: false }));

    } catch (error) {
      logger.error('Magic link request failed:', { error: String(error) });
      setState(prev => ({ 
        ...prev, 
        step: 'error',
        error: 'Network error. Please check your connection and try again.',
        isLoading: false 
      }));
    }
  };

  const handleRetry = () => {
    setState(prev => ({ ...prev, step: 'email', error: null, retryAfter: undefined }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card variant="elevated" className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">
              Welcome to HIVE
            </h1>
            <p className="text-muted">
              {schoolName}
            </p>
          </div>

          {/* Email Input Step */}
          {state.step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[var(--hive-text-primary)]">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={state.email}
                  onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={`your.email@${schoolDomain}`}
                  disabled={state.isLoading}
                  className="w-full"
                />
                <p className="text-sm text-muted">
                  Use your {schoolDomain} email address
                </p>
              </div>

              {state.error && (
                <div className="flex items-center gap-2 p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-md">
                  <AlertCircle className="h-4 w-4 text-[var(--hive-gold)]" />
                  <p className="text-sm text-[var(--hive-gold)]">
                    {state.error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={state.isLoading || !state.email}
                className="w-full"
              >
                {state.isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending Magic Link...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Magic Link
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Success Step */}
          {state.step === 'sent' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-[var(--hive-gold)]/20 p-3">
                  <CheckCircle className="h-8 w-8 text-[var(--hive-gold)]" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl text-[var(--hive-text-primary)] font-semibold">
                  Check Your Email
                </h3>
                <p className="text-muted">
                  We sent a magic link to
                </p>
                <p className="text-[var(--hive-text-primary)] font-medium">
                  {state.email}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted">
                  Click the link in your email to sign in. The link will expire in 15 minutes.
                </p>
                
                <Button
                  variant="outline"
                  onClick={handleRetry}
                  className="w-full"
                >
                  Use Different Email
                </Button>
              </div>
            </div>
          )}

          {/* Error Step */}
          {state.step === 'error' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-[var(--hive-gold)]/20 p-3">
                  <AlertCircle className="h-8 w-8 text-[var(--hive-gold)]" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl text-[var(--hive-text-primary)] font-semibold">
                  Something went wrong
                </h3>
                <p className="text-muted">
                  {state.error}
                </p>
                {state.retryAfter && (
                  <p className="text-sm text-muted">
                    Please wait {Math.ceil(state.retryAfter / 60)} minutes before trying again.
                  </p>
                )}
              </div>

              <Button
                onClick={handleRetry}
                disabled={!!state.retryAfter}
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default HiveAuthFlowEnhanced;