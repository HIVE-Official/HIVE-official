/**
 * HIVE Tablet Drawer Navigation
 * YC-Quality Implementation with Smooth Drawer Experience
 * 
 * Features slide-out drawer navigation optimized for tablet usage,
 * with smooth animations and touch-friendly interactions.
 */

import React, { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hash } from 'lucide-react';
import type { NavigationItem, NavigationUser } from '../core/types';
import { NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y } from '../core/data';
import { cn } from '../../lib/utils';

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface TabletDrawerProps {
  items: ReadonlyArray<NavigationItem>;
  user: NavigationUser;
  isOpen: boolean;
  onNavigate: (href: string) => void;
  onClose: () => void;
  className?: string;
  testId?: string;
}

interface DrawerItemProps {
  item: NavigationItem;
  onNavigate: (href: string) => void;
  onClose: () => void;
}

interface DrawerHeaderProps {
  onClose: () => void;
}

// ============================================================================
// DRAWER HEADER
// ============================================================================

const DrawerHeader = memo<DrawerHeaderProps>(({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-[var(--hive-border-subtle)]">
      {/* HIVE branding */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: NAVIGATION_MOTION.duration.fast / 1000, delay: 0.1 }}
      >
        <div className="w-10 h-10 bg-[var(--hive-brand-secondary)] rounded-xl flex items-center justify-center">
          <Hash className="w-6 h-6 text-[var(--hive-text-inverse)]" />
        </div>
        <div>
          <div className="text-lg font-bold text-[var(--hive-brand-secondary)] tracking-wider">
            HIVE
          </div>
          <div className="text-sm text-[var(--hive-text-tertiary)]">
            Campus OS
          </div>
        </div>
      </motion.div>
      
      {/* Close button */}
      <motion.button
        type="button"
        onClick={onClose}
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-xl',
          'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]',
          'hover:bg-[var(--hive-interactive-hover)]',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]'
        )}
        aria-label="Close navigation drawer"
        data-testid="drawer-close-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5" />
      </motion.button>
    </div>
  );
});

DrawerHeader.displayName = 'DrawerHeader';

// ============================================================================
// DRAWER NAVIGATION ITEM
// ============================================================================

const DrawerItem = memo<DrawerItemProps>(({ item, onNavigate, onClose }) => {
  const Icon = item.icon;
  const isActive = item.isActive || false;
  
  const handleClick = useCallback(() => {
    if (!item.isDisabled) {
      onNavigate(item.href);
      onClose();
    }
  }, [item.href, item.isDisabled, onNavigate, onClose]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !item.isDisabled) {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick, item.isDisabled]);
  
  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={item.isDisabled}
      className={cn(
        // Base styles
        'w-full flex items-center gap-4 px-6 py-4 rounded-xl',
        'transition-all duration-200 ease-out group relative',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]',
        
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
        minHeight: NAVIGATION_SIZING.heights.sidebarItem + 8 // Slightly taller for tablet
      }}
      aria-label={`${item.label} - ${item.description}`}
      aria-current={isActive ? 'page' : undefined}
      data-testid={`drawer-item-${item.id}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={!item.isDisabled ? { x: 4, scale: 1.01 } : {}}
      whileTap={!item.isDisabled ? { scale: 0.98 } : {}}
    >
      {/* Icon container */}
      <div
        className={cn(
          'flex items-center justify-center rounded-xl transition-all duration-200',
          'w-12 h-12', // Larger for tablet touch targets
          isActive 
            ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]'
            : 'bg-[var(--hive-bg-tertiary)] text-current'
        )}
      >
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      
      {/* Content */}
      <div className="flex items-center justify-between flex-1 min-w-0">
        <div className="flex flex-col items-start">
          <span className="text-base font-medium truncate">
            {item.label}
          </span>
          <span className="text-sm text-[var(--hive-text-tertiary)] truncate">
            {item.description}
          </span>
        </div>
        
        {/* Badge */}
        {item.badge && (
          <motion.div
            className={cn(
              'ml-3 px-3 py-1 text-sm font-medium rounded-full shrink-0',
              item.badge.type === 'notification' && 'bg-[var(--hive-error)]/20 text-[var(--hive-error)]',
              item.badge.type === 'status' && 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]',
              item.badge.type === 'feature' && 'bg-[var(--hive-info)]/20 text-[var(--hive-info)]'
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 500, damping: 30 }}
          >
            {item.badge.count && item.badge.count > 99 ? '99+' : item.badge.count || item.badge.label}
          </motion.div>
        )}
      </div>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute right-4 w-1 h-8 rounded-full bg-[var(--hive-brand-secondary)]"
          layoutId="drawer-active-indicator"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
});

DrawerItem.displayName = 'DrawerItem';

// ============================================================================
// USER PROFILE SECTION
// ============================================================================

const UserProfileSection = memo<{ user: NavigationUser }>(({ user }) => {
  return (
    <motion.div 
      className="px-6 py-4 border-b border-[var(--hive-border-subtle)]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-medium text-[var(--hive-text-primary)] truncate">
            {user.name}
          </div>
          <div className="text-sm text-[var(--hive-text-tertiary)] truncate">
            @{user.handle}
          </div>
        </div>
        {user.builderStatus === 'active' && (
          <motion.div
            className={cn(
              'px-3 py-1 text-xs font-medium rounded-full',
              'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]'
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 500, damping: 30 }}
          >
            Builder
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

UserProfileSection.displayName = 'UserProfileSection';

// ============================================================================
// MAIN TABLET DRAWER
// ============================================================================

export const TabletDrawer = memo<TabletDrawerProps>(({
  items,
  user,
  isOpen,
  onNavigate,
  onClose,
  className,
  testId = 'tablet-drawer'
}) => {
  // Close drawer on escape key
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: NAVIGATION_MOTION.duration.fast / 1000 }}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <motion.aside
            className={cn(
              // Positioning
              'fixed left-0 top-0 h-screen flex flex-col z-50',
              
              // Styling
              'bg-[var(--hive-bg-secondary)] backdrop-blur-xl',
              'border-r border-[var(--hive-border-default)]',
              'shadow-2xl',
              
              className
            )}
            style={{
              width: NAVIGATION_SIZING.widths.sidebarExpanded + 32, // Wider for tablet
            }}
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ 
              type: 'spring',
              damping: 30,
              stiffness: 300,
              duration: NAVIGATION_MOTION.duration.normal / 1000
            }}
            aria-label={NAVIGATION_A11Y.labels.sidebarNavigation}
            data-testid={testId}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Header */}
            <DrawerHeader onClose={onClose} />
            
            {/* User profile */}
            <UserProfileSection user={user} />
            
            {/* Navigation items */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.1 + (index * 0.05),
                      duration: NAVIGATION_MOTION.duration.fast / 1000
                    }}
                  >
                    <DrawerItem
                      item={item}
                      onNavigate={onNavigate}
                      onClose={onClose}
                    />
                  </motion.div>
                ))}
              </div>
            </nav>
            
            {/* Footer */}
            <motion.div 
              className="p-4 border-t border-[var(--hive-border-subtle)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-xs text-[var(--hive-text-tertiary)] text-center">
                Swipe left or tap outside to close
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

TabletDrawer.displayName = 'TabletDrawer';

// ============================================================================
// TABLET DRAWER TRIGGER BUTTON
// ============================================================================

interface TabletDrawerTriggerProps {
  onOpen: () => void;
  className?: string;
}

export const TabletDrawerTrigger = memo<TabletDrawerTriggerProps>(({ onOpen, className }) => {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={cn(
        'w-10 h-10 flex items-center justify-center rounded-xl',
        'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]',
        'hover:bg-[var(--hive-interactive-hover)]',
        'transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]',
        className
      )}
      aria-label="Open navigation menu"
      data-testid="drawer-trigger"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col gap-1">
        <div className="w-5 h-0.5 bg-current rounded-full" />
        <div className="w-5 h-0.5 bg-current rounded-full" />
        <div className="w-5 h-0.5 bg-current rounded-full" />
      </div>
    </motion.button>
  );
});

TabletDrawerTrigger.displayName = 'TabletDrawerTrigger';

// ============================================================================
// SWIPE GESTURE SUPPORT
// ============================================================================

/**
 * Hook for handling swipe gestures to close drawer
 */
export const useDrawerSwipeGesture = (onClose: () => void) => {
  const handleSwipe = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];
    const startX = touch.clientX;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentTouch = moveEvent.touches[0];
      const deltaX = currentTouch.clientX - startX;
      
      // Close if swiped left more than 100px
      if (deltaX < -100) {
        onClose();
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [onClose]);
  
  return handleSwipe;
};