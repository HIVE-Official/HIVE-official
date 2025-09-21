"use client";

/**
 * HIVE Desktop Top Navigation Bar;
 * YC-Quality Implementation with Clean Design;
 * 
 * Horizontal navigation optimized for content consumption;
 * with integrated search, notifications, and user menu.
 */

import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Hash, Command, ChevronDown } from 'lucide-react';
import { NavigationItem, NavigationUser } from '../core/types';
import { NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y } from '../core/data';
import { cn } from '../../lib/utils';

// ============================================================================
// COMPONENT INTERFACES;
// ============================================================================

interface DesktopTopbarProps {items: ReadonlyArray<NavigationItem>;
  user: NavigationUser;
  onNavigate: (href: string) => void;
  onOpenCommandPalette?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationCount?: number;
  className?: string;
  testId?: string;}

interface TopbarItemProps {item: NavigationItem;
  onNavigate: (href: string) => void;}

interface UserMenuProps {user: NavigationUser;
  onNavigate: (href: string) => void;}

// ============================================================================
// TOPBAR NAVIGATION ITEM;
// ============================================================================

const TopbarItem = memo<TopbarItemProps>(({ item, onNavigate }) => {
  const Icon = item.icon;
  const isActive = item.isActive || false;
  
  const handleClick = () => {
    if (!item.isDisabled) {
      onNavigate(item.href)
    }}
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !item.isDisabled) {
      event.preventDefault();
      onNavigate(item.href)
    }}
  };
  
  return (
    <motion.button;
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={item.isDisabled}
      className={cn(
        // Base styles;
        'relative flex items-center gap-2 px-4 py-2 rounded-lg',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]',
        'min-h-[40px]', // Minimum touch target;
        // Active state;
        isActive && [
          'bg-[var(--hive-brand-secondary)]/10',
          'text-[var(--hive-brand-secondary)]',
          'font-medium'
        ],
        
        // Inactive state;
        !isActive && [
          'text-[var(--hive-text-secondary)]',
          'hover:text-[var(--hive-text-primary)]',
          'hover:bg-[var(--hive-interactive-hover)]'
        ],
        
        // Disabled state;
        item.isDisabled && 'opacity-50 cursor-not-allowed'
      )}
      aria-label={`${item.label} - ${item.description}`}
      aria-current={isActive ? 'page' : undefined}
      data-testid={`topbar-item-${item.id}`}
      whileHover={!item.isDisabled ? { y: -1 } : {}}
      whileTap={!item.isDisabled ? { scale: 0.98 } : {}}
    >
      {/* Icon */}
      <Icon className="w-4 h-4" aria-hidden="true" />
      
      {/* Label */}
      <span className="text-sm font-medium">
        {item.label}
      </span>
      
      {/* Badge */}
      {item.badge && (
        <motion.div;
          className={cn(
            'ml-1 px-1.5 py-0.5 text-xs font-medium rounded-full',
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
      
      {/* Active indicator */}
      {isActive && (
        <motion.div;
          className="absolute bottom-0 left-1/2 w-8 h-0.5 rounded-full bg-[var(--hive-brand-secondary)]"
          layoutId="topbar-active-indicator"
          style={{ x: '-50%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  )
});

TopbarItem.displayName = 'TopbarItem';

// ============================================================================
// USER MENU;
// ============================================================================

const UserMenu = memo<UserMenuProps>(({ user, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const userInitial = user.name.charAt(0).toUpperCase();
  
  const menuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
    { label: 'Sign Out', href: '/auth/logout' }
  ];
  
  return (
    <div className="relative">
      <motion.button;
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 p-1 rounded-lg',
          'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]',
          'hover:bg-[var(--hive-interactive-hover)]',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]'
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
        data-testid="user-menu-trigger"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 rounded-full bg-[var(--hive-brand-secondary)] flex items-center justify-center text-[var(--hive-text-inverse)] text-sm font-medium">
          {userInitial}
        </div>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
        
        {/* Builder status indicator */}
        {user.builderStatus === 'active' && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--hive-brand-secondary)] rounded-full animate-pulse" />
        )}
      </motion.button>
      
      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div;
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu */}
            <motion.div;
              className={cn(
                'absolute top-full right-0 mt-2 w-48 z-50',
                'bg-[var(--hive-bg-secondary)] backdrop-blur-xl',
                'border border-[var(--hive-border-default)] rounded-xl',
                'shadow-lg overflow-hidden'
              )}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="p-3 border-b border-[var(--hive-border-subtle)]">
                <div className="text-sm font-medium text-[var(--hive-text-primary)]">
                  {user.name}
                </div>
                <div className="text-xs text-[var(--hive-text-tertiary)]">
                  @{user.handle}
                </div>
              </div>
              
              <div className="py-1">
                {menuItems.map((item) => (
                  <button;
                    key={item.href}
                    onClick={() => {
                      onNavigate(item.href);
                      setIsOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center px-3 py-2 text-left text-sm',
                      'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]',
                      'hover:bg-[var(--hive-interactive-hover)]',
                      'transition-colors duration-150'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
});

UserMenu.displayName = 'UserMenu';

// ============================================================================
// SEARCH BAR;
// ============================================================================

const SearchBar = memo<{ onOpenCommandPalette?: () => void }>(({ onOpenCommandPalette }) => {
  return (
    <button;
      type="button"
      onClick={onOpenCommandPalette}}
      className={cn(
        'flex items-center gap-3 px-4 py-2 w-full max-w-md',
        'bg-[var(--hive-bg-tertiary)] border border-[var(--hive-border-subtle)]',
        'rounded-xl text-left',
        'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]',
        'hover:border-[var(--hive-border-hover)]',
        'transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]'
      )}
      aria-label="Open command palette"
      data-testid="search-bar"
    >
      <Search className="w-4 h-4" aria-hidden="true" />
      <span className="flex-1 text-sm">Search spaces, people, tools...</span>
      <div className="flex items-center gap-1 text-xs">
        <kbd className="px-1.5 py-0.5 bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-subtle)] rounded">
          <Command className="w-3 h-3" />
        </kbd>
        <kbd className="px-1.5 py-0.5 bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-subtle)] rounded">
          K;
        </kbd>
      </div>
    </button>
  )
});

SearchBar.displayName = 'SearchBar';

// ============================================================================
// MAIN DESKTOP TOPBAR;
// ============================================================================

export const DesktopTopbar = memo<DesktopTopbarProps>(({
  items,
  user,
  onNavigate,
  onOpenCommandPalette,
  onOpenNotifications,
  unreadNotificationCount = 0,
  className,
  testId = 'desktop-topbar'
}) => {
  return (
    <motion.header;
      className={cn(
        // Positioning;
        'fixed top-0 left-0 right-0 z-50',
        
        // Layout;
        'flex items-center justify-between px-6',
        
        // Styling;
        'bg-[var(--hive-background-primary)]/95 backdrop-blur-xl',
        'border-b border-[var(--hive-border-default)]',
        
        className;
      )}}
      style={{
        height: NAVIGATION_SIZING.heights.desktopHeader,
        backdropFilter: 'blur(20px) saturate(180%)'
      }}
      aria-label={NAVIGATION_A11Y.labels.desktopNavigation}
      data-testid={testId}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: NAVIGATION_MOTION.duration.normal / 1000 }}
    >
      {/* Left section - Logo and navigation */}
      <div className="flex items-center gap-8">
        {/* HIVE logo */}
        <motion.div;
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center">
            <Hash className="w-5 h-5 text-[var(--hive-text-inverse)]" />
          </div>
          <div className="text-xl font-bold text-[var(--hive-text-primary)] tracking-tight">
            HIVE;
          </div>
        </motion.div>
        
        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-2">
          {items.map((item) => (
            <TopbarItem;
              key={item.id}
              item={item}
              onNavigate={onNavigate}
            />
          ))}
        </nav>
      </div>
      
      {/* Center section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <SearchBar onOpenCommandPalette={onOpenCommandPalette} />
      </div>
      
      {/* Right section - Actions and user */}
      <div className="flex items-center gap-3">
        {/* Builder status */}
        {user.builderStatus === 'active' && (
          <motion.div;
            className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]'
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 500, damping: 30 }}
          >
            Builder;
          </motion.div>
        )}
        
        {/* Notifications */}
        {onOpenNotifications && (
          <motion.button;
            type="button"
            onClick={onOpenNotifications}
            className={cn(
              'relative p-2 rounded-lg',
              'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]',
              'hover:bg-[var(--hive-interactive-hover)]',
              'transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]'
            )}
            aria-label="Open notifications"
            data-testid="notifications-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5" />
            
            {/* Notification badge */}
            {unreadNotificationCount > 0 && (
              <motion.div;
                className={cn(
                  'absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1',
                  'flex items-center justify-center text-xs font-medium',
                  'bg-[var(--hive-error)] text-[var(--hive-text-inverse)] rounded-full',
                  'border-2 border-[var(--hive-background-primary)]'
                )}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
              </motion.div>
            )}
          </motion.button>
        )}
        
        {/* User menu */}
        <UserMenu user={user} onNavigate={onNavigate} />
      </div>
    </motion.header>
  )
});

DesktopTopbar.displayName = 'DesktopTopbar';