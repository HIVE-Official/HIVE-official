import React, { useCallback } from "react";
import { type OnboardingStepName } from "@hive/core";
import { type AuthUser } from "@hive/auth-logic";
import {
  AcademicCardStep as _UIAcademicCardStep,
  AvatarUploadStep as UIAvatarUploadStep,
  InterestsStep as UIInterestsStep,
  OnboardingCompleteStep as _UIOnboardingCompleteStep,
  type StepProps as _UIStepProps
} from "@hive/ui";

interface StepProps {
  user: AuthUser;
  onNext: (nextStep?: number) => void;
  onPrev?: () => void;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  setCompletedSteps: (updater: (prev: OnboardingStepName[]) => OnboardingStepName[]) => void;
}

export const AvatarUploadStep: React.FC<StepProps> = ({ onNext, onSubmit, setCompletedSteps }) => {
  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps((prev) => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async (data: Record<string, unknown> | null) => {
    await onSubmit(data || {});
    handleStepComplete("photo");
    onNext();
  };

  const handleSkip = () => {
    onNext();
  };

  return <UIAvatarUploadStep onSubmit={handleSubmit} onSkip={handleSkip} />;
};

export const InterestsStep: React.FC<StepProps> = ({ onNext, onSubmit, setCompletedSteps }) => {
  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps((prev) => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async (data: Record<string, unknown> | null) => {
    await onSubmit(data || {});
    handleStepComplete("interests");
    onNext();
  };

  const handleSkip = () => {
    onNext();
  };

  return <UIInterestsStep onSubmit={handleSubmit} onSkip={handleSkip} />;
}; 