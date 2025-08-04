// Temporary stub components to unblock production build
// TODO: Fix @hive/ui export resolution and remove these stubs

import React from 'react';

export function PageContainer({ 
  children, 
  title, 
  subtitle, 
  className = "",
  ...props 
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 ${className}`} {...props}>
      {title && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export function Alert({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 border rounded-lg bg-yellow-50 border-yellow-200 text-yellow-800 ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm">{children}</div>;
}

// Header components stubs
export function LandingPageHeader() {
  return (
    <div className="bg-black border-b border-white/10 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-white">HIVE</div>
      </div>
    </div>
  );
}

export function SchoolsPageHeader(props: any) {
  return <LandingPageHeader />;
}

export function AuthPageHeader() {
  return <LandingPageHeader />;
}

export function DashboardPageHeader() {
  return <LandingPageHeader />;
}

// Modal component stubs
export function HiveModalContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function HiveModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function HiveModalTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function HiveModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex gap-3">{children}</div>;
}

// Hook stubs
export function useOnboardingBridge() {
  return {
    currentStep: 0,
    totalSteps: 8,
    nextStep: () => {},
    prevStep: () => {},
    completeOnboarding: () => {},
    isLoading: false,
    error: null
  };
}

// Type stubs for missing @hive/ui types
export interface User {
  id: string;
  handle: string;
  name: string;
  email: string;
  avatar?: string;
  school: string;
  preferences: {
    privacy: 'public' | 'private' | 'friends-only';
    notifications: boolean;
  };
  isPrivate: boolean;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  type: string;
  memberCount: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  type: 'friend' | 'follow';
}

export interface HiveLabSection {
  id: string;
  title: string;
  description: string;
  tools: any[];
}