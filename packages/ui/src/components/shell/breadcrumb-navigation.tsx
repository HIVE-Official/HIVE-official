"use client";

import React from 'react';
import { ChevronRight, Home, Users, Code, Zap, Calendar, BookOpen, User, Settings, Compass, Heart } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  maxItems?: number;
}

// Route mappings for generating breadcrumbs from pathname
const routeMappings = {
  '/': { label: 'Dashboard', icon: Home },
  '/spaces': { label: 'Spaces', icon: Users },
  '/spaces/browse': { label: 'Browse Spaces', icon: Compass },
  '/spaces/my': { label: 'My Spaces', icon: Heart },
  '/tools': { label: 'Tools', icon: Code },
  '/build': { label: 'HiveLab', icon: Zap },
  '/calendar': { label: 'Calendar', icon: Calendar },
  '/events': { label: 'Events', icon: Calendar },
  '/resources': { label: 'Resources', icon: BookOpen },
  '/profile': { label: 'Profile', icon: User },
  '/settings': { label: 'Settings', icon: Settings },
};

// Generate breadcrumbs from pathname
export function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const mapping = routeMappings[currentPath as keyof typeof routeMappings];
    
    if (mapping) {
      breadcrumbs.push({
        label: mapping.label,
        href: currentPath,
        icon: mapping.icon,
      });
    } else {
      // Dynamic segments (like IDs)
      let label = segment;
      
      // Format dynamic segments
      if (segment.length > 20) {
        label = `${segment.slice(0, 10)}...${segment.slice(-6)}`;
      } else {
        label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }
      
      breadcrumbs.push({
        label,
        href: currentPath,
      });
    }
  }
  
  return breadcrumbs;
}

// Smart breadcrumb component that can auto-generate from pathname
interface SmartBreadcrumbNavigationProps extends Omit<BreadcrumbNavigationProps, 'items'> {
  items?: BreadcrumbItem[];
  pathname?: string;
  autoGenerate?: boolean;
}

export function BreadcrumbNavigation({ 
  items, 
  className, 
  showHome = true, 
  maxItems = 5 
}: BreadcrumbNavigationProps) {
  // Truncate items if they exceed maxItems
  const displayItems = items.length > maxItems 
    ? [
        ...items.slice(0, 2),
        { label: '...', href: undefined },
        ...items.slice(-(maxItems - 3))
      ]
    : items;

  return (
    <nav 
      className={cn(
        "flex items-center space-x-1 text-sm overflow-x-auto scrollbar-hide",
        className
      )} 
      aria-label="Breadcrumb"
    >
      {/* Home Link */}
      {showHome && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-1 hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] hover:text-[var(--hive-text-primary)] shrink-0"
            onClick={() => window.location.href = '/'}
          >
            <Home className="h-3 w-3" />
          </Button>

          {displayItems.length > 0 && (
            <ChevronRight className="h-3 w-3 text-[var(--hive-border-default)] shrink-0" />
          )}
        </>
      )}

      {/* Breadcrumb Items */}
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;
        const isEllipsis = item.label === '...';
        const Icon = item.icon;

        return (
          <React.Fragment key={index}>
            <div className="flex items-center space-x-1 shrink-0">
              {Icon && <Icon className="h-3 w-3" />}
              {isEllipsis ? (
                <span className="px-1 text-[var(--hive-text-tertiary)]">
                  {item.label}
                </span>
              ) : item.href ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-6 px-1 font-normal max-w-32 truncate",
                    "hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] hover:text-[var(--hive-text-primary)]",
                    "text-[var(--hive-text-tertiary)]"
                  )}
                  onClick={() => window.location.href = item.href!}
                  title={item.label}
                >
                  {item.label}
                </Button>
              ) : (
                <span 
                  className={cn(
                    "px-1 font-medium max-w-32 truncate",
                    isLast ? "text-[var(--hive-text-primary)]" : "text-[var(--hive-text-tertiary)]"
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </div>
            
            {!isLast && (
              <ChevronRight className="h-3 w-3 text-[var(--hive-border-default)] shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

// Smart breadcrumb component that auto-generates from pathname
export function SmartBreadcrumbNavigation({
  items,
  pathname,
  autoGenerate = true,
  className,
  showHome = true,
  maxItems = 5,
}: SmartBreadcrumbNavigationProps) {
  const breadcrumbItems = React.useMemo(() => {
    if (items) return items;
    if (autoGenerate && pathname) {
      return generateBreadcrumbsFromPath(pathname);
    }
    return [];
  }, [items, pathname, autoGenerate]);

  return (
    <BreadcrumbNavigation
      items={breadcrumbItems}
      className={className}
      showHome={showHome}
      maxItems={maxItems}
    />
  );
}