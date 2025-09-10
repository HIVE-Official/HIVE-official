// HIVE UI - Minimal Working Exports
// This file contains only verified, working components
import React from 'react';
// === CORE UTILITIES ===
export { cn } from './lib/utils.js';
// === AUTH CONTEXT ===
export { HiveAuthProvider, useHiveAuth } from './contexts/hive-auth-context.js';
export { useHiveAuth as useAuth } from './contexts/hive-auth-context.js';
// === AUTH COMPONENTS (verified working) ===
export { EmailGate } from './components/auth/email-gate.js';
export { CheckEmailInfo } from './components/auth/CheckEmailInfo.js';
export { SchoolPick } from './components/auth/school-pick.js';
// === LOADING COMPONENTS ===
export { LoadingOrchestrator as PageLoader } from './components/loading/LoadingOrchestrator.js';
// === ONBOARDING COMPONENTS (temporarily commented - components need to be created) ===
// export { CreateProfileStep } from './components/onboarding/create-profile-step';
// export { AcademicStep } from './components/onboarding/academic-step';
// export { InterestsStep } from './components/onboarding/interests-step';
// export { WelcomeRoleStep } from './components/onboarding/welcome-role-step';
// export { AlumniComingSoonStep } from './components/onboarding/alumni-coming-soon-step';
// export { OnboardingCompleteStep } from './components/onboarding/onboarding-complete-step';
// === PROFILE COMPONENTS (temporarily commented - components need to be created) ===
// export { BentoProfileDashboard } from './components/profile/bento-profile-dashboard';
// export { EnhancedProfileHeader } from './components/profile/enhanced-profile-header';
// export { EnhancedProfileNavigation, ProfileSectionHeader } from './components/profile/enhanced-profile-navigation';
// export { EnhancedProfileSettings } from './components/profile/enhanced-profile-settings';
// export { CampusActivityFeed } from './components/profile/campus-activity-feed';
// export { EnhancedUserIdentity } from './components/profile/enhanced-user-identity';
// export { WorkingProfileHeader } from './components/profile/working-profile-header';
// export { 
//   MySpacesCard, 
//   MyToolsCard, 
//   UpcomingEventsCard, 
//   CampusConnectionsCard, 
//   ProfileStatsCard, 
//   QuickActionsCard 
// } from './components/profile/profile-dashboard-cards';
// === PROFILE LAYOUT SYSTEM (temporarily commented - components need to be created) ===
// export { 
//   ProfileLayout,
//   ProfileContent, 
//   ProfileActions,
//   ProfileGrid,
//   ProfileSection,
//   ResponsiveProfileWrapper,
//   ProfileIdentityLayout,
//   ProfileStatsLayout
// } from './components/profile/profile-layout-system';
// === CROSS-SLICE INTEGRATION (temporarily commented - components need to be created) ===
// export { 
//   CrossSliceIntegration,
//   SpacesIntegration,
//   ToolsIntegration,
//   EventsIntegration,
//   ActivityIntegration,
//   QuickActions
// } from './components/profile/cross-slice-integration';
// === SPACES COMPONENTS (temporarily commented - components need to be created) ===
// export { SpaceRequestForm } from './components/spaces/space-request-form';
// === BASIC UI COMPONENTS (from existing system) ===
export { ButtonEnhanced as Button } from './atomic/atoms/button-enhanced.js';
export { HiveInput as Input } from './components/hive-input.js';
export { HiveCard as Card, HiveCard } from './components/hive-card.js';
export { HiveBadge as Badge, HiveBadge } from './components/hive-badge.js';
export { HiveModal } from './components/hive-modal.js';
export { HiveLogo } from './components/hive-logo.js';
// === FORM COMPONENTS ===
export { FormField } from './atomic/molecules/form-field.js';
// === MOTION SYSTEM ===
export { hiveVariants } from './lib/motion.js';
// === CHECKBOX (stub for now) ===
export const Checkbox = (props) => {
    return React.createElement('input', { type: 'checkbox', ...props });
};
// === LAYOUT COMPONENTS ===
export const PageContainer = ({ children, className }) => {
    return React.createElement('div', { className: `container mx-auto px-4 ${className || ''}` }, children);
};
// === CARD COMPONENTS (basic) ===
export const CardContent = ({ children, className }) => {
    return React.createElement('div', { className: `p-6 ${className || ''}` }, children);
};
export const CardHeader = ({ children, className }) => {
    return React.createElement('div', { className: `p-6 pb-0 ${className || ''}` }, children);
};
export const CardTitle = ({ children, className }) => {
    return React.createElement('h3', { className: `text-lg font-semibold ${className || ''}` }, children);
};
// === BASIC EXPORTS FOR BACKWARD COMPATIBILITY ===
export const Label = ({ children, htmlFor, className }) => {
    return React.createElement('label', { htmlFor, className: `block text-sm font-medium ${className || ''}` }, children);
};
//# sourceMappingURL=index-minimal.js.map