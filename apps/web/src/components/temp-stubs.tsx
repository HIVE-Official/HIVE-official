'use client';

// Force dynamic rendering to avoid SSG issues with hooks
export const dynamic = 'force-dynamic';

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
          <div className="text-xl font-bold text-white">HIVE</div>
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
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
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

export function CompleteHIVEToolsSystem({
  tools = [],
  onToolCreate,
  showCreateButton,
  showSearch,
  showFilters,
  className = "",
}: {
  tools?: Array<{
    id: string;
    name: string;
    description?: string;
    tags?: string[];
    category?: string;
    isFeatured?: boolean;
  }>;
  onToolCreate?: (mode?: "visual" | "template" | "wizard") => void;
  showCreateButton?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/60 p-6 shadow-lg shadow-black/30 text-white ${className}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">HIVE Tools Library</h2>
          <p className="text-sm text-white/60">
            Browse featured tools while the full design system is being restored.
          </p>
        </div>
        {showCreateButton && onToolCreate && (
          <button
            onClick={() => onToolCreate("visual")}
            className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-4 py-2 text-black transition hover:bg-yellow-300"
          >
            Launch Builder
          </button>
        )}
      </div>

      {(showSearch || showFilters) && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {showSearch && (
            <input
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-yellow-400 focus:outline-none"
              placeholder="Search tools..."
              disabled
            />
          )}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {["All", "Academic", "Social", "Events", "Services"].map((filter) => (
                <span
                  key={filter}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/60"
                >
                  {filter}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tools.slice(0, 6).map((tool) => (
          <div
            key={tool.id}
            className="rounded-lg border border-white/10 bg-black/40 p-4 transition hover:border-yellow-400/70"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{tool.name}</h3>
                {tool.description && (
                  <p className="mt-1 text-sm text-white/60 line-clamp-2">{tool.description}</p>
                )}
              </div>
              {tool.isFeatured && (
                <span className="rounded-full bg-yellow-400/20 px-2 py-1 text-xs font-medium text-yellow-300">
                  Featured
                </span>
              )}
            </div>
            {tool.tags && tool.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        {tools.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/10 p-6 text-center text-white/60">
            No tools available yet. Add templates in `campus-tools-templates.ts`.
          </div>
        )}
      </div>
    </div>
  );
}

export function WelcomeMat({
  onDismiss,
  userName,
}: {
  onDismiss?: () => void;
  userName?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0F0F10] p-6 text-white shadow-2xl shadow-black/30">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back{userName ? `, ${userName}` : ""}!
            </h2>
            <p className="mt-2 text-sm text-white/60">
              The guided onboarding experience is temporarily simplified while UI exports are restored.
            </p>
          </div>
          {onDismiss && (
            <button
              aria-label="Dismiss welcome"
              onClick={onDismiss}
              className="rounded-full border border-white/10 p-2 text-white/60 transition hover:text-white"
            >
              ×
            </button>
          )}
        </div>
        <div className="mt-6 space-y-3 text-sm text-white/70">
          <p>• Discover new spaces and tools curated for your campus.</p>
          <p>• Track progress in your Rituals and HiveLab creations.</p>
          <p>• Stay tuned for the full Welcome Mat experience returning soon.</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onDismiss}
            className="rounded-lg bg-yellow-400 px-4 py-2 text-black transition hover:bg-yellow-300"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
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
