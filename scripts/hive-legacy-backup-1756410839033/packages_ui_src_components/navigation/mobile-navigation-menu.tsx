"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Compass, 
  Zap, 
  User, 
  Settings, 
  Search,
  Bell,
  Plus,
  X,
  Menu,
  Calendar,
  Users,
  Building,
  LogOut,
  Crown,
  Shield,
  MessageSquare,
  Activity,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { Separator } from '../../ui/separator';
import { cn } from '../lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
  isNew?: boolean;
  requiresBuilder?: boolean;
}

interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  builderStatus?: 'none' | 'pending' | 'active';
  role?: 'student' | 'faculty' | 'admin';
}

interface MobileNavigationMenuProps {
  user?: User | null;
  isOpen: boolean;
  onClose: () => void;
  unreadNotifications?: number;
  className?: string;
}

const primaryNavItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
  { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces' },
  { id: 'tools', label: 'Tools', icon: Zap, href: '/tools' },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
];

const secondaryNavItems: NavigationItem[] = [
  { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/calendar' },
  { id: 'events', label: 'Events', icon: Calendar, href: '/events' },
  { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources' },
  { id: 'browse-spaces', label: 'Browse Spaces', icon: Compass, href: '/spaces/browse' },
  { id: 'my-spaces', label: 'My Spaces', icon: Users, href: '/spaces/my' },
];

const builderNavItems: NavigationItem[] = [
  { id: 'hivelab', label: 'HiveLab', icon: Plus, href: '/build', requiresBuilder: true, isNew: true },
  { id: 'my-tools', label: 'My Tools', icon: Activity, href: '/tools?filter=my' },
];

const quickActions = [
  { id: 'search', label: 'Search', icon: Search, action: 'openSearch' },
  { id: 'notifications', label: 'Notifications', icon: Bell, action: 'openNotifications' },
  { id: 'create', label: 'Create', icon: Plus, action: 'openCreate' },
];

export function MobileNavigationMenu({
  user,
  isOpen,
  onClose,
  unreadNotifications = 0,
  className
}: MobileNavigationMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'openSearch':
        // Trigger global search
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
        break;
      case 'openNotifications':
        // Open notification center
        window.dispatchEvent(new CustomEvent('toggle-notifications'));
        break;
      case 'openCreate':
        router.push('/build');
        break;
    }
    onClose();
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const canAccessBuilder = user?.builderStatus === 'active' || user?.role === 'faculty' || user?.role === 'admin';

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              "fixed left-0 top-0 bottom-0 w-80 bg-hive-background-primary border-r border-hive-border-subtle z-50 overflow-y-auto lg:hidden",
              className
            )}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-hive-border-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-lg flex items-center justify-center">
                    <Building className="h-4 w-4 text-[var(--hive-background-primary)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-hive-text-primary">HIVE</h2>
                    <p className="text-xs text-hive-text-secondary">Campus Network</p>
                  </div>
                </div>
                <ButtonEnhanced
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-hive-text-secondary hover:text-hive-text-primary"
                >
                  <X className="h-5 w-5" />
                </ButtonEnhanced>
              </div>

              {/* User Info */}
              {user && (
                <div className="p-6 border-b border-hive-border-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--hive-brand-secondary)]/20 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-hive-text-primary truncate">{user.name}</p>
                      <p className="text-xs text-hive-text-secondary truncate">@{user.handle}</p>
                    </div>
                    {user.builderStatus === 'active' && (
                      <Crown className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
                    )}
                    {user.role === 'admin' && (
                      <Shield className="h-4 w-4 text-purple-400" />
                    )}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="p-6 border-b border-hive-border-subtle">
                <h3 className="text-sm font-medium text-hive-text-secondary mb-3">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    const hasNotificationBadge = action.id === 'notifications' && unreadNotifications > 0;
                    
                    return (
                      <ButtonEnhanced
                        key={action.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction(action.action)}
                        className="flex flex-col items-center gap-1 h-auto py-3 text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated relative"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs">{action.label}</span>
                        {hasNotificationBadge && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-[var(--hive-text-primary)]">
                            {unreadNotifications > 99 ? '99+' : unreadNotifications}
                          </Badge>
                        )}
                      </ButtonEnhanced>
                    );
                  })}
                </div>
              </div>

              {/* Primary Navigation */}
              <div className="flex-1 p-6">
                <nav className="space-y-1">
                  <h3 className="text-sm font-medium text-hive-text-secondary mb-3">Navigation</h3>
                  {primaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <ButtonEnhanced
                        key={item.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          "w-full justify-start gap-3 h-10",
                          active 
                            ? "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-r-2 border-hive-gold" 
                            : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        {item.isNew && (
                          <Badge variant="secondary" className="ml-auto text-xs">New</Badge>
                        )}
                      </ButtonEnhanced>
                    );
                  })}

                  <Separator className="my-4" />

                  <h3 className="text-sm font-medium text-hive-text-secondary mb-3">More</h3>
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <ButtonEnhanced
                        key={item.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          "w-full justify-start gap-3 h-10",
                          active 
                            ? "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-r-2 border-hive-gold" 
                            : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </ButtonEnhanced>
                    );
                  })}

                  {/* Builder Section */}
                  {canAccessBuilder && (
                    <>
                      <Separator className="my-4" />
                      <h3 className="text-sm font-medium text-hive-text-secondary mb-3">Builder Tools</h3>
                      {builderNavItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        
                        return (
                          <ButtonEnhanced
                            key={item.id}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNavigation(item.href)}
                            className={cn(
                              "w-full justify-start gap-3 h-10",
                              active 
                                ? "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-r-2 border-hive-gold" 
                                : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                            {item.isNew && (
                              <Badge variant="secondary" className="ml-auto text-xs">New</Badge>
                            )}
                          </ButtonEnhanced>
                        );
                      })}
                    </>
                  )}
                </nav>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-hive-border-subtle">
                <div className="space-y-2">
                  <ButtonEnhanced
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/settings')}
                    className="w-full justify-start gap-3 h-10 text-hive-text-secondary hover:text-hive-text-primary"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </ButtonEnhanced>
                  <ButtonEnhanced
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/help')}
                    className="w-full justify-start gap-3 h-10 text-hive-text-secondary hover:text-hive-text-primary"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </ButtonEnhanced>
                  <ButtonEnhanced
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      // Handle logout
                      window.location.href = '/auth/logout';
                    }}
                    className="w-full justify-start gap-3 h-10 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </ButtonEnhanced>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}