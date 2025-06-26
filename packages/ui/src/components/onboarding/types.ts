export interface StepProps {
  onSubmit: (data: Record<string, unknown> | null) => Promise<void>;
  onSkip?: () => void;
}

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<Record<string, unknown>>;
}; 