"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressIndicator } from './progress-indicator';
import { Button } from '../button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  prevLabel?: string;
  nextDisabled?: boolean;
  showProgress?: boolean;
  title?: string;
  subtitle?: string;
  hideNavigation?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  children,
  onNext,
  onPrev,
  nextLabel = "Continue",
  prevLabel = "Back", 
  nextDisabled = false,
  showProgress = true,
  title,
  subtitle,
  hideNavigation = false
}) => {
  const showPrevButton = onPrev && currentStep > 1;
  const showNextButton = onNext && currentStep < totalSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface-01/30">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepLabels={stepLabels}
            />
          </motion.div>
        )}

        {/* Step Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8 space-y-2"
          >
            {title && (
              <h1 className="text-3xl font-bold font-display text-foreground">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Step Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="w-full max-w-2xl">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {!hideNavigation && (showPrevButton || showNextButton) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-between items-center mt-8 max-w-2xl mx-auto"
          >
            {/* Previous Button */}
            <div className="flex-1">
              {showPrevButton ? (
                <ButtonEnhanced
                  variant="secondary"
                  onClick={onPrev}
                  className="group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  {prevLabel}
                </ButtonEnhanced>
              ) : (
                <div /> // Spacer
              )}
            </div>

            {/* Step Counter (Mobile) */}
            <div className="flex-1 text-center">
              <span className="text-sm text-muted-foreground md:hidden">
                {currentStep} of {totalSteps}
              </span>
            </div>

            {/* Next Button */}
            <div className="flex-1 flex justify-end">
              {showNextButton && (
                <ButtonEnhanced
                  onClick={onNext}
                  disabled={nextDisabled}
                  className="group bg-accent hover:bg-accent/90 text-[var(--hive-text-primary)] font-medium"
                >
                  {nextLabel}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </ButtonEnhanced>
              )}
            </div>
          </motion.div>
        )}

        {/* Completion Indicator */}
        {currentStep === totalSteps && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center space-x-2 text-accent">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium">Almost there!</span>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}; 