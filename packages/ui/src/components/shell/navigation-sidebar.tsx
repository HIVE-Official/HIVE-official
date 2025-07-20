"use client";

import React from 'react';
import { 
  Home, 
  Compass, 
  Zap, 
  User, 
  Settings, 
  Plus,
  Users,
  BookOpen,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { darkLuxury, luxuryRadius, luxurySpacing, luxuryTypography, glassEffects, luxuryComponents } from '../../theme/dark-luxury';

interface NavigationSidebarProps {
  collapsed: boolean;
  user?: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    builderStatus?: 'none' | 'pending' | 'active';
  } | null;
  currentSection?: string;
  width?: 'compact' | 'wide' | 'standard';
  layoutType?: string;
  className?: string;
}

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
  isActive?: boolean;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: 'Feed', href: '/', isActive: true },
  { icon: Compass, label: 'Discover', href: '/spaces' },
  { icon: Zap, label: 'Build', href: '/build' },
  { icon: Users, label: 'My Spaces', href: '/profile?tab=spaces', badge: 3 },
  { icon: BookOpen, label: 'Resources', href: '/resources' },
  { icon: Calendar, label: 'Events', href: '/events' },
];

const bottomItems: NavigationItem[] = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function NavigationSidebar({ collapsed, user, className }: NavigationSidebarProps) {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40",
        "backdrop-blur-xl",
        "border-r",
        "transition-all duration-200 ease-out",
        "flex flex-col",
        // Mobile: hidden when collapsed, full width when expanded
        // Desktop: normal collapsed/expanded behavior
        collapsed 
          ? "w-0 md:w-16 overflow-hidden" 
          : "w-64",
        className
      )}
      style={{
        ...glassEffects.backdrop,
      }}
    >
      {/* Create Button */}
      <div style={{ padding: luxurySpacing.lg }}>
        <Button
          className={cn(
            "w-full font-medium transition-all duration-90",
            collapsed && "w-8 h-8 p-0"
          )}
          style={{
            backgroundColor: darkLuxury.gold,
            color: darkLuxury.obsidian,
            fontWeight: luxuryTypography.weights.medium,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = darkLuxury.champagne;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = darkLuxury.gold;
          }}
        >
          <Plus className="h-4 w-4" style={{ marginRight: !collapsed ? luxurySpacing.sm : 0 }} />
          {!collapsed && "Create"}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1" style={{ padding: `0 ${luxurySpacing.md}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: luxurySpacing.xs }}>
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.href}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div 
        className="border-t"
        style={{
          padding: `${luxurySpacing.lg} ${luxurySpacing.md} ${luxurySpacing.lg}`,
          borderColor: darkLuxury.steel,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: luxurySpacing.xs }}>
          {bottomItems.map((item) => (
            <NavigationItem
              key={item.href}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function NavigationItem({ 
  item, 
  collapsed 
}: { 
  item: NavigationItem; 
  collapsed: boolean; 
}) {
  const Icon = item.icon;

  const handleClick = () => {
    window.location.href = item.href;
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        "w-full justify-start h-9 transition-all duration-200",
        collapsed && "justify-center px-0"
      )}
      style={{
        color: item.isActive ? darkLuxury.gold : darkLuxury.mercury,
        backgroundColor: item.isActive ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
      }}
      onMouseEnter={(e) => {
        if (!item.isActive) {
          e.currentTarget.style.backgroundColor = darkLuxury.glassShine;
          e.currentTarget.style.color = darkLuxury.platinum;
        }
      }}
      onMouseLeave={(e) => {
        if (!item.isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = darkLuxury.mercury;
        }
      }}
    >
      <Icon className="h-4 w-4" style={{ marginRight: !collapsed ? luxurySpacing.md : 0 }} />
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <span 
              className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: darkLuxury.gold,
                color: darkLuxury.obsidian,
                fontSize: luxuryTypography.sizes.xs,
                fontWeight: luxuryTypography.weights.medium,
              }}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </Button>
  );
}