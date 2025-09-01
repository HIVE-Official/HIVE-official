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
export function Modal({ 
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

export function ModalContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function ModalHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function ModalTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function ModalFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-6 flex gap-3 ${className}`}>{children}</div>;
}

// Modal component is already exported above

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

// Additional missing component exports
export function Text({ 
  children, 
  className = "", 
  as = "p",
  color,
  size,
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  as?: keyof JSX.IntrinsicElements;
  color?: string;
  size?: string;
  [key: string]: any;
}) {
  const Component = as;
  const colorClasses = {
    medium: "text-gray-600",
    muted: "text-gray-500",
    primary: "text-gray-900",
    secondary: "text-gray-700",
  };
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xl: "text-xl",
  };
  const colorClass = color ? (colorClasses[color as keyof typeof colorClasses] || '') : '';
  const sizeClass = size ? (sizeClasses[size as keyof typeof sizeClasses] || '') : '';
  return React.createElement(Component, { 
    className: `${colorClass} ${sizeClass} ${className}`,
    ...props 
  }, children);
}

export const Typography = Text;

export function Button({ 
  children, 
  className = "", 
  variant = "default",
  size = "md",
  disabled = false,
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: string;
  size?: string;
  disabled?: boolean;
  [key: string]: any;
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantStyles = {
    default: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
  };
  const sizeStyles = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6 text-lg",
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant as keyof typeof variantStyles] || variantStyles.default} ${sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export const ButtonEnhanced = Button;

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-lg shadow-sm border ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function Badge({ children, className = "", variant, ...props }: { children: React.ReactNode; className?: string; variant?: string; [key: string]: any }) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-gray-200 text-gray-900",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    primary: "bg-blue-100 text-blue-800",
  };
  const variantClass = variant ? (variantClasses[variant as keyof typeof variantClasses] || variantClasses.default) : variantClasses.default;
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variantClass} ${className}`} {...props}>{children}</span>;
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Input({ className = "", ...props }: { className?: string; [key: string]: any }) {
  return <input className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />;
}

export function FormField({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

export function Display({ children, className = "", size, ...props }: { children: React.ReactNode; className?: string; size?: string; [key: string]: any }) {
  const sizeClasses = {
    small: "text-2xl font-bold",
    medium: "text-3xl font-bold",
    large: "text-4xl font-bold",
    xl: "text-5xl font-bold",
  };
  const sizeClass = size ? (sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.large) : "text-4xl font-bold";
  return <h1 className={`${sizeClass} ${className}`} {...props}>{children}</h1>;
}

export function Heading({ children, className = "", level = 2, ...props }: { children: React.ReactNode; className?: string; level?: number; [key: string]: any }) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeClasses = {
    1: "text-4xl font-bold",
    2: "text-2xl font-semibold", 
    3: "text-xl font-semibold",
    4: "text-lg font-medium",
    5: "text-base font-medium",
    6: "text-sm font-medium"
  };
  return React.createElement(Component, { 
    className: `${sizeClasses[level as keyof typeof sizeClasses] || sizeClasses[2]} ${className}`,
    ...props 
  }, children);
}

// Auth hook stub
export function useUnifiedAuth() {
  return {
    user: {
      uid: 'mock_user_123',
      displayName: 'UB Student',
      email: 'student@buffalo.edu',
      photoURL: null,
    },
    isLoading: false,
    isAuthenticated: true,
    signOut: () => Promise.resolve(),
  };
}