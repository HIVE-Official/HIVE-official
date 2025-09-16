// HIVE UI - Production Ready Exports
// Minimal working version with stubs for complex components

import React from 'react';

// === CORE UTILITIES ===
export { cn } from './lib/utils';

// === AUTH CONTEXT (working) ===
export { HiveAuthProvider, useHiveAuth, type HiveUser } from './contexts/hive-auth-context';
export { useHiveAuth as useAuth } from './contexts/hive-auth-context';

// === AUTH COMPONENTS (working) ===
export { EmailGate } from './components/auth/email-gate';
export { CheckEmailInfo } from './components/auth/CheckEmailInfo';
export { SchoolPick } from './components/auth/school-pick';

// === LOADING COMPONENTS (working) ===
export { LoadingOrchestrator as PageLoader } from './components/loading/LoadingOrchestrator';

// === BASIC UI COMPONENTS (working) ===
export { ButtonEnhanced as Button } from './atomic/atoms/button-enhanced';
export { InputEnhanced as Input } from './atomic/atoms/input-enhanced';
export { Card as HiveCard, Card } from './atomic/ui/card';
export { HiveBadge as Badge, HiveBadge } from './components/hive-badge';
export { HiveModal } from './components/hive-modal';
export { HiveLogo } from './components/hive-logo';

// === MOTION SYSTEM (working) ===
export { hiveVariants } from './lib/motion';

// === STUB COMPONENTS (for complex ones that have deep dependencies) ===

// Onboarding Components (stubs - to be replaced with working versions)
export const CreateProfileStep: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'p-8 text-center' }, 
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Create Profile'),
    React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Complete your profile to get started with HIVE.')
  );
};

export const AcademicStep: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'p-8 text-center' }, 
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Academic Information'),
    React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Tell us about your academic journey.')
  );
};

export const InterestsSelectionStep: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'p-8 text-center' }, 
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Select Your Interests'),
    React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Choose topics that interest you most.')
  );
};

export const WelcomeRoleStep: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'p-8 text-center' }, 
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Welcome to HIVE'),
    React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Select your role to personalize your experience.')
  );
};

export const AlumniComingSoonStep: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'p-8 text-center' }, 
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Alumni Access Coming Soon'),
    React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Alumni features will be available soon!')
  );
};

export const OnboardingCompleteStep: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'p-8 text-center' }, 
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Welcome to HIVE!'),
    React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Your profile is complete. Start exploring!')
  );
};

// Profile Components (stubs)
export const BentoProfileDashboard: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'p-8' }, 
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Profile Dashboard'),
    React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Your personalized dashboard will appear here.')
  );
};

// Spaces Components (stubs)
export const SpaceRequestForm: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'p-8' }, 
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Request a Space'),
    React.createElement('p', { className: 'text-[var(--hive-text-muted)]' }, 'Space request form will appear here.')
  );
};

// Form Components (stubs)
export const FormField: React.FC<any> = (props: any) => {
  return React.createElement('div', { className: 'mb-4' }, props.children);
};

// Basic UI Stubs
export const Checkbox: React.FC<any> = (props: any) => {
  return React.createElement('input', { type: 'checkbox', className: 'rounded border-[var(--hive-border-default)]', ...props });
};

export const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return React.createElement('div', { className: `container mx-auto px-4 ${className || ''}` }, children);
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return React.createElement('div', { className: `p-6 ${className || ''}` }, children);
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return React.createElement('div', { className: `p-6 pb-0 ${className || ''}` }, children);
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return React.createElement('h3', { className: `text-lg font-semibold ${className || ''}` }, children);
};

export const Label: React.FC<{ children: React.ReactNode; htmlFor?: string; className?: string }> = ({ children, htmlFor, className }) => {
  return React.createElement('label', { htmlFor, className: `block text-sm font-medium ${className || ''}` }, children);
};