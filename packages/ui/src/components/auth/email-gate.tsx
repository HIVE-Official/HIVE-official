"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Wrench, Loader2 } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { cn } from '../../lib/utils';

interface EmailGateProps {
  schoolName: string;
  schoolDomain: string;
  onBack?: () => void;
  className?: string;
  onDevContinue?: () => void;
}

export const EmailGate: React.FC<EmailGateProps> = ({
  schoolName,
  schoolDomain,
  onBack,
  className,
  onDevContinue
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending magic link
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-md", className)}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        {isSuccess ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
            <h2 className="text-xl font-semibold text-white">Check Your Email</h2>
            <p className="text-zinc-400">
              We sent a magic link to your email. Click it to continue.
            </p>
            {onDevContinue && (
              <Button
                onClick={onDevContinue}
                variant="outline"
                className="w-full mt-4 gap-2"
              >
                <Wrench className="w-4 h-4" />
                Continue to Onboarding (Dev)
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="text-center space-y-4 mb-6">
              <div className="flex justify-center">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Join {schoolName}</h2>
                <p className="text-zinc-400 mt-1">
                  Enter your {schoolDomain} email to continue
                </p>
              </div>
        </div>
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
        </div>
              <div className="flex gap-2">
                {onBack && (
                  <Button type="button" variant="outline" onClick={onBack}>
                    Back
                  </Button>
                )}
        <Button
          type="submit"
                  variant="surface"
                  className="w-full font-semibold"
                  disabled={isSubmitting}
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
              {onDevContinue && (
                <Button
                  type="button"
                  onClick={onDevContinue}
                  variant="outline"
                  className="w-full mt-4 gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  Skip to Onboarding (Dev)
        </Button>
              )}
      </form>
          </>
        )}
    </div>
    </motion.div>
  );
}; 