// HIVE UI - Production Ready Exports
// Minimal working version with stubs for complex components
import React from 'react';
// === CORE UTILITIES ===
export { cn } from './lib/utils';
// === AUTH CONTEXT (working) ===
export { HiveAuthProvider, useHiveAuth } from './contexts/hive-auth-context';
export { useHiveAuth as useAuth } from './contexts/hive-auth-context';
// === AUTH COMPONENTS (working) ===
export { EmailGate } from './components/auth/email-gate';
export { CheckEmailInfo } from './components/auth/CheckEmailInfo';
export { SchoolPick } from './components/auth/school-pick';
// === LOADING COMPONENTS (working) ===
export { LoadingOrchestrator as PageLoader } from './components/Loading/LoadingOrchestrator';
// === BASIC UI COMPONENTS (working) ===
export { ButtonEnhanced as Button } from './atomic/atoms/button-enhanced';
export { InputEnhanced as Input } from './atomic/atoms/input-enhanced';
export { HiveCard as Card, HiveCard } from './components/hive-card';
export { HiveBadge as Badge, HiveBadge } from './components/hive-badge';
export { HiveModal } from './components/hive-modal';
export { HiveLogo } from './components/hive-logo';
// === MOTION SYSTEM (working) ===
export { hiveVariants } from './lib/motion';
// === STUB COMPONENTS (for complex ones that have deep dependencies) ===
// Onboarding Components (stubs - to be replaced with working versions)
export const CreateProfileStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Create Profile'), React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Complete your profile to get started with HIVE.'));
};
export const AcademicStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Academic Information'), React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Tell us about your academic journey.'));
};
export const InterestsSelectionStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Select Your Interests'), React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Choose topics that interest you most.'));
};
export const WelcomeRoleStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Welcome to HIVE'), React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Select your role to personalize your experience.'));
};
export const AlumniComingSoonStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Alumni Access Coming Soon'), React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Alumni features will be available soon!'));
};
export const OnboardingCompleteStep = (props) => {
    return React.createElement('div', { className: 'p-8 text-center' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Welcome to HIVE!'), React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Your profile is complete. Start exploring!'));
};
// Profile Components (stubs)
export const BentoProfileDashboard = (props) => {
    return React.createElement('div', { className: 'p-8' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Profile Dashboard'), React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Your personalized dashboard will appear here.'));
};
// Spaces Components (stubs)
export const SpaceRequestForm = (props) => {
    return React.createElement('div', { className: 'p-8' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Request a Space'), React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Space request form will appear here.'));
};
// Form Components (stubs)
export const FormField = (props) => {
    return React.createElement('div', { className: 'mb-4' }, props.children);
};
// Basic UI Stubs
export const Checkbox = (props) => {
    return React.createElement('input', { type: 'checkbox', className: 'rounded border-[var(--hive-border-default)]', ...props });
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