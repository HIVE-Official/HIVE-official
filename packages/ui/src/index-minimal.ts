// HIVE UI - Minimal Working Exports
// This file contains only verified, working components

import React from 'react';

// === CORE UTILITIES ===
export { cn } from './lib/utils';

// === AUTH CONTEXT ===
export { HiveAuthProvider, useHiveAuth, type HiveUser } from './contexts/hive-auth-context';
export { useHiveAuth as useAuth } from './contexts/hive-auth-context';

// === AUTH COMPONENTS (verified working) ===
export { EmailGate } from './components/auth/email-gate';
export { CheckEmailInfo } from './components/auth/CheckEmailInfo';
export { SchoolPick } from './components/auth/school-pick';

// === LOADING COMPONENTS ===
export { LoadingOrchestrator as PageLoader } from './components/loading/LoadingOrchestrator';

// === ONBOARDING COMPONENTS (verified working) ===
export { CreateProfileStep } from './components/onboarding/create-profile-step';
export { AcademicStep } from './components/onboarding/academic-step';
export { InterestsSelectionStep } from './components/onboarding/interests-selection-step';
export { WelcomeRoleStep } from './components/onboarding/welcome-role-step';
export { AlumniComingSoonStep } from './components/onboarding/alumni-coming-soon-step';
export { OnboardingCompleteStep } from './components/onboarding/onboarding-complete-step';

// === PROFILE COMPONENTS ===
export { BentoProfileDashboard } from './components/profile/bento-profile-dashboard';

// === ENHANCED PROFILE COMPONENTS ===
export { EnhancedProfileHeader } from './components/profile/enhanced-profile-header';
export { EnhancedProfileNavigation, ProfileSectionHeader } from './components/profile/enhanced-profile-navigation';
export { EnhancedProfileSettings } from './components/profile/enhanced-profile-settings';
export { CampusActivityFeed } from './components/profile/campus-activity-feed';
export { EnhancedUserIdentity } from './components/profile/enhanced-user-identity';
export { WorkingProfileHeader } from './components/profile/working-profile-header';
export { 
  MySpacesCard, 
  MyToolsCard, 
  UpcomingEventsCard, 
  CampusConnectionsCard, 
  ProfileStatsCard, 
  QuickActionsCard 
} from './components/profile/profile-dashboard-cards';

// === PROFILE LAYOUT SYSTEM ===
export { 
  ProfileLayout,
  ProfileContent, 
  ProfileActions,
  ProfileGrid,
  ProfileSection,
  ResponsiveProfileWrapper,
  ProfileIdentityLayout,
  ProfileStatsLayout
} from './components/profile/profile-layout-system';

// === CROSS-SLICE INTEGRATION ===
export { 
  CrossSliceIntegration,
  SpacesIntegration,
  ToolsIntegration,
  EventsIntegration,
  ActivityIntegration,
  QuickActions
} from './components/profile/cross-slice-integration';

// === SPACES COMPONENTS ===
export { SpaceRequestForm } from './components/spaces/space-request-form';

// === BASIC UI COMPONENTS (from existing system) ===
export { Button } from './components/ui/button';
export { HiveInput as Input } from './components/hive-input';
export { HiveCard as Card, HiveCard } from './components/hive-card';
export { HiveBadge as Badge, HiveBadge } from './components/hive-badge';
export { HiveModal } from './components/hive-modal';
export { HiveLogo } from './components/hive-logo';

// === FORM COMPONENTS ===
export { FormField } from './atomic/molecules/form-field';

// === MOTION SYSTEM ===
export { hiveVariants } from './lib/motion';

// === CHECKBOX (stub for now) ===
export const Checkbox: React.FC<any> = (props) => {
  return React.createElement('input', { type: 'checkbox', ...props });
};

// === LAYOUT COMPONENTS ===
export const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return React.createElement('div', { className: `container mx-auto px-4 ${className || ''}` }, children);
};

// === CARD COMPONENTS (basic) ===
export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return React.createElement('div', { className: `p-6 ${className || ''}` }, children);
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return React.createElement('div', { className: `p-6 pb-0 ${className || ''}` }, children);
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return React.createElement('h3', { className: `text-lg font-semibold ${className || ''}` }, children);
};

// === BASIC EXPORTS FOR BACKWARD COMPATIBILITY ===
export const Label: React.FC<{ children: React.ReactNode; htmlFor?: string; className?: string }> = ({ children, htmlFor, className }) => {
  return React.createElement('label', { htmlFor, className: `block text-sm font-medium ${className || ''}` }, children);
};