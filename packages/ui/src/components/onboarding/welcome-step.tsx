"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
  userEmail?: string;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, userEmail }) => {
  // Extract university name from email for personalization
  const getUniversityName = (email?: string) => {
    if (!email) return 'your university';
    const domain = email.split('@')[1];
    if (domain?.includes('buffalo')) return 'University at Buffalo';
    if (domain?.includes('cornell')) return 'Cornell University';
    if (domain?.includes('columbia')) return 'Columbia University';
    // Add more university mappings as needed
    return domain?.replace('.edu', '').replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'your university';
  };

  const universityName = getUniversityName(userEmail);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        
        {/* HIVE Logo Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 text-center"
        >
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
            {/* Hexagon background with HIVE gold */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#EAC200] shadow-lg" />
            <Sparkles className="relative h-8 w-8 text-black" />
            
            {/* Subtle rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-3xl border border-[#FFD700]/20"
            />
          </div>
          
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground">
            HIVE
          </h1>
          <p className="mt-2 text-[#FFD700] font-medium">
            {universityName}
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-8 text-center"
        >
          {/* Hero Message */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-foreground">
              Welcome to something different
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Finally, a platform built by students, for students. 
              Connect authentically. Build communities. Create tools that matter.
            </p>
          </div>

          {/* Value Props - Minimal */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
              <span>Real communities, not performative feeds</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
              <span>Tools built by your peers, not Silicon Valley</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
              <span>Your data stays yours, always</span>
            </div>
          </div>

          {/* Setup Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="rounded-xl border border-border/50 bg-surface-01/50 p-6"
          >
            <p className="mb-4 text-sm font-medium text-foreground">
              Let&apos;s set up your profile
            </p>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD700] text-xs font-semibold text-black">
                  1
                </div>
                <span className="text-xs text-muted-foreground">Identity</span>
              </div>
              
              <div className="h-px w-8 bg-border" />
              
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs text-muted-foreground">
                  2
                </div>
                <span className="text-xs text-muted-foreground">Academics</span>
              </div>
              
              <div className="h-px w-8 bg-border" />
              
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs text-muted-foreground">
                  3
                </div>
                <span className="text-xs text-muted-foreground">Interests</span>
              </div>
            </div>
            
            <p className="mt-4 text-xs text-muted-foreground">
              2 minutes • You can change everything later
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="pt-4"
          >
            <Button
              onClick={onNext}
              size="lg"
              className="group relative w-full bg-surface-01 border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/5 transition-all duration-[120ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            >
                             <span className="font-medium">Let&apos;s begin</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-[120ms] group-hover:translate-x-0.5" />
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="pt-8"
          >
            <p className="text-xs text-muted-foreground/60">
              Built by Students · Owned by Students
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}; 