"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

interface UBEmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (email: string) => void;
  className?: string;
}

interface ApiError {
  message: string;
}

export const UBEmailPopup: React.FC<UBEmailPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
  className
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const UB_SCHOOL_CONFIG = {
    id: 'buffalo',
    name: 'University at Buffalo',
    domain: 'buffalo.edu'
  };

  const validateUBEmail = (email: string): boolean => {
    const ubEmailRegex = /^[^@]+@buffalo\.edu$/i;
    return ubEmailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateUBEmail(email)) {
      setError('Please enter a valid buffalo.edu email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          schoolId: UB_SCHOOL_CONFIG.id 
        }),
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
      onSuccess?.(email);
      
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to send magic link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    setEmail('');
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-labelledby="ub-email-title"
            aria-describedby="ub-email-description"
            aria-modal="true"
            className={cn(
              "relative bg-surface rounded-xl shadow-2xl border-2 border-accent/20 overflow-hidden ring-1 ring-white/10 w-full max-w-md",
              className
            )}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              duration: 0.18, 
              ease: [0.33, 0.65, 0, 1] // Brand timing curve
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 text-muted hover:text-foreground transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-surface rounded-sm"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center">
                    <CheckCircle className="w-12 h-12 text-accent" />
                  </div>
                  <h2 
                    id="ub-email-title"
                    className="text-h3 font-display font-semibold text-white"
                  >
                    Check Your Email
                  </h2>
                  <p 
                    id="ub-email-description"
                    className="text-body text-muted"
                  >
                    We sent a magic link to{' '}
                    <span className="text-white font-medium">{email}</span>.{' '}
                    Click it to continue to HIVE.
                  </p>
                  
                  <div className="text-caption text-muted mt-4">
                    Didn't receive it? Check your spam folder or try again.
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="text-center space-y-4 mb-6">
                    <div className="flex justify-center">
                      <Mail className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h2 
                        id="ub-email-title"
                        className="text-h3 font-display font-semibold text-white"
                      >
                        Join {UB_SCHOOL_CONFIG.name}
                      </h2>
                      <p 
                        id="ub-email-description"
                        className="text-body text-muted mt-2"
                      >
                        Enter your {UB_SCHOOL_CONFIG.domain} email to continue
                      </p>
                    </div>
                  </div>
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="bg-red-900/20 border border-red-500/20 rounded-lg p-3 mb-4"
                    >
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="ub-email" className="sr-only">
                        Buffalo email address
                      </Label>
                      <Input
                        id="ub-email"
                        type="email"
                        placeholder={`you@${UB_SCHOOL_CONFIG.domain}`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        className="bg-zinc-800 border-zinc-700 focus:border-accent focus:ring-accent/50"
                        required
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                    </div>
                    
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
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};