"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { type School } from './school-pick';

interface EmailGateProps {
  school: School;
  onSendMagicLink: (email: string, school: School) => Promise<boolean>;
  onBack: () => void;
  className?: string
}

export const EmailGate: React.FC<EmailGateProps> = ({ school, onSendMagicLink, onBack, className }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.endsWith(school.domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError(`Please enter a valid @${school.domain} email address.`);
      return;
    }
    setError(null);
    setIsLoading(true);
    
    const success = await onSendMagicLink(email, school);
    if (!success) {
        setError('Something went wrong. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className={className}>
        <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-base ease-smooth mb-6"
        >
            <ArrowLeft className="h-4 w-4" />
            Back
        </motion.button>
        
        <div className="w-16 h-16 bg-surface-02 rounded-full flex items-center justify-center mx-auto mb-6 border border-border">
            <Mail className="h-8 w-8 text-muted" />
        </div>
        
        <div className="text-center mb-8">
            <h1 className="text-h2 font-display font-semibold mb-2">
                Join {school.name}
            </h1>
            <p className="text-body text-muted">
                Enter your <strong className="text-foreground">@{school.domain}</strong> email to continue.
            </p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder={`you@${school.domain}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(null);
            }}
            variant="accent"
            inputSize="lg"
            state={error ? 'error' : 'default'}
            disabled={isLoading}
          />
          {error && <p className="text-caption text-red-500">{error}</p>}
        </div>
        
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!isValidEmail(email)}
        >
          Send Magic Link
        </Button>
      </form>
    </div>
  );
}; 