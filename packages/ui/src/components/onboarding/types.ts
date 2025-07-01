import React from 'react';

export interface StepProps {
  onSubmit: (data: Record<string, unknown> | null) => Promise<void>;
  onSkip?: () => void;
  initialInterests?: string[];
}

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<Record<string, unknown>>;
}; 