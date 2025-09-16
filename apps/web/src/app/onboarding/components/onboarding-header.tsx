'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import type { OnboardingStep } from '../constants/onboarding-steps';
import { getMotionConfig } from '../constants/motion-config';

interface OnboardingHeaderProps {
  currentStep: number;
  onPrevStep: () => void;
  canGoBack: boolean;
  stepData: OnboardingStep;
}

export function OnboardingHeader({
  currentStep,
  onPrevStep,
  canGoBack,
  stepData
}: OnboardingHeaderProps) {
  const [motionConfig, setMotionConfig] = useState(getMotionConfig());

  useEffect(() => {
    setMotionConfig(getMotionConfig());
  }, []);

  return (
    <div className="border-b border-[var(--hive-background-tertiary)]">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/hive-logo-white.svg"
              alt="HIVE"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold text-[var(--hive-text-primary)]">
              HIVE Onboarding
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {canGoBack && (
              <button
                onClick={onPrevStep}
                className="flex items-center gap-2 px-3 py-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            )}
            
            <div className="text-sm text-[var(--hive-text-secondary)]">
              Step {currentStep + 1} of 8
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <motion.h1 
              key={stepData.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: motionConfig.durations.fast, 
                ease: motionConfig.easing.decelerate 
              }}
              className="text-lg font-semibold text-[var(--hive-text-primary)]"
            >
              {stepData.title}
            </motion.h1>
            <div className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              {stepData.icon}
            </div>
          </div>
          
          <motion.p 
            key={stepData.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: motionConfig.durations.standard, 
              delay: motionConfig.durations.micro 
            }}
            className="text-[var(--hive-text-secondary)] mb-3"
          >
            {stepData.subtitle}
          </motion.p>
          
          <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stepData.progress}%` }}
              transition={{ 
                duration: motionConfig.durations.slow, 
                ease: motionConfig.easing.decelerate 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}