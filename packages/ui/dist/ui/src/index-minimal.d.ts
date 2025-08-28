import React from 'react';
export { cn } from './lib/utils';
export { HiveAuthProvider, useHiveAuth, type HiveUser } from './contexts/hive-auth-context';
export { useHiveAuth as useAuth } from './contexts/hive-auth-context';
export { EmailGate } from './components/auth/email-gate';
export { CheckEmailInfo } from './components/auth/CheckEmailInfo';
export { SchoolPick } from './components/auth/school-pick';
export { LoadingOrchestrator as PageLoader } from './components/loading/LoadingOrchestrator';
export { CreateProfileStep } from './components/onboarding/create-profile-step';
export { AcademicStep } from './components/onboarding/academic-step';
export { InterestsSelectionStep } from './components/onboarding/interests-selection-step';
export { WelcomeRoleStep } from './components/onboarding/welcome-role-step';
export { AlumniComingSoonStep } from './components/onboarding/alumni-coming-soon-step';
export { OnboardingCompleteStep } from './components/onboarding/onboarding-complete-step';
export { BentoProfileDashboard } from './components/profile/bento-profile-dashboard';
export { EnhancedProfileHeader } from './components/profile/enhanced-profile-header';
export { EnhancedProfileNavigation, ProfileSectionHeader } from './components/profile/enhanced-profile-navigation';
export { EnhancedProfileSettings } from './components/profile/enhanced-profile-settings';
export { CampusActivityFeed } from './components/profile/campus-activity-feed';
export { EnhancedUserIdentity } from './components/profile/enhanced-user-identity';
export { WorkingProfileHeader } from './components/profile/working-profile-header';
export { MySpacesCard, MyToolsCard, UpcomingEventsCard, CampusConnectionsCard, ProfileStatsCard, QuickActionsCard } from './components/profile/profile-dashboard-cards';
export { ProfileLayout, ProfileContent, ProfileActions, ProfileGrid, ProfileSection, ResponsiveProfileWrapper, ProfileIdentityLayout, ProfileStatsLayout } from './components/profile/profile-layout-system';
export { CrossSliceIntegration, SpacesIntegration, ToolsIntegration, EventsIntegration, ActivityIntegration, QuickActions } from './components/profile/cross-slice-integration';
export { SpaceRequestForm } from './components/spaces/space-request-form';
export { Button } from './components/ui/button';
export { HiveInput as Input } from './components/hive-input';
export { HiveCard as Card, HiveCard } from './components/hive-card';
export { HiveBadge as Badge, HiveBadge } from './components/hive-badge';
export { HiveModal } from './components/hive-modal';
export { HiveLogo } from './components/hive-logo';
export { FormField } from './atomic/molecules/form-field';
export { hiveVariants } from './lib/motion';
export declare const Checkbox: React.FC<any>;
export declare const PageContainer: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const CardContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const CardHeader: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const CardTitle: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const Label: React.FC<{
    children: React.ReactNode;
    htmlFor?: string;
    className?: string;
}>;
//# sourceMappingURL=index-minimal.d.ts.map