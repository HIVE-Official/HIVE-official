"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { 
  Home, 
  Users, 
  MessageSquare, 
  Zap, 
  Calendar,
  Settings,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface NavigationSidebarProps {
  collapsed?: boolean;
  user?: {
    id: string;
    name: string;
    handle?: string;
    avatar?: string;
    builderStatus?: 'none' | 'active' | 'pending';
  };
  currentSection?: 'profile' | 'spaces' | 'feed' | 'hivelab' | 'rituals' | 'calendar' | 'settings';
  currentPath?: any; // For compatibility with app-shell
  onToggleCollapse?: () => void;
  onSectionChange?: (section: string) => void;
  className?: string;
}

const navigationItems = [
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    href: '/profile',
  },
  {
    id: 'spaces',
    label: 'Spaces',
    icon: Users,
    href: '/spaces',
  },
  {
    id: 'feed',
    label: 'Feed',
    icon: MessageSquare,
    href: '/feed',
  },
  {
    id: 'hivelab',
    label: 'HiveLAB',
    icon: Zap,
    href: '/hivelab',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
    href: '/calendar',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  collapsed = false,
  user,
  currentSection = 'profile',
  onToggleCollapse,
  onSectionChange,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-hive-background-secondary border-r border-hive-border-subtle h-full flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-hive-border-subtle">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-hive-accent-gold flex items-center justify-center">
              <Home className="w-4 h-4 text-hive-text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-hive-text-primary font-semibold text-sm">HIVE</h2>
              <p className="text-hive-text-secondary text-xs">Campus Platform</p>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-hive-accent-gold flex items-center justify-center">
              <Home className="w-4 h-4 text-hive-text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange?.(item.id)}
              className={cn(
                'w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                'hover:bg-hive-background-tertiary',
                isActive
                  ? 'bg-hive-accent-gold/10 text-hive-accent-gold border border-hive-accent-gold/20'
                  : 'text-hive-text-secondary hover:text-hive-text-primary',
                collapsed ? 'justify-center' : 'justify-start'
              )}
            >
              <Icon className={cn('w-5 h-5', !collapsed && 'mr-3')} />
              {!collapsed && (
                <span className="flex-1 text-left">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      {user && (
        <div className="p-4 border-t border-hive-border-subtle">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-hive-text-muted flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-hive-text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-hive-text-primary font-medium text-sm truncate">
                  {user.name}
                </p>
                {user.handle && (
                  <p className="text-hive-text-secondary text-xs truncate">
                    @{user.handle}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-hive-text-muted flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-hive-text-primary" />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Collapse Toggle */}
      {onToggleCollapse && (
        <div className="p-2 border-t border-hive-border-subtle">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-tertiary transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default NavigationSidebar;