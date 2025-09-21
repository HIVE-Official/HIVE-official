"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { colors, semantic, shadows, gradients } from '@hive/tokens';
import { motion } from '../framer-motion-proxy';
import { getHiveMotionProps } from '../../lib/motion-utils';
import { HiveLogo, HiveGlyphOnly } from '../hive-logo';

// ============================================================================
// NAVIGATION SYSTEM TYPES;
// ============================================================================

export type NavigationVariant = 'sidebar' | 'topbar' | 'command' | 'mobile' | 'minimal';
export type NavigationSize = 'compact' | 'standard' | 'expanded';
export type NavigationPosition = 'fixed' | 'sticky' | 'static';

export interface NavigationItem {id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string}>;
  href?: string;
  onClick?: () => void;
  badge?: {
    count?: number;
    variant?: 'default' | 'success' | 'warning' | 'error';
    pulse?: boolean;
  };
  isActive?: boolean;
  isDisabled?: boolean;
  children?: NavigationItem[];
  keywords?: string[];
  description?: string;
  shortcut?: string;
}

export interface NavigationSection {id: string;
  label: string;
  items: NavigationItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;}

export interface NavigationUser {id: string;
  name: string;
  handle: string;
  avatar?: string;
  role?: string;
  status?: 'online' | 'away' | 'busy' | 'offline'}

export interface NavigationConfig {variant: NavigationVariant;
  size: NavigationSize;
  position: NavigationPosition;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  showBranding?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  mobileBreakpoint?: number;
  keyboardShortcuts?: boolean;
  accessibility?: {
    skipLinks?: boolean;
    announcements?: boolean;
    reducedMotion?: boolean;}
}

// ============================================================================
// NAVIGATION CONTEXT;
// ============================================================================

interface NavigationContextType {config: NavigationConfig;
  user: NavigationUser | null;
  sections: NavigationSection[];
  isCollapsed: boolean;
  isMobile: boolean;
  searchOpen: boolean;
  notificationsOpen: boolean;
  userMenuOpen: boolean;
  activeItemId: string | null;
  
  // Actions;
  setCollapsed: (collapsed: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  setUserMenuOpen: (open: boolean) => void;
  setActiveItem: (id: string | null) => void;
  updateConfig: (config: Partial<NavigationConfig>) => void;
  navigate: (item: NavigationItem) => void;}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }}
  return context;
};

// ============================================================================
// NAVIGATION PROVIDER;
// ============================================================================

interface NavigationProviderProps {children: React.ReactNode;
  config: NavigationConfig;
  user?: NavigationUser | null;
  sections: NavigationSection[];
  onNavigate?: (item: NavigationItem) => void;
  onConfigChange?: (config: NavigationConfig) => void;}

export function NavigationProvider({
  children,
  config,
  user = null,
  sections,
  onNavigate,
  onConfigChange;
}: NavigationProviderProps) {
  const [currentConfig, setCurrentConfig] = useState(config);
  const [isCollapsed, setIsCollapsed] = useState(config.defaultCollapsed ?? false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Handle mobile detection;
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < (currentConfig.mobileBreakpoint ?? 768))
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile)
  }, [currentConfig.mobileBreakpoint]);

  // Handle keyboard shortcuts;
  useEffect(() => {
    if (!currentConfig.keyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K for search;
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true)
      }
      }
      // Command/Ctrl + B for sidebar toggle;
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsCollapsed(!isCollapsed)
      }
      
      // Escape to close overlays;
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setUserMenuOpen(false)
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentConfig.keyboardShortcuts, isCollapsed]);

  const updateConfig = (newConfig: Partial<NavigationConfig>) => {
    const updatedConfig = { ...currentConfig, ...newConfig };
    setCurrentConfig(updatedConfig);
    onConfigChange?.(updatedConfig)
  };

  const navigate = (item: NavigationItem) => {
    setActiveItemId(item.id);
    onNavigate?.(item);
    
    // Close mobile menu after navigation;
    if (isMobile) {
      setIsCollapsed(true)
    }}
  };

  const value: NavigationContextType = {
    config: currentConfig,
    user,
    sections,
    isCollapsed,
    isMobile,
    searchOpen,
    notificationsOpen,
    userMenuOpen,
    activeItemId,
    setCollapsed: setIsCollapsed,
    setSearchOpen,
    setNotificationsOpen,
    setUserMenuOpen,
    setActiveItem: setActiveItemId,
    updateConfig,
    navigate;
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

// ============================================================================
// BASE NAVIGATION COMPONENTS;
// ============================================================================

export interface NavigationContainerProps {children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;}

export function NavigationContainer({ children, className, style }: NavigationContainerProps) {
  const { config } = useNavigation();
  
  return (
    <motion.nav;
      className={cn("hive-navigation",
        `hive-navigation--${config.variant}`,
        `hive-navigation--${config.size}`,
        `hive-navigation--${config.position}`,
        // HIVE design system base styles;
        "relative overflow-hidden transition-all duration-300 ease-out",
        "backdrop-blur-sm",
        className)}
      style={{
        backgroundColor: 'var(--hive-background-primary)',
        color: 'var(--hive-text-primary)',
        border: `1px solid var(--hive-border-subtle)`,
        ...style;
          }}
      role="navigation"
      aria-label="Main navigation"
      {...getHiveMotionProps('surface')}
    >
      {children}
    </motion.nav>
  )
}

export interface NavigationBrandProps {logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  href?: string;
  className?: string;}

export function NavigationBrand({ logo, title, subtitle, href, className }: NavigationBrandProps) {
  const { config, isCollapsed } = useNavigation();
  
  const brandContent = (
    <div className={cn(
      "flex items-center gap-3 transition-all duration-300 ease-out",
      isCollapsed && config.variant === 'sidebar' && "justify-center",
      className;
    )}>
      {logo && (
        <div className="flex-shrink-0">
          {logo}
        </div>
      )}
      {(!isCollapsed || config.variant !== 'sidebar') && (
        <div className="flex flex-col min-w-0">
          {title && (
            <span;
              className="font-semibold text-lg tracking-tight truncate"
              style={{ 
                color: 'var(--hive-text-primary)',
                fontFamily: 'var(--hive-font-family-primary)',
                fontSize: 'var(--hive-font-size-lg)',
                fontWeight: 'var(--hive-font-weight-semibold)'
          }}
            >
              {title}
            </span>
          )}
          {subtitle && (
            <span;
              className="text-sm truncate"
              style={{ 
                color: 'var(--hive-text-muted)',
                fontSize: 'var(--hive-font-size-sm)',
                fontWeight: 'var(--hive-font-weight-regular)'
          }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <motion.a;
        href={href}
        className="block p-4 hover:bg-[var(--hive-interactive-hover)] transition-all duration-200 rounded-2xl"
        aria-label={`${title} home`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {brandContent}
      </motion.a>
    )
  }

  return (
    <div className="p-4">
      {brandContent}
    </div>
  )
}


// ============================================================================
// EXPORT SYSTEM;
// ============================================================================

// All types are already exported above with their definitions;