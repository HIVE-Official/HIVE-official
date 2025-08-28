// HIVE UI - Production Ready Exports
// Minimal working version with stubs for complex components
import React from 'react';
// === CORE UTILITIES ===
export { cn } from './ui/src/lib/utils';
// === AUTH CONTEXT (working) ===
export { HiveAuthProvider, useHiveAuth } from './ui/src/contexts/hive-auth-context';
export { useHiveAuth as useAuth } from './ui/src/contexts/hive-auth-context';
// === AUTH COMPONENTS (working) ===
export { EmailGate } from './ui/src/components/auth/email-gate';
export { CheckEmailInfo } from './ui/src/components/auth/CheckEmailInfo';
export { SchoolPick } from './ui/src/components/auth/school-pick';
// === LOADING COMPONENTS (working) ===
export { LoadingOrchestrator as PageLoader } from './ui/src/components/Loading/LoadingOrchestrator';
// === BASIC UI COMPONENTS (working) ===
export { HiveButton as Button } from './ui/src/components/hive-button';
export { HiveInput as Input } from './ui/src/components/hive-input';
export { HiveCard as Card, HiveCard } from './ui/src/components/hive-card';
export { HiveBadge as Badge, HiveBadge } from './ui/src/components/hive-badge';
export { HiveModal } from './ui/src/components/hive-modal';
export { HiveLogo } from './ui/src/components/hive-logo';
// === MOTION SYSTEM (working) ===
export { hiveVariants } from './ui/src/lib/motion';
// === STUB COMPONENTS (for complex ones that have deep dependencies) ===
// Onboarding Components (stubs - to be replaced with working versions)
export const CreateProfileStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Create Profile'), React.createElement('p', { className: 'text-gray-600' }, 'Complete your profile to get started with HIVE.'));
};
export const AcademicStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Academic Information'), React.createElement('p', { className: 'text-gray-600' }, 'Tell us about your academic journey.'));
};
export const InterestsSelectionStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Select Your Interests'), React.createElement('p', { className: 'text-gray-600' }, 'Choose topics that interest you most.'));
};
export const WelcomeRoleStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Welcome to HIVE'), React.createElement('p', { className: 'text-gray-600' }, 'Select your role to personalize your experience.'));
};
export const AlumniComingSoonStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Alumni Access Coming Soon'), React.createElement('p', { className: 'text-gray-600' }, 'Alumni features will be available soon!'));
};
export const OnboardingCompleteStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Welcome to HIVE!'), React.createElement('p', { className: 'text-gray-600' }, 'Your profile is complete. Start exploring!'));
};
// Profile Components (stubs)
export const BentoProfileDashboard = (props) => {
    return React.createElement('div', { className: 'p-8' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Profile Dashboard'), React.createElement('p', { className: 'text-gray-600' }, 'Your personalized dashboard will appear here.'));
};
// Spaces Components (stubs)
export const SpaceRequestForm = (props) => {
    return React.createElement('div', { className: 'p-8' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Request a Space'), React.createElement('p', { className: 'text-gray-600' }, 'Space request form will appear here.'));
};
// Form Components (stubs)
export const FormField = (props) => {
    return React.createElement('div', { className: 'mb-4' }, props.children);
};
// Basic UI Stubs
export const Checkbox = (props) => {
    return React.createElement('input', { type: 'checkbox', className: 'rounded border-gray-300', ...props });
};
export const PageContainer = ({ children, className }) => {
    return React.createElement('div', { className: `container mx-auto px-4 ${className || ''}` }, children);
};
export const CardContent = ({ children, className }) => {
    return React.createElement('div', { className: `p-6 ${className || ''}` }, children);
};
export const CardHeader = ({ children, className }) => {
    return React.createElement('div', { className: `p-6 pb-0 ${className || ''}` }, children);
};
export const CardTitle = ({ children, className }) => {
    return React.createElement('h3', { className: `text-lg font-semibold ${className || ''}` }, children);
};
export const Label = ({ children, htmlFor, className }) => {
    return React.createElement('label', { htmlFor, className: `block text-sm font-medium ${className || ''}` }, children);
};
//# sourceMappingURL=index-production.js.map