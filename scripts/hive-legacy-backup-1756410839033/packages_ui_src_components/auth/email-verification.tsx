"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Clock, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '../button';
import { Alert } from '../alert';
import { Card, CardHeader, CardContent, CardFooter } from '../card';
import { cn } from '../lib/utils';

interface EmailVerificationProps {
  email: string;
  schoolName: string;
  onBack?: () => void;
  onResend?: () => Promise<void>;
  className?: string;
  expirationMinutes?: number;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  schoolName,
  onBack,
  onResend,
  className,
  expirationMinutes = 10
}) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(expirationMinutes * 60);
  const [resendCount, setResendCount] = useState(0);

  // Countdown timer for link expiration
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = async () => {
    if (!onResend || isResending || resendCooldown > 0) return;

    setIsResending(true);
    try {
      await onResend();
      setResendCount(prev => prev + 1);
      setTimeRemaining(expirationMinutes * 60); // Reset expiration timer
      setResendCooldown(30); // 30 second cooldown between resends
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const openEmailApp = () => {
    // Try to open default email client
    window.location.href = 'mailto:';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-md mx-auto", className)}
    >
      <Card variant="elevated" padding="lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-semibold">Check your email</h2>
          <p className="text-base text-muted-foreground">
            We've sent a magic link to <span className="text-[var(--hive-text-inverse)] font-medium">{email}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Alert */}
          {timeRemaining > 0 ? (
            <Alert variant="primary">
              <Clock className="w-4 h-4" />
              <div>
                <p className="font-medium">Magic link sent!</p>
                <p className="text-sm">
                  Click the link in your email to sign in to {schoolName}. 
                  {timeRemaining > 0 && (
                    <> Expires in <span className="font-mono">{formatTime(timeRemaining)}</span>.</>
                  )}
                </p>
              </div>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <div>
                <p className="font-medium">Link expired</p>
                <p className="text-sm">
                  Your magic link has expired. Request a new one to continue.
                </p>
              </div>
            </Alert>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <ButtonEnhanced 
              variant="secondary" 
              className="w-full"
              onClick={openEmailApp}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open email app
            </ButtonEnhanced>

            <ButtonEnhanced
              variant={timeRemaining > 0 ? "ghost" : "primary"}
              className="w-full"
              onClick={handleResend}
              disabled={isResending || resendCooldown > 0}
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : resendCooldown > 0 ? (
                `Resend in ${resendCooldown}s`
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend magic link
                </>
              )}
            </ButtonEnhanced>
          </div>

          {/* Troubleshooting */}
          <div className="bg-surface/50 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-[var(--hive-text-inverse)]">Didn't receive the email?</h4>
            <ul className="text-xs text-muted space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered your email correctly</li>
              <li>• Email delivery may take a few minutes</li>
              <li>• Contact support if problems persist</li>
            </ul>
          </div>

          {/* Resend Stats */}
          {resendCount > 0 && (
            <div className="text-xs text-muted text-center">
              Magic link sent {resendCount + 1} time{resendCount > 0 ? 's' : ''}
            </div>
          )}
        </CardContent>

        <CardFooter>
          {onBack && (
            <ButtonEnhanced variant="ghost" className="w-full" onClick={onBack}>
              ← Try a different email
            </ButtonEnhanced>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};