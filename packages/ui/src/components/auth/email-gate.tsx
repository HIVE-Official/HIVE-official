"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { cn } from '@/lib/utils';

interface EmailGateProps {
  schoolName: string;
  schoolDomain: string;
  schoolId: string; // Added required schoolId prop
  onBack?: () => void;
  className?: string;
  onDevContinue?: () => void;
  onSuccess?: (email: string) => void; // Called when magic link is sent successfully
  showTermsAndPrivacy?: boolean; // Whether to show terms and privacy links
  backLinkHref?: string; // Custom back link URL
}

interface ApiError {
  message: string;
}

export const EmailGate: React.FC<EmailGateProps> = ({
  schoolName,
  schoolDomain,
  schoolId,
  onBack,
  className,
  onSuccess,
  showTermsAndPrivacy = true,
  backLinkHref
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const eduRegex = /^[^@]+@[^@]+\.edu$/i;
    return eduRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateEmail(email)) {
      setError('Please enter a valid .edu email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, schoolId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send magic link');
      }

      // Store email in localStorage for verification
      if (typeof window !== 'undefined') {
        localStorage.setItem('hive-auth-email', email);
      }

      setIsSuccess(true);
      
      // Call success callback
      onSuccess?.(email);
      
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to send magic link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-md", className)}
    >
      <div className="bg-surface border border-border rounded-lg p-6">
        {isSuccess ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-white font-display">Check Your Email</h2>
            <p className="text-muted-foreground">
              We sent a magic link to <span className="text-white font-medium">{email}</span>. 
              Click it to continue to HIVE.
            </p>
            
            <div className="text-xs text-muted-foreground mt-4">
              Didn't receive it? Check your spam folder or try again.
            </div>
          </div>
        ) : (
          <>
            <div className="text-center space-y-4 mb-6">
              <div className="flex justify-center">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white font-display">Join {schoolName}</h2>
                <p className="text-muted-foreground mt-1">
                  Enter your {schoolDomain} email to continue
                </p>
              </div>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface/50 border border-border rounded-lg p-3 mb-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`you@${schoolDomain}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null); // Clear error when user types
                  }}
                  className="bg-primary border-border"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-2">
                {onBack && (
                  <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="ritual"
                  size="lg"
                  className="w-full font-semibold"
                  disabled={isSubmitting || !email.trim()}
                >
                  {isSubmitting ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </motion.div>
                  ) : (
                    'Send Magic Link'
                  )}
                </Button>
              </div>
              
              {/* Terms and Privacy Policy */}
              {showTermsAndPrivacy && (
                <div className="mt-4 text-xs text-center text-muted-foreground">
                  By continuing, you agree to HIVE's{' '}
                  <a href="/legal/terms" className="underline hover:text-foreground transition-colors">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/legal/privacy" className="underline hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                  .
                </div>
              )}
              
              {/* Custom Back Link */}
              {backLinkHref && (
                <div className="mt-2 text-center">
                  <a 
                    href={backLinkHref}
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                  >
                    Back
                  </a>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}; 