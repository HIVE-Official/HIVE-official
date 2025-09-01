"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { School, Sparkles, Users } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';

interface SchoolPledgeStepProps {
  schoolName: string;
  onNext: () => void;
}

export const SchoolPledgeStep: React.FC<SchoolPledgeStepProps> = ({ 
  schoolName, 
  onNext 
}) => {
  useAdaptiveMotion('academic'); // For consistency with motion system

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <motion.div 
        className="w-full max-w-2xl relative z-10"
        variants={hiveVariants.container}
        initial="hidden"
        animate="visible"
      >
        {/* Progress indicator */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={hiveVariants.item}
        >
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((stepNum, index) => (
              <div
                key={stepNum}
                className={`w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                  index < 1 ? 'bg-white' : index === 1 ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div 
          className="module-border module-surface module-padding space-y-8"
          variants={hiveVariants.item}
        >
          {/* Header */}
          <motion.div
            className="text-center space-y-6"
            variants={hiveVariants.item}
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <School className="w-10 h-10 text-accent" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-display font-semibold text-foreground">
                Welcome to {schoolName}
              </h1>
              <p className="text-muted font-body text-lg max-w-md mx-auto">
                You're about to join a vibrant campus community where connections spark collaboration.
              </p>
            </div>

            {/* School spirit elements */}
            <div className="flex justify-center items-center gap-8 py-6">
              <motion.div 
                className="flex items-center gap-2 text-accent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Users className="w-5 h-5" />
                <span className="text-sm font-body">Connect</span>
              </motion.div>
              
              <motion.div 
                className="w-2 h-2 bg-accent rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              />
              
              <motion.div 
                className="flex items-center gap-2 text-accent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-body">Create</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Action */}
          <motion.div
            variants={hiveVariants.item}
            className="text-center"
          >
            <ButtonEnhanced 
              onClick={onNext} 
              variant="primary" 
              size="lg" 
              className="w-full font-body"
            >
              Let's Build Your Profile
            </ButtonEnhanced>
            <p className="text-xs text-muted font-body mt-3">
              This will only take a few minutes
            </p>
          </motion.div>
        </motion.div>

        {/* Step indicator */}
        <motion.div 
          className="text-center mt-6"
          variants={hiveVariants.item}
        >
          <p className="text-sm text-muted font-body">
            Step 2 of 4
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}; 