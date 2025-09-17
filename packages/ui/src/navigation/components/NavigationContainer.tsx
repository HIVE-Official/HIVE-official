"use client";

/**
 * HIVE Navigation Container - Master Navigation Orchestrator
 * YC-Quality Implementation with Perfect Responsive Behavior
 * 
 * This is the main navigation component that orchestrates between all
 * navigation modes based on screen size and user preferences.
 */

import React, { memo, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { NavigationUser } from '../core/types';
import { useNavigationState } from '../hooks/useNavigationState';
import { MobileNavigation } from './MobileNavigation';
import { DesktopSidebar, SidebarOverlay } from './DesktopSidebar';
import { DesktopTopbar } from './DesktopTopbar';
import { TabletDrawer, TabletDrawerTrigger } from './TabletDrawer';
import { cn } from '../../lib/utils';

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface NavigationContainerProps {
  user: NavigationUser;
  onOpenCommandPalette?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationCount?: number;
  children?: React.ReactNode;
  className?: string;
  testId?: string;
}

interface NavigationLayoutProps {
  children: React.ReactNode;
  navigationState: ReturnType<typeof useNavigationState>['state'];
}

// ============================================================================
// NAVIGATION LAYOUT WRAPPER
// ============================================================================

const NavigationLayout = memo<NavigationLayoutProps>(({ 
  children, 
  navigationState
}) => {
  const { mode } = navigationState;
  
  return (
    <div className="relative min-h-screen">
      {/* Content wrapper with proper spacing */}
      <main
        className={cn(
          'min-h-screen transition-all duration-300 ease-out',
          
          // Mobile layout - full width with bottom spacing
          mode === 'mobile-tabs' && [
            'w-full pb-16' // Space for bottom tabs
          ],
          
          // Desktop sidebar layout - left margin for sidebar
          mode === 'desktop-sidebar' && [
            'ml-64' // Fixed margin for sidebar
          ],
          
          // Desktop topbar layout - top padding for header
          mode === 'desktop-tabs' && [
            'pt-16 w-full' // Space for top header
          ],
          
          // Tablet drawer layout - full width (drawer overlays)
          mode === 'tablet-drawer' && [
            'w-full'
          ]
        )}
        style={{
          // Additional styles can be added here if needed
        }}
      >
        {children}
      </main>
    </div>
  );
});

NavigationLayout.displayName = 'NavigationLayout';

// ============================================================================
// MAIN NAVIGATION CONTAINER
// ============================================================================

export const NavigationContainer = memo<NavigationContainerProps>(({
  user,
  onOpenCommandPalette,
  onOpenNotifications,
  unreadNotificationCount = 0,
  children,
  className,
  testId = 'navigation-container'
}) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const navigationState = useNavigationState({
    user,
    enableAnalytics: true,
    enableDebug: process.env.NODE_ENV === 'development'
  });
  
  const { state, items, actions } = navigationState;
  
  // Local state for tablet drawer
  const [tabletDrawerOpen, setTabletDrawerOpen] = useState(false);
  
  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  const handleNavigate = useCallback((href: string) => {
    actions.navigate(href);
    
    // Close tablet drawer on navigation
    if (tabletDrawerOpen) {
      setTabletDrawerOpen(false);
    }
  }, [actions, tabletDrawerOpen]);
  
  const handleToggleSidebar = useCallback(() => {
    actions.toggleSidebar();
  }, [actions]);
  
  const handleOpenTabletDrawer = useCallback(() => {
    setTabletDrawerOpen(true);
  }, []);
  
  const handleCloseTabletDrawer = useCallback(() => {
    setTabletDrawerOpen(false);
  }, []);
  
  // ============================================================================
  // RENDER NAVIGATION COMPONENTS
  // ============================================================================
  
  const renderNavigation = () => {
    switch (state.mode) {
      case 'mobile-tabs':
        return (
          <MobileNavigation
            items={items}
            onNavigate={handleNavigate}
            testId="mobile-navigation"
          />
        );
      
      case 'desktop-sidebar':
        return (
          <>
            <DesktopSidebar
              items={items}
              user={user}
              collapsed={state.sidebarCollapsed}
              onNavigate={handleNavigate}
              onToggleCollapse={handleToggleSidebar}
              testId="desktop-sidebar"
            />
            
            {/* Overlay for mobile when sidebar is temporarily shown */}
            <SidebarOverlay
              isOpen={false}
              onClose={() => actions.setMobileNavOpen(false)}
            />
          </>
        );
      
      case 'desktop-tabs':
        return (
          <DesktopTopbar
            items={items}
            user={user}
            onNavigate={handleNavigate}
            onOpenCommandPalette={onOpenCommandPalette}
            onOpenNotifications={onOpenNotifications}
            unreadNotificationCount={unreadNotificationCount}
            testId="desktop-topbar"
          />
        );
      
      case 'tablet-drawer':
        return (
          <>
            {/* Drawer trigger button - positioned in top bar or floating */}
            <div className="fixed top-4 left-4 z-40">
              <TabletDrawerTrigger onOpen={handleOpenTabletDrawer} />
            </div>
            
            {/* Tablet drawer */}
            <TabletDrawer
              items={items}
              user={user}
              isOpen={tabletDrawerOpen}
              onNavigate={handleNavigate}
              onClose={handleCloseTabletDrawer}
              testId="tablet-drawer"
            />
          </>
        );
      
      default:
        // Fallback to mobile navigation
        return (
          <MobileNavigation
            items={items}
            onNavigate={handleNavigate}
            testId="fallback-navigation"
          />
        );
    }
  };
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <NavigationLayout
      navigationState={state}
    >
      <div 
        className={cn('relative', className)}
        data-testid={testId}
        data-navigation-mode={state.mode}
        data-screen-size={state.screenSize}
      >
        {/* Navigation components */}
        <AnimatePresence mode="wait">
          {renderNavigation()}
        </AnimatePresence>
        
        {/* Children content */}
        {children}
      </div>
    </NavigationLayout>
  );
});

NavigationContainer.displayName = 'NavigationContainer';

// ============================================================================
// HOC FOR PAGE LAYOUTS
// ============================================================================

interface WithNavigationProps {
  user: NavigationUser;
  onOpenCommandPalette?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationCount?: number;
  children: React.ReactNode;
}

/**
 * Higher-order component for wrapping pages with navigation
 */
export const withNavigation = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WithNavigationComponent = memo<P & WithNavigationProps>((props) => {
    const {
      user,
      onOpenCommandPalette,
      onOpenNotifications,
      unreadNotificationCount,
      children,
      ...componentProps
    } = props;
    
    const navigationState = useNavigationState({
      user,
      enableAnalytics: true
    });
    
    return (
      <NavigationLayout
        navigationState={navigationState.state}
      >
        <NavigationContainer
          user={user}
          onOpenCommandPalette={onOpenCommandPalette}
          onOpenNotifications={onOpenNotifications}
          unreadNotificationCount={unreadNotificationCount}
        />
        
        <Component {...(componentProps as P)}>
          {children}
        </Component>
      </NavigationLayout>
    );
  });
  
  WithNavigationComponent.displayName = `withNavigation(${Component.displayName || Component.name})`;
  
  return WithNavigationComponent;
};

// ============================================================================
// EXPORT COMPLETE NAVIGATION SYSTEM
// ============================================================================

export { NavigationContainer as default };

// Re-export all navigation components for direct usage
export {
  MobileNavigation,
  DesktopSidebar,
  DesktopTopbar,
  TabletDrawer,
  SidebarOverlay,
  TabletDrawerTrigger
};

// Re-export hooks and utilities
export { useNavigationState } from '../hooks/useNavigationState';
export type { NavigationUser } from '../core/types';