"use client";

/**
 * HIVE Desktop Sidebar Navigation
 * YC-Quality Implementation with Power User Features
 * 
 * Features collapsible sidebar, status indicators, keyboard shortcuts,
 * and smooth animations optimized for desktop productivity.
 */

import React, { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import type { NavigationItem, NavigationUser } from '../core/types';
import { NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y } from '../core/data';
import { cn } from '../../lib/utils';

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface DesktopSidebarProps {
  items: ReadonlyArray<NavigationItem>;
  user: NavigationUser;
  collapsed: boolean;
  onNavigate: (href: string) => void;
  onToggleCollapse: () => void;
  className?: string;
  testId?: string;
}

interface SidebarItemProps {
  item: NavigationItem;
  collapsed: boolean;
  onNavigate: (href: string) => void;
}

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

// ============================================================================
// SIDEBAR HEADER
// ============================================================================

const SidebarHeader = memo<SidebarHeaderProps>(({ collapsed, onToggleCollapse }) => {
  return (
    <div 
      className={cn(
        'flex items-center justify-between p-4 border-b',
        'border-[var(--hive-border-subtle)]'
      )}
    >
      {/* HIVE branding */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: NAVIGATION_MOTION.duration.fast / 1000 }}
          >
            <div className="w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-[var(--hive-text-inverse)]" />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--hive-brand-secondary)] tracking-wider">
                HIVE
              </div>
              <div className="text-xs text-[var(--hive-text-tertiary)]">
                Campus OS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Collapse toggle */}
      <motion.button
        type="button"
        onClick={onToggleCollapse}
        className={cn(
          'w-8 h-8 flex items-center justify-center rounded-lg',
          'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]',
          'hover:bg-[var(--hive-interactive-hover)]',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]',
          collapsed && 'mx-auto'
        )}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        data-testid="sidebar-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </motion.button>
    </div>
  );
});

SidebarHeader.displayName = 'SidebarHeader';

// ============================================================================
// SIDEBAR NAVIGATION ITEM
// ============================================================================

const SidebarItem = memo<SidebarItemProps>(({ item, collapsed, onNavigate }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const Icon = item.icon;
  const isActive = item.isActive || false;
  
  const handleClick = useCallback(() => {
    if (!item.isDisabled) {
      onNavigate(item.href);
    }
  }, [item.href, item.isDisabled, onNavigate]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !item.isDisabled) {
      event.preventDefault();
      onNavigate(item.href);
    }
  }, [item.href, item.isDisabled, onNavigate]);
  
  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => collapsed && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => collapsed && setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        disabled={item.isDisabled}
        className={cn(
          // Base styles
          'w-full flex items-center gap-3 px-3 py-3 rounded-lg',
          'transition-all duration-200 ease-out group relative overflow-hidden',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]',
          
          // Layout
          collapsed ? 'justify-center' : 'justify-start',
          
          // Active state
          isActive && [
            'bg-[var(--hive-brand-secondary)]/10',
            'text-[var(--hive-brand-secondary)]',
            'border border-[var(--hive-brand-secondary)]/20',
            'shadow-sm'
          ],
          
          // Inactive state
          !isActive && [
            'text-[var(--hive-text-secondary)]',
            'hover:text-[var(--hive-text-primary)]',
            'hover:bg-[var(--hive-interactive-hover)]',
            'hover:border-[var(--hive-border-hover)]'
          ],
          
          // Disabled state
          item.isDisabled && 'opacity-50 cursor-not-allowed'
        )}
        style={{
          height: NAVIGATION_SIZING.heights.sidebarItem,
          minHeight: NAVIGATION_SIZING.heights.sidebarItem
        }}
        aria-label={`${item.label} - ${item.description}`}
        aria-current={isActive ? 'page' : undefined}
        data-testid={`sidebar-item-${item.id}`}
        whileHover={!item.isDisabled ? { x: 2 } : {}}
        whileTap={!item.isDisabled ? { scale: 0.98 } : {}}
      >
        {/* Icon container */}
        <div
          className={cn(
            'relative flex items-center justify-center rounded-lg transition-all duration-200',
            collapsed ? 'w-7 h-7' : 'w-8 h-8',
            isActive 
              ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]'
              : 'bg-[var(--hive-bg-tertiary)] text-current'
          )}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
          
          {/* Badge for collapsed state */}
          {collapsed && item.badge && (
            <motion.div
              className={cn(
                'absolute -top-1 -right-1 w-3 h-3 rounded-full',
                'bg-[var(--hive-error)] border-2 border-[var(--hive-background-primary)]'
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </div>
        
        {/* Label and badge (expanded state) */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="flex items-center justify-between flex-1 min-w-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: NAVIGATION_MOTION.duration.fast / 1000 }}
            >
              <span className="text-sm font-medium truncate">
                {item.label}
              </span>
              
              {/* Badge */}
              {item.badge && (
                <motion.div
                  className={cn(
                    'ml-2 px-2 py-0.5 text-xs font-medium rounded-full shrink-0',
                    item.badge.type === 'notification' && 'bg-[var(--hive-error)]/20 text-[var(--hive-error)]',
                    item.badge.type === 'status' && 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]',
                    item.badge.type === 'feature' && 'bg-[var(--hive-info)]/20 text-[var(--hive-info)]'
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {item.badge.count && item.badge.count > 99 ? '99+' : item.badge.count || item.badge.label}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute right-2 w-1 h-6 rounded-full bg-[var(--hive-brand-secondary)]"
            layoutId="sidebar-active-indicator"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
      
      {/* Tooltip for collapsed state */}
      <AnimatePresence>
        {collapsed && showTooltip && (
          <motion.div
            className={cn(
              'absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none',
              'px-3 py-2 rounded-lg shadow-lg border backdrop-blur-md max-w-xs',
              'bg-[var(--hive-bg-secondary)] border-[var(--hive-border-default)]',
              'text-[var(--hive-text-primary)]'
            )}
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="font-medium text-sm mb-1">
              {item.label}
            </div>
            <div className="text-xs text-[var(--hive-text-secondary)]">
              {item.description}
            </div>
            
            {/* Tooltip arrow */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1"
              style={{
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: `6px solid var(--hive-bg-secondary)`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

SidebarItem.displayName = 'SidebarItem';

// ============================================================================
// USER PROFILE SECTION
// ============================================================================

const UserProfileSection = memo<{ user: NavigationUser; collapsed: boolean }>(({ user, collapsed }) => {
  if (collapsed) {
    return (
      <div className="px-3 py-3 border-b border-[var(--hive-border-subtle)]">
        <div 
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]"
          title={user.name}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="px-3 py-3 border-b border-[var(--hive-border-subtle)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--hive-text-primary)] truncate">
            {user.name}
          </div>
          <div className="text-xs text-[var(--hive-text-tertiary)] truncate">
            @{user.handle}
          </div>
        </div>
        {user.builderStatus === 'active' && (
          <div className="w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)] animate-pulse" />
        )}
      </div>
    </motion.div>
  );
});

UserProfileSection.displayName = 'UserProfileSection';

// ============================================================================
// MAIN DESKTOP SIDEBAR
// ============================================================================

export const DesktopSidebar = memo<DesktopSidebarProps>(({
  items,
  user,
  collapsed,
  onNavigate,
  onToggleCollapse,
  className,
  testId = 'desktop-sidebar'
}) => {
  return (
    <motion.aside
      className={cn(
        // Positioning and layout
        'fixed left-0 top-0 h-screen flex-shrink-0 flex flex-col',
        'transition-all duration-300 ease-out',
        
        // Styling
        'bg-[var(--hive-bg-secondary)] backdrop-blur-xl',
        'border-r border-[var(--hive-border-default)]',
        
        // Z-index
        'z-40',
        
        className
      )}
      style={{
        width: collapsed ? NAVIGATION_SIZING.widths.sidebarCollapsed : NAVIGATION_SIZING.widths.sidebarExpanded,
        boxShadow: 'inset -1px 0 0 var(--hive-brand-secondary)/10'
      }}
      aria-label={NAVIGATION_A11Y.labels.sidebarNavigation}
      data-testid={testId}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: NAVIGATION_MOTION.duration.normal / 1000 }}
    >
      {/* Header */}
      <SidebarHeader
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
      />
      
      {/* User profile */}
      <UserProfileSection user={user} collapsed={collapsed} />
      
      {/* Navigation items */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <div className="space-y-1">
          {items.map((item: any) => (
            <SidebarItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>
      
      {/* Footer */}
      <motion.div 
        className="p-3 border-t border-[var(--hive-border-subtle)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {!collapsed && (
          <div className="text-xs text-[var(--hive-text-tertiary)] text-center">
            {NAVIGATION_A11Y.keyboardShortcuts.toggleSidebar} to toggle
          </div>
        )}
      </motion.div>
    </motion.aside>
  );
});

DesktopSidebar.displayName = 'DesktopSidebar';

// ============================================================================
// SIDEBAR OVERLAY (for tablet/mobile when drawer is open)
// ============================================================================

interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarOverlay = memo<SidebarOverlayProps>(({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
});

SidebarOverlay.displayName = 'SidebarOverlay';