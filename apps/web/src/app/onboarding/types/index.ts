// Re-export core types to create single import point for onboarding
export type {
  OnboardingState,
  AcademicLevel,
  VerificationLevel,
  SpaceType,
  SpaceClaim
} from '@hive/core/types/onboarding';

export type {
  OnboardingSession,
  OnboardingStep as OnboardingFlowStep,
  OnboardingError,
  WaitlistEntry,
  SchoolInvitation
} from '@hive/core/domain/firestore/onboarding';

// Local types specific to the web onboarding flow
export interface OnboardingProfile {
  // Basic identity
  firstName: string;
  lastName: string;
  handle: string;
  email: string;
  userType: 'student' | 'faculty' | 'alumni';
  
  // Academic info
  graduationYear?: number;
  major?: string;
  department?: string;
  spaceRequest?: string;
  
  // Campus life
  livingArrangement?: string;
  campusGoals: string[];
  
  // Preferences
  interests: string[];
  selectedSpaces: string[];
  
  // Completion
  consentGiven: boolean;
}

// UI-specific types
export interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: number;
}

export interface StepComponentProps {
  profile: OnboardingProfile;
  updateProfile: (updates: Partial<OnboardingProfile>) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
  validationMessage?: string;
}