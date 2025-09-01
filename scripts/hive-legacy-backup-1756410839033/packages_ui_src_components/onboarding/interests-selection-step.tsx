"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Heart, Loader2, Sparkles } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';

export interface InterestsSelectionStepProps {
  selectedInterests: string[];
  onInterestToggle: (interest: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
  interestCategories: Record<string, string[]>;
  minInterests?: number;
}

export const InterestsSelectionStep: React.FC<InterestsSelectionStepProps> = ({
  selectedInterests,
  onInterestToggle,
  onSubmit,
  onBack,
  isLoading,
  interestCategories,
  minInterests = 3
}) => {
  useAdaptiveMotion('academic'); // For consistency with motion system
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(interestCategories))
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const isSubmitDisabled = selectedInterests.length < minInterests || isLoading;

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
                  index < 3 ? 'bg-white' : index === 3 ? 'bg-accent' : 'bg-muted'
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
            className="text-center space-y-4"
            variants={hiveVariants.item}
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground">
                What interests you?
              </h1>
              <p className="text-muted font-body mt-2">
                Select at least {minInterests} interests to help us connect you with relevant communities
              </p>
            </div>
            {/* Selection counter */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent font-body">
                {selectedInterests.length} interests selected
                {selectedInterests.length < minInterests && 
                  ` • select ${minInterests - selectedInterests.length} more`
                }
              </span>
            </div>
          </motion.div>
          
          {/* Interest categories */}
          <motion.div 
            className="space-y-6 max-h-96 overflow-y-auto"
            variants={hiveVariants.container}
          >
            {Object.entries(interestCategories).map(([category, interests]) => (
              <motion.div 
                key={category} 
                className="space-y-4"
                variants={hiveVariants.item}
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-sm font-medium text-foreground font-body">
                    {category}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedCategories.has(category) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted"
                  >
                    ↓
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: expandedCategories.has(category) ? 'auto' : 0,
                    opacity: expandedCategories.has(category) ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest: string) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <motion.button
                          key={interest}
                          onClick={() => onInterestToggle(interest)}
                          className={`px-3 py-2 rounded-lg text-sm font-body transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                            isSelected
                              ? 'border-2 border-accent bg-accent/10 text-accent hover:bg-accent/20'
                              : 'border-2 border-border bg-surface-01 text-muted hover:bg-surface-02 hover:border-accent/30 hover:text-accent'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {interest}
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-1"
                            >
                              ✓
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation buttons */}
          <motion.div 
            className="flex gap-3 pt-4"
            variants={hiveVariants.item}
          >
            <ButtonEnhanced
              variant="secondary"
              onClick={onBack}
              className="flex-1 font-body"
              disabled={isLoading}
            >
              Back
            </ButtonEnhanced>
            <ButtonEnhanced
              variant="primary"
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="flex-1 font-body"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Completing...
                </>
              ) : (
                'Complete Setup'
              )}
            </ButtonEnhanced>
          </motion.div>
        </motion.div>

        {/* Step indicator */}
        <motion.div 
          className="text-center mt-6"
          variants={hiveVariants.item}
        >
          <p className="text-sm text-muted font-body">
            Step 4 of 4
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};