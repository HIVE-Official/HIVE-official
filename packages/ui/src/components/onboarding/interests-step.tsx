"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { Button } from '../button';
import { Loader2 } from 'lucide-react';
import { StepProps } from './types';

const AVAILABLE_INTERESTS = [
  'Technology',
  'Sports',
  'Music',
  'Art & Design',
  'Photography',
  'Gaming',
  'Fitness',
  'Travel',
  'Food & Cooking',
  'Books & Reading',
  'Movies & TV',
  'Politics',
  'Environment',
  'Volunteering',
  'Entrepreneurship',
  'Science',
  'Fashion',
  'Social Media',
  'Academic Research',
  'Mental Health'
];

export const InterestsStep: React.FC<StepProps> = ({ onSubmit, onSkip }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit({ interests: selectedInterests });
    } catch {
      // console.error("Failed to submit interests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      void onSubmit({ interests: [] });
    }
  };

  return (
    <Card className="w-full max-w-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">What are you interested in?</CardTitle>
        <CardDescription className="text-muted-foreground">
          Select your interests to help us personalize your experience and connect you with like-minded peers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_INTERESTS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`
                px-3 py-2 text-sm rounded-md border transition-colors text-left
                ${selectedInterests.includes(interest)
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-surface-01 text-foreground border-border hover:bg-surface-02'
                }
              `}
            >
              {interest}
            </button>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Selected: {selectedInterests.length} interests
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip for now
          </Button>
          <Button
            type="button"
            variant="ritual"
            onClick={handleSubmit}
            className="flex-1"
            disabled={selectedInterests.length === 0 || isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Continue ({selectedInterests.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 