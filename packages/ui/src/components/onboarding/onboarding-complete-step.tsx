"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';

interface OnboardingCompleteStepProps {
  onGoToFeed: () => void;
  userName?: string;
  majorName?: string;
  graduationYear?: number;
  schoolName?: string;
}

export const OnboardingCompleteStep: React.FC<OnboardingCompleteStepProps> = ({ 
  onGoToFeed,
  userName = "there",
  majorName,
  graduationYear,
  schoolName = "University at Buffalo"
}) => {
  useAdaptiveMotion('academic'); // For consistency with motion system
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const completionSteps = [
    "Profile created",
    "Interests selected", 
    "Community ready",
    "Welcome complete"
  ];

  useEffect(() => {
    // Start celebration sequence
    setTimeout(() => setShowCelebration(true), 500);
    
    // Animate completion steps
    completionSteps.forEach((_, index) => {
      setTimeout(() => setCurrentStep(index + 1), 1000 + index * 300);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      {/* Celebration particles */}
      <AnimatePresence>
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full"
                initial={{ 
                  x: "50vw", 
                  y: "50vh", 
                  scale: 0,
                  opacity: 0 
                }}
                animate={{ 
                  x: `${30 + i * 10}vw`, 
                  y: `${20 + i * 15}vh`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        className="w-full max-w-2xl relative z-10"
        variants={hiveVariants.container}
        initial="hidden"
        animate="visible"
      >
        {/* Progress indicator - all complete */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={hiveVariants.item}
        >
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <motion.div
                key={stepNum}
                className="w-2 h-2 rounded-full bg-accent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: stepNum * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div 
          className="module-border module-surface module-padding space-y-8 text-center"
          variants={hiveVariants.item}
        >
          {/* Success icon */}
          <motion.div
            className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.3,
              type: "spring", 
              stiffness: 200,
              damping: 15
            }}
          >
            <Sparkles className="w-12 h-12 text-accent" />
          </motion.div>

          {/* Main message */}
          <motion.div
            className="space-y-4"
            variants={hiveVariants.item}
          >
            <h1 className="text-3xl font-display font-semibold text-foreground">
              You're all set, {userName}!
            </h1>
            <p className="text-muted font-body text-lg max-w-md mx-auto">
              Your HIVE profile is complete and your community is waiting.
            </p>
          </motion.div>

          {/* Completion checklist */}
          <motion.div 
            className="space-y-3 max-w-xs mx-auto"
            variants={hiveVariants.container}
          >
            {completionSteps.map((step, index) => (
              <motion.div
                key={step}
                className={`flex items-center gap-3 text-sm font-body transition-all duration-[180ms] ${
                  index < currentStep ? 'text-accent' : 'text-muted'
                }`}
                variants={hiveVariants.item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index < currentStep ? 1 : 0.5,
                  x: 0
                }}
                transition={{ delay: 1 + index * 0.3 }}
              >
                <motion.div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    index < currentStep 
                      ? 'border-accent bg-accent' 
                      : 'border-border'
                  }`}
                  animate={{ 
                    scale: index < currentStep ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    delay: 1 + index * 0.3,
                    duration: 0.3
                  }}
                >
                  {index < currentStep && (
                    <Check className="w-2.5 h-2.5 text-background" />
                  )}
                </motion.div>
                {step}
              </motion.div>
            ))}
          </motion.div>

          {/* Communities joined */}
          {(majorName || graduationYear) && (
            <motion.div
              className="p-4 bg-accent/5 border border-accent/20 rounded-lg max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <h3 className="text-sm font-medium text-foreground font-body mb-3">
                🎉 You've joined 3 communities:
              </h3>
              <div className="space-y-2 text-sm text-muted font-body">
                {majorName && (
                  <div className="flex items-center gap-2">
                    <span className="text-accent">🎓</span>
                    <span>{majorName}</span>
                  </div>
                )}
                {graduationYear && (
                  <div className="flex items-center gap-2">
                    <span className="text-accent">📅</span>
                    <span>Class of {graduationYear}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-accent">🏠</span>
                  <span>{schoolName} Community</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* See you soon message */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg">
              <p className="text-accent font-body text-lg">
                ✨ See you very soon! ✨
              </p>
              <p className="text-muted font-body text-sm mt-2">
                Your HIVE adventure is about to begin
              </p>
            </div>

            <Button 
              onClick={onGoToFeed} 
              variant="ritual"
              size="lg" 
              className="w-full font-body"
            >
              Enter Your HIVE
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}; 