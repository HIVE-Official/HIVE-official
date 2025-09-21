"use client";

import React, { useMemo } from 'react';
import { cn } from '../lib/utils';
import { semantic } from '@hive/tokens';
import { 
  NavigationProvider, 
  useNavigation,
  type NavigationConfig, 
  type NavigationSection,
  type NavigationUser,
  type NavigationItem,
  type NavigationVariant
} from './hive-navigation-system';
import { 
  SidebarNavigation, 
  TopbarNavigation, 
  CommandNavigation, 
  MinimalNavigation 
} from './hive-navigation-variants';

// ============================================================================
// NAVIGATION RENDERER
// ============================================================================

function NavigationRenderer() {
  const { config, isMobile } = useNavigation();
  
  // Auto-select mobile variant on small screens
  const effectiveVariant: NavigationVariant = isMobile ? 'topbar' : config.variant;
  
  switch (effectiveVariant) {
    case 'sidebar':
      return <SidebarNavigation />;
    case 'topbar':
      return <TopbarNavigation />;
    case 'command':
      return <CommandNavigation />;
    case 'minimal':
      return <MinimalNavigation />;
    default:
      return <SidebarNavigation />;
  }
}

// ============================================================================
// MAIN CONTENT WRAPPER
// ============================================================================

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

function MainContent({ children, className }: MainContentProps) {
  const { config, isCollapsed, isMobile } = useNavigation();
  
  // Calculate content margins based on navigation variant
  const contentMargins = useMemo(() => {
    if (isMobile) {
      return {
        marginTop: config.variant === 'minimal' ? '88px' : '64px',
        marginLeft: '0px',
      };
    }
    
    switch (config.variant) {
      case 'sidebar': {
        const widths = {
          compact: isCollapsed ? '64px' : '192px',
          standard: isCollapsed ? '64px' : '256px',
          expanded: isCollapsed ? '80px' : '320px'
        };
        return {
          marginTop: '0px',
          marginLeft: widths[config.size],
        };
      }
      case 'topbar':
        return {
          marginTop: '64px',
          marginLeft: '0px',
        };
      case 'command':
        return {
          marginTop: '48px',
          marginLeft: '0px',
        };
      case 'minimal':
        return {
          marginTop: '88px',
          marginLeft: '0px',
        };
      default:
        return {
          marginTop: '0px',
          marginLeft: '0px',
        };
    }
  }, [config.variant, config.size, isCollapsed, isMobile]);

  return (
    <main 
      className={cn(
        "min-h-screen transition-all duration-300 ease-out",
        className
      )}
      style={{
        marginTop: contentMargins.marginTop,
        marginLeft: contentMargins.marginLeft,
        backgroundColor: semantic.background.primary,
        color: semantic.text.primary,
      }}
    >
      <div className="min-h-full">
        {children}
      </div>
    </main>
  );
}

// ============================================================================
// NAVIGATION SHELL COMPONENT
// ============================================================================

interface HiveNavigationShellProps {
  children: React.ReactNode;
  variant?: NavigationVariant;
  size?: 'compact' | 'standard' | 'expanded';
  user?: NavigationUser | null;
  sections: NavigationSection[];
  onNavigate?: (item: NavigationItem) => void;
  className?: string;
  
  // Configuration options
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  showBranding?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  keyboardShortcuts?: boolean;
  mobileBreakpoint?: number;
  
  // Advanced options
  position?: 'fixed' | 'sticky' | 'static';
  accessibility?: {
    skipLinks?: boolean;
    announcements?: boolean;
    reducedMotion?: boolean;
  };
}

export function HiveNavigationShell({
  children,
  variant = 'sidebar',
  size = 'standard',
  user,
  sections,
  onNavigate,
  className,
  showSearch = true,
  showNotifications = true,
  showUserMenu = true,
  showBranding = true,
  collapsible = true,
  defaultCollapsed = false,
  keyboardShortcuts = true,
  mobileBreakpoint = 768,
  position = 'fixed',
  accessibility = {
    skipLinks: true,
    announcements: true,
    reducedMotion: false
  }
}: HiveNavigationShellProps) {
  
  const config: NavigationConfig = {
    variant,
    size,
    position,
    showSearch,
    showNotifications,
    showUserMenu,
    showBranding,
    collapsible,
    defaultCollapsed,
    keyboardShortcuts,
    mobileBreakpoint,
    accessibility
  };

  const handleNavigate = (item: NavigationItem) => {
    // Handle navigation
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
    
    // Call custom handler
    onNavigate?.(item);
  };

  return (
    <NavigationProvider
      config={config}
      user={user}
      sections={sections}
      onNavigate={handleNavigate}
    >
      <div 
        className={cn("min-h-screen", className)}
        style={{ backgroundColor: semantic.background.primary }}
      >
        {/* Skip Links for Accessibility */}
        {accessibility.skipLinks && (
          <div className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50">
            <a
              href="#main-content"
              className="inline-block px-4 py-2 text-sm font-medium text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)] rounded-md"
            >
              Skip to main content
            </a>
          </div>
        )}

        {/* Navigation */}
        <NavigationRenderer />

        {/* Main Content */}
        <MainContent className="relative">
          <div id="main-content" className="w-full">
            {children}
          </div>
        </MainContent>

        {/* Mobile Sidebar Overlay */}
        <MobileSidebarOverlay />
      </div>
    </NavigationProvider>
  );
}

// ============================================================================
// MOBILE SIDEBAR OVERLAY
// ============================================================================

function MobileSidebarOverlay() {
  const { config, isCollapsed, isMobile, setCollapsed } = useNavigation();
  
  if (!isMobile || config.variant !== 'sidebar' || isCollapsed) {
    return null;
  }
  
  return (
    <div 
      className="fixed inset-0 z-30 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm md:hidden"
      onClick={() => setCollapsed(true)}
    />
  );
}

// ============================================================================
// CONVENIENCE HOOKS
// ============================================================================

export function useHiveNavigation(): ReturnType<typeof useNavigation> {
  return useNavigation();
}

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

export const navigationPresets = {
  // Standard sidebar navigation
  sidebar: {
    variant: 'sidebar' as const,
    size: 'standard' as const,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true,
  },
  
  // Compact sidebar for focused work
  compact: {
    variant: 'sidebar' as const,
    size: 'compact' as const,
    showSearch: false,
    showNotifications: false,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    defaultCollapsed: true,
    keyboardShortcuts: true,
  },
  
  // Top navigation for content-heavy apps
  topbar: {
    variant: 'topbar' as const,
    size: 'standard' as const,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: true,
  },
  
  // Command-driven navigation for power users
  command: {
    variant: 'command' as const,
    size: 'standard' as const,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: true,
  },
  
  // Minimal navigation for immersive experiences
  minimal: {
    variant: 'minimal' as const,
    size: 'compact' as const,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: true,
  },
  
  // Admin dashboard navigation
  admin: {
    variant: 'sidebar' as const,
    size: 'expanded' as const,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true,
  },
  
  // Mobile-optimized navigation
  mobile: {
    variant: 'topbar' as const,
    size: 'compact' as const,
    showSearch: false,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: false,
  }
} as const;

// ============================================================================
// EXPORT EVERYTHING
// ============================================================================

export { NavigationProvider, useNavigation } from './hive-navigation-system';
export type { 
  NavigationConfig, 
  NavigationSection, 
  NavigationUser, 
  NavigationItem, 
  NavigationVariant 
} from './hive-navigation-system';