/**
 * HIVE Mobile Navigation - Bottom Tabs
 * YC-Quality Implementation with Perfect Touch Optimization
 * 
 * Optimized for thumb navigation with 44px+ touch targets,
 * smooth animations, and flawless user experience.
 */

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavigationItem } from '../core/types';
import { NAVIGATION_THEME, NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y } from '../core/data';
import { cn } from '../../lib/utils';
import { useHapticFeedback, useTouchRipple } from '../../hooks/use-mobile-interactions';

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface MobileNavigationProps {
  items: ReadonlyArray<NavigationItem>;
  onNavigate: (href: string) => void;
  className?: string;
  testId?: string;
}

interface MobileNavItemProps {
  item: NavigationItem;
  onNavigate: (href: string) => void;
  isActive: boolean;
}

// ============================================================================
// MOBILE NAVIGATION ITEM
// ============================================================================

const MobileNavItem = memo<MobileNavItemProps>(({ item, onNavigate, isActive }) => {
  const Icon = item.icon;
  const { triggerHaptic } = useHapticFeedback();
  const { ripples, rippleHandlers } = useTouchRipple();
  
  const handleClick = () => {
    if (!item.isDisabled) {
      triggerHaptic('selection');
      onNavigate(item.href);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !item.isDisabled) {
      event.preventDefault();
      onNavigate(item.href);
    }
  };
  
  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={item.isDisabled}
      {...rippleHandlers}
      className={cn(
        // Base styles
        'relative flex flex-col items-center justify-center',
        'w-full h-full min-h-[44px]', // 44px minimum for touch targets
        'transition-all duration-200 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'focus-visible:ring-[var(--hive-brand-secondary)] focus-visible:ring-offset-[var(--hive-background-primary)]',
        
        // Interactive states
        'hover:bg-[var(--hive-interactive-hover)]',
        'active:scale-95',
        
        // Disabled state
        item.isDisabled && 'opacity-50 cursor-not-allowed'
      )}
      aria-label={`${item.label} - ${item.description}`}
      aria-current={isActive ? 'page' : undefined}
      data-testid={`mobile-nav-${item.id}`}
      whileTap={{ scale: item.isDisabled ? 1 : 0.95 }}
      whileHover={{ scale: item.isDisabled ? 1 : 1.02 }}
    >
      {/* Active indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-0 left-1/2 w-8 h-1 rounded-full"
            style={{ backgroundColor: NAVIGATION_THEME.brand.secondary }}
            initial={{ opacity: 0, scaleX: 0, x: '-50%' }}
            animate={{ opacity: 1, scaleX: 1, x: '-50%' }}
            exit={{ opacity: 0, scaleX: 0, x: '-50%' }}
            transition={{ duration: NAVIGATION_MOTION.duration.normal / 1000 }}
            layoutId="mobile-active-indicator"
          />
        )}
      </AnimatePresence>
      
      {/* Icon container */}
      <div
        className={cn(
          'relative flex items-center justify-center',
          'w-8 h-8 rounded-lg transition-all duration-200',
          isActive 
            ? 'bg-[var(--hive-brand-secondary)]/15' 
            : 'bg-transparent'
        )}
      >
        <Icon
          className={cn(
            'w-5 h-5 transition-colors duration-200',
            isActive 
              ? 'text-[var(--hive-brand-secondary)]'
              : 'text-[var(--hive-text-secondary)]'
          )}
          aria-hidden="true"
        />
        
        {/* Badge indicator */}
        {item.badge && (
          <motion.div
            className={cn(
              'absolute -top-1 -right-1 min-w-[16px] h-4 px-1',
              'flex items-center justify-center',
              'text-xs font-medium rounded-full',
              'bg-[var(--hive-error)] text-[var(--hive-text-inverse)]',
              'border-2 border-[var(--hive-background-primary)]'
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 500, damping: 30 }}
          >
            {item.badge.count && item.badge.count > 99 ? '99+' : item.badge.count}
          </motion.div>
        )}
      </div>
      
      {/* Label */}
      <span
        className={cn(
          'text-xs font-medium mt-1 transition-colors duration-200',
          'max-w-full truncate',
          isActive 
            ? 'text-[var(--hive-brand-secondary)]'
            : 'text-[var(--hive-text-tertiary)]'
        )}
      >
        {item.label}
      </span>

      {/* Touch ripple effects */}
      {ripples.map((ripple: any) => (
        <div
          key={ripple.id}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${ripple.x}px ${ripple.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            animation: 'mobile-ripple 0.6s ease-out forwards'
          }}
        />
      ))}
    </motion.button>
  );
});

MobileNavItem.displayName = 'MobileNavItem';

// ============================================================================
// MAIN MOBILE NAVIGATION
// ============================================================================

export const MobileNavigation = memo<MobileNavigationProps>(({
  items,
  onNavigate,
  className,
  testId = 'mobile-navigation'
}) => {
  return (
    <motion.nav
      className={cn(
        // Positioning
        'fixed bottom-0 left-0 right-0 z-50',
        
        // Styling
        'bg-[var(--hive-background-primary)]/95',
        'backdrop-blur-xl backdrop-saturate-150',
        'border-t border-[var(--hive-border-subtle)]',
        
        // Safe area support for iOS
        'pb-safe',
        
        className
      )}
      style={{
        height: NAVIGATION_SIZING.heights.mobileTab,
        boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1), 0 -1px 2px rgba(0, 0, 0, 0.06)'
      }}
      aria-label={NAVIGATION_A11Y.labels.mobileNavigation}
      data-testid={testId}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: NAVIGATION_MOTION.duration.normal / 1000 }}
    >
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[var(--hive-background-primary)] via-[var(--hive-background-primary)]/95 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Navigation items container */}
      <div className="relative flex items-center justify-around h-full px-2">
        {items.map((item) => (
          <div key={item.id} className="flex-1 max-w-[80px]">
            <MobileNavItem
              item={item}
              onNavigate={onNavigate}
              isActive={item.isActive || false}
            />
          </div>
        ))}
      </div>
      
      {/* iOS safe area spacer */}
      <div className="h-safe-area-inset-bottom" />
    </motion.nav>
  );
});

MobileNavigation.displayName = 'MobileNavigation';

// ============================================================================
// STYLE HELPERS & UTILITIES
// ============================================================================

/**
 * Calculates safe area padding for iOS devices
 */
export const getMobileSafeAreaStyles = () => ({
  paddingBottom: 'env(safe-area-inset-bottom)',
  marginBottom: 'calc(-1 * env(safe-area-inset-bottom))'
});

/**
 * Creates proper touch target sizes for accessibility
 */
export const getTouchTargetStyles = (minSize = 44) => ({
  minWidth: `${minSize}px`,
  minHeight: `${minSize}px`
});

/**
 * Animation variants for mobile navigation items
 */
export const mobileNavItemVariants = {
  idle: {
    scale: 1,
    y: 0
  },
  hover: {
    scale: 1.02,
    y: -1,
    transition: {
      duration: NAVIGATION_MOTION.duration.fast / 1000,
      ease: NAVIGATION_MOTION.easing.default
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: NAVIGATION_MOTION.easing.sharp
    }
  }
};

/**
 * Custom hook for mobile navigation analytics
 */
export const useMobileNavigationAnalytics = () => {
  const trackNavigation = (from: string, to: string, section: string) => {
    // Analytics implementation
    
  };
  
  const trackInteraction = (action: string, section: string) => {
    // Analytics implementation  
    
  };
  
  return { trackNavigation, trackInteraction };
};