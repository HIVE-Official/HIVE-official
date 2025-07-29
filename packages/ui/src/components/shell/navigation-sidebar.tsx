"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Compass, 
  Zap, 
  User, 
  Settings, 
  Plus,
  Users,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Target,
  Activity,
  MessageSquare,
  Heart,
  TrendingUp,
  Award,
  Clock,
  Building,
  Briefcase,
  GraduationCap,
  Coffee,
  Bell,
  Search,
  AlignJustify,
  Hash,
  Library,
  Palette,
  Wrench
} from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { cn } from '../../lib/utils';
// Removed legacy luxury theme imports - now using HIVE PRD-aligned design tokens

interface NavigationSidebarProps {
  collapsed: boolean;
  user?: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    builderStatus?: 'none' | 'pending' | 'active';
  } | null;
  currentPath?: string;
  width?: 'compact' | 'wide' | 'standard';
  layoutType?: string;
  className?: string;
  onToggle?: () => void;
  onToggleNavigationMode?: () => void;
}

interface NavigationItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href?: string;
  badge?: number | string;
  matchPaths?: string[];
  children?: NavigationItem[];
  description?: string;
  premium?: boolean;
  soon?: boolean;
  divider?: boolean;
}

// Four-Pillar Navigation Structure per @hive.md
const navigationItems: NavigationItem[] = [
  { 
    id: 'feed',
    icon: Activity, 
    label: 'Feed', 
    href: '/feed', 
    matchPaths: ['/feed'],
    description: 'Campus pulse & coordination - your activity stream'
  },
  { 
    id: 'spaces',
    icon: Users, 
    label: 'Spaces', 
    href: '/spaces', 
    matchPaths: ['/spaces'],
    description: 'Communities & groups - discover and join campus communities',
    children: [
      {
        id: 'spaces-discover',
        icon: Compass,
        label: 'Discover',
        href: '/spaces/discover',
        description: 'AI recommendations and discovery'
      },
      {
        id: 'spaces-your',
        icon: Heart,
        label: 'Your Spaces',
        href: '/spaces/my',
        description: 'Active communities you\'ve joined'
      },
      {
        id: 'spaces-categories',
        icon: Hash,
        label: 'Categories',
        href: '/spaces/categories',
        description: 'Browse by space type'
      }
    ]
  },
  { 
    id: 'profile',
    icon: User, 
    label: 'Profile', 
    href: '/profile', 
    matchPaths: ['/profile'],
    description: 'Personal dashboard - your campus identity and activity'
  },
  { 
    id: 'tools',
    icon: Zap, 
    label: 'Tools', 
    href: '/tools', 
    matchPaths: ['/tools', '/build'],
    description: 'Solutions & building - marketplace, personal tools, and HiveLab',
    children: [
      {
        id: 'tools-marketplace',
        icon: Compass,
        label: 'Marketplace',
        href: '/tools/marketplace',
        description: 'Discovery & installation'
      },
      {
        id: 'tools-personal',
        icon: User,
        label: 'Personal Tools',
        href: '/tools/personal',
        description: 'Individual productivity'
      },
      {
        id: 'tools-hivelab',
        icon: Wrench,
        label: 'HiveLab',
        href: '/tools/hivelab',
        description: 'Creation interface'
      }
    ]
  }
];

const bottomItems: NavigationItem[] = [
  { 
    id: 'calendar', 
    icon: Calendar, 
    label: 'Calendar', 
    href: '/calendar',
    matchPaths: ['/calendar', '/events'],
    description: 'Your schedule and campus events'
  },
  { 
    id: 'resources', 
    icon: Library, 
    label: 'Resources', 
    href: '/resources',
    matchPaths: ['/resources'],
    description: 'Campus resources and documentation'
  },
  { 
    id: 'settings', 
    icon: Settings, 
    label: 'Settings', 
    href: '/settings',
    description: 'Manage your account and app preferences'
  },
];

export function NavigationSidebar({ collapsed, user, currentPath = '/', className, onToggle, onToggleNavigationMode }: NavigationSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Helper function to check if a navigation item is active
  const isItemActive = (item: NavigationItem): boolean => {
    const activePath = currentPath || pathname;
    if (item.href && activePath === item.href) return true;
    if (item.matchPaths) {
      return item.matchPaths.some(path => 
        activePath === path || activePath.startsWith(path + '/')
      );
    }
    return false;
  };

  return (
    <aside 
      className={cn(
        "h-screen flex-shrink-0",
        "transition-all duration-300 ease-out",
        "flex flex-col overflow-hidden",
        // Enhanced HIVE styling
        "backdrop-blur-2xl border-r",
        // Responsive width behavior
        collapsed 
          ? "w-0 md:w-16" 
          : "w-0 md:w-50", // Hidden on mobile, 50 on desktop
        className
      )}
      style={{
        background: 'var(--hive-bg-secondary)',
        backdropFilter: 'blur(24px) saturate(150%)',
        borderRight: '1px solid var(--hive-border-default)',
        boxShadow: 'inset -1px 0 0 var(--hive-brand-secondary)/20',
      }}
    >
      {/* HIVE Branding Header with Toggle */}
      <div 
        className="px-3 py-3 border-b flex items-center justify-between"
        style={{
          borderColor: 'var(--hive-border-default)',
          background: 'linear-gradient(90deg, var(--hive-brand-secondary)/8 0%, transparent 100%)'
        }}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--hive-brand-secondary)] rounded-md flex items-center justify-center">
              <Hash className="w-4 h-4 text-[var(--hive-text-inverse)]" />
            </div>
            <div>
              <div 
                className="text-sm font-bold tracking-wider text-[var(--hive-brand-secondary)]"
              >
                HIVE
              </div>
              <div 
                className="text-xs font-medium text-[var(--hive-text-tertiary)]"
              >
                Campus OS
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0 md:hidden transition-all duration-200 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] rounded-md"
          style={{
            color: 'var(--hive-text-tertiary)'
          }}
        >
          <div className="h-4 w-4">
            <div className="space-y-1">
              <div className="w-4 h-0.5 bg-current transition-all duration-200" />
              <div className="w-4 h-0.5 bg-current transition-all duration-200" />
              <div className="w-4 h-0.5 bg-current transition-all duration-200" />
            </div>
          </div>
        </Button>
      </div>

      {/* User Profile Section */}
      {!collapsed && user && (
        <div 
          className="px-3 py-3 border-b transition-all duration-500 ease-out"
          style={{ borderColor: 'var(--hive-border-default)' }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium relative overflow-hidden transition-all duration-300 ease-out"
              style={{
                background: 'linear-gradient(135deg, var(--hive-brand-secondary) 0%, var(--hive-brand-secondary)/80 100%)',
                color: 'var(--hive-text-inverse)',
                boxShadow: '0 0.5 2 var(--hive-brand-secondary)/25'
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div 
                className="text-sm font-medium truncate transition-colors duration-200"
                style={{ color: 'var(--hive-text-primary)' }}
              >
                {user.name}
              </div>
              <div 
                className="text-xs truncate transition-colors duration-200"
                style={{ color: 'var(--hive-text-tertiary)' }}
              >
                @{user.handle}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Navigation Items */}
      <nav className="flex-1 px-2 overflow-y-auto">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              isActive={isItemActive(item)}
              router={router}
            />
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div 
        className="border-t px-3 py-4"
        style={{ borderColor: 'var(--hive-border-default)' }}
      >
        <div className="space-y-2">
          {/* Navigation Mode Toggle */}
          {!collapsed && onToggleNavigationMode && (
            <Button
              variant="ghost"
              onClick={onToggleNavigationMode}
              className="w-full justify-start h-10 px-3 mb-3 transition-all duration-200 hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)] text-[var(--hive-text-tertiary)] rounded-md"
              style={{
                fontSize: '3.25px'
              }}
            >
              <AlignJustify className="h-4 w-4 mr-2" />
              Switch to Top Nav
            </Button>
          )}
          
          {bottomItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              isActive={isItemActive(item)}
              router={router}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function NavigationItem({ 
  item, 
  collapsed,
  isActive = false,
  router
}: { 
  item: NavigationItem; 
  collapsed: boolean;
  isActive?: boolean;
  router: any;
}) {
  const Icon = item.icon;
  const [isNavigating, setIsNavigating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = async () => {
    if (item.href && router) {
      setIsNavigating(true);
      try {
        await router.push(item.href);
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        setIsNavigating(false);
      }
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={handleClick}
        disabled={isNavigating}
        className={cn(
          "w-full transition-all duration-300 ease-out group relative overflow-hidden rounded-lg",
          collapsed ? "justify-center h-12 p-0" : "justify-start h-12 px-4",
          "hover:scale-[1.02] hover:-translate-y-0.5",
          isNavigating && "pointer-events-none",
          isActive && "shadow-lg"
        )}
        style={{
          background: isActive 
            ? 'linear-gradient(90deg, var(--hive-brand-secondary)/15 0%, var(--hive-brand-secondary)/8 100%)'
            : 'transparent',
          color: isActive ? 'var(--hive-brand-secondary)' : 'var(--hive-text-tertiary)',
          border: isActive ? '1px solid var(--hive-brand-secondary)/25' : '1px solid transparent',
          fontWeight: isActive ? '500' : '400',
          transform: isNavigating ? 'scale(0.98)' : 'scale(1)',
          boxShadow: isActive ? '0 1 3 var(--hive-brand-secondary)/20' : 'none',
        }}
        onMouseEnter={(e) => {
          if (collapsed) {
            setShowTooltip(true);
          }
          if (!isActive && !isNavigating) {
            e.currentTarget.style.background = 'var(--hive-interactive-hover)';
            e.currentTarget.style.color = 'var(--hive-text-primary)';
            e.currentTarget.style.borderColor = 'var(--hive-border-hover)';
            e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
          }
        }}
        onMouseLeave={(e) => {
          setShowTooltip(false);
          if (!isActive && !isNavigating) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--hive-text-tertiary)';
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }
        }}
        onFocus={() => {
          if (collapsed) {
            setShowTooltip(true);
          }
        }}
        onBlur={() => {
          setShowTooltip(false);
        }}
      >
        {/* Icon */}
        <div className={cn(
          "flex items-center justify-center rounded-lg transition-all duration-300 ease-out relative",
          collapsed ? "w-7 h-7" : "w-8 h-8 mr-3",
          isNavigating && "animate-pulse"
        )}
        style={{
          background: isActive 
            ? 'linear-gradient(135deg, var(--hive-brand-secondary) 0%, var(--hive-brand-secondary)/80 100%)'
            : 'var(--hive-bg-tertiary)',
          color: isActive ? 'var(--hive-text-inverse)' : 'inherit',
          transform: isNavigating ? 'scale(0.9)' : 'scale(1)',
        }}>
          <Icon className={cn(
            "h-4 w-4 transition-all duration-300 ease-out",
            isNavigating && "opacity-70"
          )} />
          
          {/* Loading spinner overlay */}
          {isNavigating && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'inherit' }}
            >
              <div 
                className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"
                style={{ 
                  borderColor: isActive ? 'var(--hive-text-inverse)' : 'var(--hive-brand-secondary)',
                  borderTopColor: 'transparent'
                }}
              />
            </div>
          )}
        </div>

        {/* Label (when expanded) */}
        {!collapsed && (
          <span className={cn(
            "text-sm transition-all duration-300 ease-out truncate",
            isActive ? "font-medium" : "font-normal",
            isNavigating && "opacity-70"
          )}
          style={{
            fontWeight: isActive ? '500' : '400'
          }}>
            {item.label}
          </span>
        )}
        
        {/* Active state indicator */}
        {isActive && (
          <div 
            className="absolute right-2 w-1 h-6 rounded-full transition-all duration-300 ease-out"
            style={{
              background: 'linear-gradient(180deg, var(--hive-brand-secondary) 0%, var(--hive-brand-secondary)/80 100%)',
              boxShadow: '0 0 2 var(--hive-brand-secondary)/50'
            }}
          />
        )}
      </Button>

      {/* Enhanced Tooltip for Collapsed State - Hidden on Mobile */}
      {collapsed && showTooltip && (
        <div 
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:block"
          style={{
            animation: 'fadeInScale 200ms ease-out forwards'
          }}
        >
          <div 
            className="px-3 py-2 rounded-lg shadow-lg border backdrop-blur-md max-w-xs"
            style={{
              background: 'var(--hive-bg-secondary)',
              borderColor: 'var(--hive-border-default)',
              color: 'var(--hive-text-primary)',
              boxShadow: '0 8px 32px var(--hive-shadow-primary)/20'
            }}
          >
            <div className="font-medium text-sm mb-1" style={{ color: 'var(--hive-text-primary)' }}>
              {item.label}
            </div>
            {item.description && (
              <div 
                className="text-xs leading-relaxed"
                style={{ 
                  color: 'var(--hive-text-secondary)',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word'
                }}
              >
                {item.description}
              </div>
            )}
            {/* Tooltip arrow */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1"
              style={{
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: '6px solid var(--hive-bg-secondary)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}