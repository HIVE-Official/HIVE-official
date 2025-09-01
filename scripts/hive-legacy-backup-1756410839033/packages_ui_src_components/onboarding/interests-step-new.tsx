"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Calculator, FlaskConical, Globe, Music, Camera, Gamepad2, Dumbbell, Coffee, BookOpen, Users, Plus, X } from 'lucide-react';
import { Button } from '../button';
import { Card, CardContent } from '../card';
import { Input } from '../input';
import { cn } from '../lib/utils';

interface Interest {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: 'academic' | 'creative' | 'social' | 'lifestyle';
}

interface InterestsStepProps {
  onInterestsChange: (interests: string[]) => void;
  onContinue: () => void;
  selectedInterests?: string[];
  className?: string;
}

const PREDEFINED_INTERESTS: Interest[] = [
  // Academic
  { id: 'computer-science', name: 'Computer Science', icon: <Code className="w-4 h-4" />, category: 'academic' },
  { id: 'mathematics', name: 'Mathematics', icon: <Calculator className="w-4 h-4" />, category: 'academic' },
  { id: 'science', name: 'Science & Research', icon: <FlaskConical className="w-4 h-4" />, category: 'academic' },
  { id: 'languages', name: 'Languages', icon: <Globe className="w-4 h-4" />, category: 'academic' },
  { id: 'literature', name: 'Literature', icon: <BookOpen className="w-4 h-4" />, category: 'academic' },
  
  // Creative
  { id: 'design', name: 'Design & Art', icon: <Palette className="w-4 h-4" />, category: 'creative' },
  { id: 'music', name: 'Music', icon: <Music className="w-4 h-4" />, category: 'creative' },
  { id: 'photography', name: 'Photography', icon: <Camera className="w-4 h-4" />, category: 'creative' },
  
  // Social
  { id: 'gaming', name: 'Gaming', icon: <Gamepad2 className="w-4 h-4" />, category: 'social' },
  { id: 'community', name: 'Community Service', icon: <Users className="w-4 h-4" />, category: 'social' },
  
  // Lifestyle
  { id: 'fitness', name: 'Fitness & Sports', icon: <Dumbbell className="w-4 h-4" />, category: 'lifestyle' },
  { id: 'food', name: 'Food & Cooking', icon: <Coffee className="w-4 h-4" />, category: 'lifestyle' }
];

const CATEGORY_LABELS = {
  academic: 'Academic',
  creative: 'Creative',
  social: 'Social',
  lifestyle: 'Lifestyle'
};

export const InterestsStepNew: React.FC<InterestsStepProps> = ({
  onInterestsChange,
  onContinue,
  selectedInterests = [],
  className
}) => {
  const [localSelectedInterests, setLocalSelectedInterests] = useState<string[]>(selectedInterests);
  const [customInterest, setCustomInterest] = useState('');
  const [customInterests, setCustomInterests] = useState<string[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleInterestToggle = (interestId: string) => {
    const newInterests = localSelectedInterests.includes(interestId)
      ? localSelectedInterests.filter(id => id !== interestId)
      : [...localSelectedInterests, interestId];
    
    setLocalSelectedInterests(newInterests);
    onInterestsChange([...newInterests, ...customInterests]);
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !customInterests.includes(customInterest.trim())) {
      const newCustomInterests = [...customInterests, customInterest.trim()];
      setCustomInterests(newCustomInterests);
      setCustomInterest('');
      setShowCustomInput(false);
      onInterestsChange([...localSelectedInterests, ...newCustomInterests]);
    }
  };

  const handleRemoveCustomInterest = (interest: string) => {
    const newCustomInterests = customInterests.filter(i => i !== interest);
    setCustomInterests(newCustomInterests);
    onInterestsChange([...localSelectedInterests, ...newCustomInterests]);
  };

  const allSelectedInterests = [...localSelectedInterests, ...customInterests];
  const canContinue = allSelectedInterests.length >= 3;

  const categorizedInterests = PREDEFINED_INTERESTS.reduce((acc, interest) => {
    if (!acc[interest.category]) {
      acc[interest.category] = [];
    }
    acc[interest.category].push(interest);
    return acc;
  }, {} as Record<string, Interest[]>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-3xl mx-auto", className)}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--hive-text-inverse)] mb-3">What are you interested in?</h1>
        <p className="text-lg text-muted">
          Select at least 3 interests to help us recommend relevant spaces and content
        </p>
        <div className="mt-2 text-sm text-muted">
          {allSelectedInterests.length}/3+ selected
        </div>
      </div>

      <div className="space-y-8">
        {/* Interest Categories */}
        {Object.entries(categorizedInterests).map(([category, interests]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--hive-text-inverse)]">
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    variant={localSelectedInterests.includes(interest.id) ? "accent" : "interactive"}
                    padding="sm"
                    className="cursor-pointer transition-all duration-200 hover:scale-105"
                    onClick={() => handleInterestToggle(interest.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          localSelectedInterests.includes(interest.id)
                            ? "bg-accent/20 text-accent"
                            : "bg-surface text-[var(--hive-text-inverse)]"
                        )}>
                          {interest.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[var(--hive-text-inverse)] text-sm truncate">
                            {interest.name}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Interests */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--hive-text-inverse)]">Custom Interests</h2>
            {!showCustomInput && (
              <ButtonEnhanced
                variant="secondary"
                size="sm"
                onClick={() => setShowCustomInput(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Custom
              </ButtonEnhanced>
            )}
          </div>

          {/* Custom Interest Input */}
          <AnimatePresence>
            {showCustomInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2"
              >
                <InputEnhanced
                  type="text"
                  placeholder="Enter custom interest..."
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomInterest()}
                  className="flex-1"
                />
                <ButtonEnhanced
                  variant="primary"
                  size="sm"
                  onClick={handleAddCustomInterest}
                  disabled={!customInterest.trim()}
                >
                  Add
                </ButtonEnhanced>
                <ButtonEnhanced
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomInterest('');
                  }}
                >
                  Cancel
                </ButtonEnhanced>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom Interest Tags */}
          {customInterests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customInterests.map((interest) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-accent/20 text-accent px-3 py-2 rounded-lg text-sm"
                >
                  <span>{interest}</span>
                  <button
                    onClick={() => handleRemoveCustomInterest(interest)}
                    className="hover:bg-accent/30 rounded p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Progress and Continue */}
        <div className="flex flex-col items-center gap-4 pt-6">
          <div className="text-center">
            <div className={cn(
              "text-sm font-medium mb-2",
              canContinue ? "text-accent" : "text-muted"
            )}>
              {canContinue 
                ? "Great! You've selected enough interests" 
                : `Select ${3 - allSelectedInterests.length} more interest${3 - allSelectedInterests.length === 1 ? '' : 's'} to continue`
              }
            </div>
            {canContinue && (
              <div className="text-xs text-muted">
                You can always adjust these later in your profile
              </div>
            )}
          </div>

          <ButtonEnhanced
            variant="primary"
            size="lg"
            onClick={onContinue}
            disabled={!canContinue}
            className="min-w-[140px]"
          >
            Continue
          </ButtonEnhanced>
        </div>
      </div>
    </motion.div>
  );
};