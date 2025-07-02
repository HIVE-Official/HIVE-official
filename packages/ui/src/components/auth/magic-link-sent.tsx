'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail } from 'lucide-react'
import { Button } from '../button'
import type { School } from '@hive/core'

export interface MagicLinkSentProps {
  email: string
  school: School
  onBack: () => void
  onResend: () => Promise<boolean>
  className?: string
}

export const MagicLinkSent: React.FC<MagicLinkSentProps> = ({
  email,
  school,
  onBack,
  onResend,
  className
}) => {
  const [isResending, setIsResending] = React.useState(false);

  const handleResendClick = async () => {
    setIsResending(true);
    await onResend();
    // Add a small delay to show feedback
    setTimeout(() => setIsResending(false), 1000); 
  };
  
  return (
    <div className={className}>
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.68, -0.55, 0.265, 1.55] }} // Elastic ease
            className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent/20"
        >
            <Mail className="h-10 w-10 text-accent" />
        </motion.div>
        
        <h1 className="text-h2 font-display font-semibold text-center mb-2">
            Check your email
        </h1>
        
        <p className="text-body text-muted text-center mb-8">
            We sent a magic link to <br/>
            <strong className="text-foreground">{email}</strong>
        </p>

        <p className="text-body-sm text-muted text-center mb-6">
          Click the link in your email to complete sign-in at {school.name}. It will expire in 10 minutes.
        </p>

        <Button 
          variant="default"
          size="lg"
          fullWidth
          onClick={handleResendClick}
          loading={isResending}
        >
          {isResending ? 'Sending...' : 'Resend Magic Link'}
        </Button>

        <div className="text-center mt-6">
            <Button
                onClick={onBack}
                variant="ghost"
                className="text-muted hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to school selection
            </Button>
        </div>

        <p className="text-caption text-muted text-center mt-8">
            Having trouble? Check your spam folder or contact support.
        </p>
    </div>
  )
} 