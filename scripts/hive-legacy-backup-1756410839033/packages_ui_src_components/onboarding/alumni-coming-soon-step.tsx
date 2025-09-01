"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { BookOpen, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';

interface AlumniComingSoonStepProps {
  onBack: () => void;
  schoolName: string;
  userEmail: string;
}

export const AlumniComingSoonStep: React.FC<AlumniComingSoonStepProps> = ({
  onBack,
  schoolName,
  userEmail,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotifyMe = async () => {
    setIsSubmitting(true);
    
    // Simulate email subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsSubmitting(false);
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
        </div>
        
        <div className="w-full max-w-lg relative z-10">
          <div className="module-border module-surface module-padding text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              
              <div>
                <h3 className="text-xl font-display font-medium text-foreground mb-2">
                  You're on the list!
                </h3>
                <p className="text-muted font-body">
                  We'll send you an email at <span className="text-accent">{userEmail}</span> as soon as alumni access is available.
                </p>
              </div>
              
              <ButtonEnhanced variant="secondary" onClick={onBack} className="mt-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </ButtonEnhanced>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Content card */}
        <div className="module-border module-surface module-padding space-y-8">
          {/* Header */}
          <motion.div 
            className="text-center space-y-4"
            variants={hiveVariants.item}
            initial="hidden"
            animate="visible"
          >
            <div className="w-20 h-20 bg-surface-01 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-10 h-10 text-accent" />
            </div>
            
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground mb-3">
                Alumni Access Coming Soon
              </h1>
              <p className="text-muted font-body text-lg">
                We're working on something special for {schoolName} alumni
              </p>
            </div>
          </motion.div>

          {/* Features Preview */}
          <motion.div 
            className="space-y-4"
            variants={hiveVariants.container}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-surface-01 rounded-lg p-6 space-y-4">
              <h3 className="font-medium font-body text-foreground">What's coming for alumni:</h3>
              
              <ul className="space-y-3">
                {[
                  'Connect with fellow graduates from your class',
                  'Mentor current students in your field',
                  'Access exclusive alumni events and networking',
                  'Share career opportunities and insights',
                  'Stay updated with campus news and developments'
                ].map((feature, index) => (
                  <motion.li
                    key={feature}
                    className="flex items-start gap-3 text-muted font-body"
                    variants={hiveVariants.item}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Email Notification */}
          <motion.div 
            className="bg-surface-01 border border-border rounded-lg p-6 space-y-4"
            variants={hiveVariants.item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-accent" />
              <h3 className="font-medium font-body text-foreground">
                Get notified when it's ready
              </h3>
            </div>
            
            <p className="text-muted font-body text-sm mb-4">
              We'll send you an email at <span className="text-accent font-medium">{userEmail}</span> as soon as alumni access becomes available.
            </p>
            
            <ButtonEnhanced
              onClick={handleNotifyMe}
              disabled={isSubmitting}
              variant="primary"
              className="w-full"
            >
              {isSubmitting ? 'Adding you to the list...' : 'Notify Me When Ready'}
            </ButtonEnhanced>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex gap-3 pt-4"
            variants={hiveVariants.item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <ButtonEnhanced
              variant="secondary"
              onClick={onBack}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Role Selection
            </ButtonEnhanced>
          </motion.div>
        </div>
      </div>
    </div>
  );
};