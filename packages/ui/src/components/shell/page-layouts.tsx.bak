"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { HiveBentoGrid, HiveBentoCard, HiveStack, HiveCluster } from '../../layout/hive-layout';

// =============================================================================
// HIVE Platform Page Layouts
// Specialized layouts for each of the 5 core platform sections
// =============================================================================

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// =============================================================================
// 1. PROFILE LAYOUT - Private Command Center
// Bento grid layout with calendar, tools, activity
// =============================================================================

interface ProfileLayoutProps extends BaseLayoutProps {
  header?: React.ReactNode;
  quickActions?: React.ReactNode;
  calendar?: React.ReactNode;
  personalTools?: React.ReactNode;
  spaceMemberships?: React.ReactNode;
  activityFeed?: React.ReactNode;
}

export function ProfileLayout({ 
  children,
  header,
  quickActions,
  calendar,
  personalTools,
  spaceMemberships,
  activityFeed,
  className 
}: ProfileLayoutProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Profile Header */}
      {header && (
        <div className="mb-8">
          {header}
        </div>
      )}

      {/* Quick Actions Bar */}
      {quickActions && (
        <div className="mb-6">
          {quickActions}
        </div>
      )}

      {/* Bento Grid Layout */}
      <HiveBentoGrid cols={4} gap="lg" cascade>
        {/* Calendar - Wide card */}
        {calendar && (
          <HiveBentoCard span={2} aspect="wide" elevated interactive>
            {calendar}
          </HiveBentoCard>
        )}

        {/* Personal Tools */}
        {personalTools && (
          <HiveBentoCard span={2} elevated interactive>
            {personalTools}
          </HiveBentoCard>
        )}

        {/* Space Memberships */}
        {spaceMemberships && (
          <HiveBentoCard span={2} aspect="tall" elevated interactive>
            {spaceMemberships}
          </HiveBentoCard>
        )}

        {/* Activity Feed */}
        {activityFeed && (
          <HiveBentoCard span={2} aspect="tall" elevated>
            {activityFeed}
          </HiveBentoCard>
        )}

        {/* Additional content */}
        {children}
      </HiveBentoGrid>
    </div>
  );
}

// =============================================================================
// 2. SPACES LAYOUT - Campus Container Dashboard  
// 6 universal surfaces: Pinned, Posts, Events, Tools, Chat, Members
// =============================================================================

interface SpaceLayoutProps extends BaseLayoutProps {
  spaceHeader?: React.ReactNode;
  pinned?: React.ReactNode;
  posts?: React.ReactNode;
  events?: React.ReactNode;
  toolsStack?: React.ReactNode;
  chat?: React.ReactNode;
  members?: React.ReactNode;
  surfaceLayout?: '6-grid' | 'tabbed' | 'sidebar';
}

export function SpaceLayout({
  children,
  spaceHeader,
  pinned,
  posts,
  events,
  toolsStack,
  chat,
  members,
  surfaceLayout = '6-grid',
  className
}: SpaceLayoutProps) {
  if (surfaceLayout === 'tabbed') {
    return (
      <div className={cn("w-full", className)}>
        {spaceHeader}
        {/* Tabbed interface - implementation depends on tab component */}
        <div className="mt-6">
          {children}
        </div>
      </div>
    );
  }

  if (surfaceLayout === 'sidebar') {
    return (
      <div className={cn("w-full flex gap-6", className)}>
        {/* Main content */}
        <div className="flex-1">
          {spaceHeader}
          {children}
        </div>
        {/* Sidebar with tools and members */}
        <div className="w-80 space-y-4">
          {toolsStack && (
            <div className="glass rounded-2xl p-4">
              {toolsStack}
            </div>
          )}
          {members && (
            <div className="glass rounded-2xl p-4">
              {members}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default 6-grid layout
  return (
    <div className={cn("w-full", className)}>
      {/* Space Header */}
      {spaceHeader && (
        <div className="mb-8">
          {spaceHeader}
        </div>
      )}

      {/* 6-Surface Grid */}
      <HiveBentoGrid cols={3} gap="lg" cascade>
        {/* Pinned - Full width */}
        {pinned && (
          <HiveBentoCard span={3} elevated interactive>
            {pinned}
          </HiveBentoCard>
        )}

        {/* Posts - Main content */}
        {posts && (
          <HiveBentoCard span={2} aspect="tall" elevated>
            {posts}
          </HiveBentoCard>
        )}

        {/* Tools Stack */}
        {toolsStack && (
          <HiveBentoCard elevated interactive>
            {toolsStack}
          </HiveBentoCard>
        )}

        {/* Events */}
        {events && (
          <HiveBentoCard elevated interactive>
            {events}
          </HiveBentoCard>
        )}

        {/* Chat */}
        {chat && (
          <HiveBentoCard elevated>
            {chat}
          </HiveBentoCard>
        )}

        {/* Members */}
        {members && (
          <HiveBentoCard elevated interactive>
            {members}
          </HiveBentoCard>
        )}

        {/* Additional content */}
        {children}
      </HiveBentoGrid>
    </div>
  );
}

// =============================================================================
// 3. FEED LAYOUT - Campus Pulse Stream
// Tool-generated content with relevance over recency
// =============================================================================

interface FeedLayoutProps extends BaseLayoutProps {
  feedHeader?: React.ReactNode;
  feedFilters?: React.ReactNode;
  feedContent?: React.ReactNode;
  feedSidebar?: React.ReactNode;
}

export function FeedLayout({
  children,
  feedHeader,
  feedFilters,
  feedContent,
  feedSidebar,
  className
}: FeedLayoutProps) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Feed Header */}
      {feedHeader && (
        <div className="mb-6">
          {feedHeader}
        </div>
      )}

      {/* Feed Filters */}
      {feedFilters && (
        <div className="mb-6">
          {feedFilters}
        </div>
      )}

      <div className="flex gap-6">
        {/* Main Feed Content */}
        <div className="flex-1">
          {feedContent && (
            <HiveStack spacing="lg">
              {feedContent}
            </HiveStack>
          )}
          {children}
        </div>

        {/* Feed Sidebar */}
        {feedSidebar && (
          <div className="w-80 hidden lg:block">
            <div className="sticky top-24">
              {feedSidebar}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// 4. HIVELAB LAYOUT - Builder Console
// Tool creation workspace with element library and canvas
// =============================================================================

interface HiveLabLayoutProps extends BaseLayoutProps {
  builderHeader?: React.ReactNode;
  elementLibrary?: React.ReactNode;
  designCanvas?: React.ReactNode;
  propertiesPanel?: React.ReactNode;
  previewArea?: React.ReactNode;
}

export function HiveLabLayout({
  children,
  builderHeader,
  elementLibrary,
  designCanvas,
  propertiesPanel,
  previewArea,
  className
}: HiveLabLayoutProps) {
  return (
    <div className={cn("w-full h-full flex flex-col bg-[var(--hive-background-secondary)]/30", className)}>
      {/* Builder Header */}
      {builderHeader && (
        <div className="border-b border-[var(--hive-border-primary)] p-4">
          {builderHeader}
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Element Library Sidebar */}
        {elementLibrary && (
          <div className="w-64 border-r border-[var(--hive-border-primary)] bg-[var(--hive-background-primary)]/50 p-4">
            <div className="h-full overflow-y-auto">
              {elementLibrary}
            </div>
          </div>
        )}

        {/* Design Canvas */}
        <div className="flex-1 flex flex-col">
          {designCanvas && (
            <div className="flex-1 p-6 overflow-auto">
              {designCanvas}
            </div>
          )}
          
          {/* Preview Area */}
          {previewArea && (
            <div className="h-48 border-t border-[var(--hive-border-primary)] bg-[var(--hive-background-primary)]/30 p-4">
              {previewArea}
            </div>
          )}
        </div>

        {/* Properties Panel */}
        {propertiesPanel && (
          <div className="w-80 border-l border-[var(--hive-border-primary)] bg-[var(--hive-background-primary)]/50 p-4">
            <div className="h-full overflow-y-auto">
              {propertiesPanel}
            </div>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}

// =============================================================================
// 5. RITUAL LAYOUT - Platform-wide Experiences
// Full-screen immersive experiences that reveal features
// =============================================================================

interface RitualLayoutProps extends BaseLayoutProps {
  ritualBackground?: 'gradient' | 'particles' | 'glow' | 'minimal';
  centered?: boolean;
  maxWidth?: string;
}

export function RitualLayout({
  children,
  ritualBackground = 'gradient',
  centered = true,
  maxWidth = '4xl',
  className
}: RitualLayoutProps) {
  const backgroundStyles = {
    gradient: 'bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]',
    particles: 'bg-[var(--hive-background-primary)] relative overflow-hidden',
    glow: 'bg-[var(--hive-background-primary)] relative',
    minimal: 'bg-[var(--hive-background-primary)]',
  };

  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md', 
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full',
  };

  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col",
      backgroundStyles[ritualBackground],
      className
    )}>
      {/* Ritual Background Effects */}
      {ritualBackground === 'glow' && (
        <div className="absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/10 via-transparent to-transparent opacity-50" />
      )}
      
      {ritualBackground === 'particles' && (
        <div className="absolute inset-0 opacity-20">
          {/* Particle system would go here */}
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "flex-1 flex flex-col",
        centered && "items-center justify-center text-center",
        "p-8"
      )}>
        <div className={cn(
          "w-full",
          maxWidthClasses[maxWidth as keyof typeof maxWidthClasses]
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// UTILITY LAYOUTS
// =============================================================================

// Split Panel Layout for side-by-side content
interface SplitLayoutProps extends BaseLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  splitRatio?: '1:1' | '1:2' | '2:1' | '1:3' | '3:1';
  resizable?: boolean;
}

export function SplitLayout({
  leftPanel,
  rightPanel,
  splitRatio = '1:1',
  resizable = false,
  className
}: SplitLayoutProps) {
  const ratioClasses = {
    '1:1': 'grid-cols-2',
    '1:2': 'grid-cols-[1fr_2fr]', 
    '2:1': 'grid-cols-[2fr_1fr]',
    '1:3': 'grid-cols-[1fr_3fr]',
    '3:1': 'grid-cols-[3fr_1fr]',
  };

  return (
    <div className={cn(
      "h-full grid gap-6",
      ratioClasses[splitRatio],
      className
    )}>
      <div className="glass rounded-2xl p-6 overflow-auto">
        {leftPanel}
      </div>
      <div className="glass rounded-2xl p-6 overflow-auto">
        {rightPanel}
      </div>
    </div>
  );
}

// Modal Layout for overlays
interface ModalLayoutProps extends BaseLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  backdrop?: 'blur' | 'dark' | 'none';
}

export function ModalLayout({
  children,
  isOpen,
  onClose,
  size = 'md',
  backdrop = 'blur',
  className
}: ModalLayoutProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg', 
    xl: 'max-w-xl',
    full: 'max-w-full h-full',
  };

  const backdropClasses = {
    blur: 'backdrop-blur-md bg-[var(--hive-background-primary)]/60',
    dark: 'bg-[var(--hive-background-primary)]/80',
    none: 'bg-transparent',
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        backdropClasses[backdrop]
      )}
      onClick={onClose}
    >
      <div 
        className={cn(
          "glass rounded-3xl p-6 w-full",
          sizeClasses[size],
          "transform transition-all duration-300 ease-out",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}