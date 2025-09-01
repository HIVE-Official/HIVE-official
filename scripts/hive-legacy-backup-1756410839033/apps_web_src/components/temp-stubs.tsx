// Temporary stub components to unblock production build
// TODO: Fix @hive/ui export resolution and remove these stubs

import React from 'react';
import Image from 'next/image';

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
          <h1 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">{title}</h1>
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

export function AlertDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-sm ${className}`}>{children}</div>;
}

// Header components stubs
export function LandingPageHeader() {
  return (
    <div className="bg-black border-b border-white/10 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/assets/hive-logo-white.svg"
              alt="HIVE Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div className="text-xl font-bold text-[var(--hive-text-inverse)]">HIVE</div>
        </div>
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
export function HiveModal({ 
  children, 
  open, 
  isOpen, 
  onOpenChange, 
  onClose, 
  size,
  title,
  showCloseButton 
}: { 
  children: React.ReactNode; 
  open?: boolean; 
  isOpen?: boolean;
  onOpenChange?: () => void; 
  onClose?: () => void;
  size?: string;
  title?: string;
  showCloseButton?: boolean;
}) {
  const modalIsOpen = open ?? isOpen ?? false;
  const handleClose = onOpenChange || onClose || (() => {});
  
  if (!modalIsOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleClose}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            {showCloseButton && (
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export function HiveModalContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function HiveModalHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function HiveModalTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function HiveModalFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-6 flex gap-3 ${className}`}>{children}</div>;
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