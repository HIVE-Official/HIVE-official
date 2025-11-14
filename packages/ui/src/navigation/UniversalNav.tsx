'use client';

/**
 * Universal Navigation System
 * Core navigation components that integrate with UniversalShell
 */

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Navigation Item Type
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode | string;
  path: string;
  badge?: number | string;
  children?: NavItem[];
  requiresAuth?: boolean;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

// Universal Navigation Bar
export const UniversalNavBar: React.FC<{
  items: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'compact' | 'mobile';
  className?: string;
}> = ({ items, orientation = 'horizontal', variant = 'default', className }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname?.startsWith(path);
  };

  const handleNavClick = (item: NavItem) => {
    router.push(item.path);
  };

  return (
    <nav
      className={cn(
        'universal-nav',
        orientation === 'vertical' ? 'flex-col space-y-2' : 'flex items-center gap-2',
        variant === 'compact' && 'p-2',
        variant === 'mobile' && 'fixed bottom-0 left-0 right-0 bg-black border-t border-white/10',
        className
      )}
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <NavButton
          key={item.id}
          item={item}
          isActive={isActive(item.path)}
          onClick={() => handleNavClick(item)}
          variant={variant}
        />
      ))}
    </nav>
  );
};

// Navigation Button Component
const NavButton: React.FC<{
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  variant: 'default' | 'compact' | 'mobile';
}> = ({ item, isActive, onClick, variant }) => {
  const baseClasses = 'relative transition-all duration-200 group';

  const variantClasses = {
    default: cn(
      'flex items-center gap-3 px-4 py-3 rounded-lg font-medium',
      isActive
        ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-l-4 border-[var(--hive-brand-secondary)]'
        : 'text-white/60 hover:text-white hover:bg-white/5'
    ),
    compact: cn(
      'p-2 rounded-lg',
      isActive ? 'bg-[var(--hive-brand-secondary)] text-black' : 'text-white/60 hover:text-white'
    ),
    mobile: cn(
      'flex flex-col items-center justify-center p-3 min-w-[60px]',
      isActive ? 'text-[var(--hive-brand-secondary)]' : 'text-white/60'
    )
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant])}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Icon */}
      <span className={cn(
        'nav-icon',
        variant === 'mobile' ? 'text-xl' : 'text-lg',
        typeof item.icon === 'string' && 'emoji-icon'
      )}>
        {item.icon}
      </span>

      {/* Label */}
      {variant !== 'compact' && (
        <span className={cn(
          'nav-label',
          variant === 'mobile' ? 'text-xs mt-1' : 'flex-1 text-left'
        )}>
          {item.label}
        </span>
      )}

      {/* Badge */}
      {item.badge && variant !== 'mobile' && (
        <span className="nav-badge ml-auto bg-[var(--hive-brand-secondary)] text-black text-xs font-bold px-2 py-1 rounded-full">
          {item.badge}
        </span>
      )}

      {/* Active Indicator for Mobile */}
      {variant === 'mobile' && isActive && (
        <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--hive-brand-secondary)] rounded-full" />
      )}
    </button>
  );
};

// Command Palette Navigation
export const CommandPalette: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({ open, onOpenChange }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const shouldReduce = useReducedMotion();

  const commands = [
    { id: 'home', label: 'Go to Home', action: () => router.push('/feed'), icon: '🏠' },
    { id: 'discover', label: 'Open Discover', action: () => router.push('/spaces?tab=discover'), icon: '🔍' },
    { id: 'spaces', label: 'Browse Spaces', action: () => router.push('/spaces'), icon: '🧭' },
    { id: 'build', label: 'HiveLab · Build', action: () => router.push('/hivelab'), icon: '🛠️' },
    { id: 'create-space', label: 'Create Space', action: () => router.push('/spaces/create'), icon: '➕' },
    { id: 'profile', label: 'My Profile', action: () => router.push('/profile'), icon: '👤' },
    { id: 'settings', label: 'Settings', action: () => router.push('/settings'), icon: '⚙️' },
  ];

  const filteredCommands = commands.filter((cmd) => cmd.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') {
        onOpenChange(false);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + Math.max(1, filteredCommands.length)) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, filteredCommands, onOpenChange]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
          aria-modal
          role="dialog"
        >
          <motion.div
            className="fixed left-1/2 top-20 w-full max-w-2xl -translate-x-1/2 rounded-xl border border-white/10 bg-black shadow-2xl"
            initial={{ y: shouldReduce ? 0 : -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: shouldReduce ? 0 : -8, opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border-b border-white/10 p-4">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-white placeholder-white/40 outline-none text-lg"
                aria-label="Command palette search"
              />
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    onOpenChange(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                    index === selectedIndex
                      ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span className="text-xl">{cmd.icon}</span>
                  <span className="font-medium">{cmd.label}</span>
                </button>
              ))}
              {filteredCommands.length === 0 && (
                <div className="px-4 py-6 text-sm text-white/40">No matches</div>
              )}
            </div>
            <div className="border-t border-white/10 p-3 flex items-center justify-between text-xs text-white/40">
              <span>↑↓ Navigate</span>
              <span>⏎ Select</span>
              <span>ESC Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Breadcrumb Navigation
export const Breadcrumbs: React.FC<{
  items: Array<{ label: string; path?: string }>;
  className?: string;
}> = ({ items, className }) => {
  const router = useRouter();

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-white/20">/</span>}
          {item.path ? (
            <button
              onClick={() => router.push(item.path!)}
              className="text-white/60 hover:text-[var(--hive-brand-secondary)] transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Tab Navigation
export const TabNav: React.FC<{
  tabs: Array<{ id: string; label: string; count?: number }>;
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-white/5 rounded-lg', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all',
            activeTab === tab.id
              ? 'bg-[var(--hive-brand-secondary)] text-black shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          )}
        >
          <span>{tab.label}</span>
          {tab.count && (
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded-full',
              activeTab === tab.id ? 'bg-black/20' : 'bg-white/10'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// Export all navigation components
export default {
  UniversalNavBar,
  CommandPalette,
  Breadcrumbs,
  TabNav,
};
