// Export atomic components (primary design system)
export * from './atomic';

// Export contexts
export * from './contexts/hive-auth-context';
export * from './contexts/unified-auth-context'; // Keep for backward compatibility during transition

// Export hooks
export * from './hooks';

// Export utilities
export * from './lib/utils';

// TEMPORARY: Direct export of critical components until atomic export chain is fixed
export { FormField } from './components/form-field';
export { hiveVariants } from './lib/motion';
export { InputEnhanced } from './atomic/atoms/input-enhanced';
export { Textarea as TextAreaEnhanced } from './atomic/atoms/textarea-enhanced';

// Missing critical exports for production build
export { Avatar, AvatarImage, AvatarFallback } from './atomic/atoms/avatar';
export { Container } from './atomic/atoms/container';

// Typography exports
export { 
  Heading, 
  Text, 
  Caption, 
  Link, 
  Code, 
  Blockquote, 
  List, 
  ListItem,
  TypographyPresets 
} from './atomic/atoms/typography';
export type { 
  HeadingProps, 
  TextProps, 
  CaptionProps, 
  LinkProps, 
  CodeProps, 
  BlockquoteProps, 
  ListProps, 
  ListItemProps 
} from './atomic/atoms/typography';

// Create Typography alias for backward compatibility
export { Text as Typography } from './atomic/atoms/typography';

// Auth hook export
export { useHiveAuth } from './contexts/hive-auth-context';

// Onboarding components that need to be available
export { CreateProfileStep } from './components/onboarding/create-profile-step';
export { AcademicStep } from './components/onboarding/academic-step'; 
export { InterestsSelectionStep } from './components/onboarding/interests-step';
export { WelcomeRoleStep } from './components/onboarding/welcome-role-step';
export { RoleSelectionStep } from './components/onboarding/role-selection-step';
export { FacultyVerificationStep } from './components/onboarding/faculty-verification-step';
export { AlumniComingSoonStep } from './components/onboarding/alumni-coming-soon-step';
export { OnboardingCompleteStep } from './components/onboarding/onboarding-complete-step';

// Profile system components
export { BentoProfileDashboard } from './components/profile/bento-profile-dashboard';
export { HiveProgress } from './components/hive-progress';

// Missing Form components
export { SpaceRequestForm } from './components/spaces/space-request-form'; 
