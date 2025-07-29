"use client";

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import { motion, MotionButton } from '../framer-motion-proxy';
import { cn } from '../../lib/utils';
import { getHiveMotionProps } from '../../lib/motion-utils';
import { type NavigationItem } from './hive-navigation-system';

// HIVE Navigation Item variants - Following button design patterns
const hiveNavigationItemVariants = cva(
  // Base styles - premium navigation item with semantic tokens
  "group relative flex items-center justify-start whitespace-nowrap font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)] disabled:pointer-events-none disabled:opacity-50 select-none backdrop-blur-sm",
  {
    variants: {
      variant: {
        // Default navigation item
        default: "bg-transparent text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)]",
        
        // Active navigation item with gold accent
        active: "bg-[var(--hive-overlay-gold-subtle)] text-[var(--hive-text-primary)] border-l-2 border-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-shadow-gold-glow)]",
        
        // Ghost variant for secondary navigation
        ghost: "bg-transparent text-[var(--hive-text-muted)] hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)]",
        
        // Minimal variant for compact layouts
        minimal: "bg-transparent text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass)] hover:text-[var(--hive-text-primary)]",
        
        // Premium variant with gold accent
        premium: "bg-[var(--hive-background-primary)]/80 backdrop-blur-sm border border-[var(--hive-border-gold)] text-[var(--hive-brand-primary)] hover:bg-[var(--hive-overlay-gold-subtle)] hover:shadow-lg hover:shadow-[var(--hive-shadow-gold-glow)]",
        
        // Disabled state
        disabled: "bg-transparent text-[var(--hive-text-disabled)] cursor-not-allowed opacity-50",
      },
      
      size: {
        sm: "h-8 px-3 text-sm rounded-xl gap-2",
        default: "h-10 px-4 text-sm rounded-2xl gap-3",
        lg: "h-12 px-6 text-base rounded-2xl gap-3",
      },
      
      level: {
        0: "ml-0",
        1: "ml-4",
        2: "ml-8",
        3: "ml-12",
      },
      
      collapsed: {
        true: "justify-center px-2 w-10",
        false: "justify-start",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      level: 0,
      collapsed: false,
    },
  }
);

export interface HiveNavigationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof hiveNavigationItemVariants> {
  item: NavigationItem;
  isActive?: boolean;
  isCollapsed?: boolean;
  level?: 0 | 1 | 2 | 3;
  onNavigate?: (item: NavigationItem) => void;
}

export function HiveNavigationItem({ 
  item, 
  isActive, 
  isCollapsed, 
  level = 0,
  onNavigate,
  className,
  variant,
  size,
  onDrag: _onDrag,
  onDragStart: _onDragStart,
  onDragEnd: _onDragEnd,
  onDrop: _onDrop,
  onAnimationStart: _onAnimationStart,
  onAnimationEnd: _onAnimationEnd,
  ...props 
}: HiveNavigationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  
  const handleClick = () => {
    if (item.isDisabled) return;
    
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onNavigate?.(item);
    }
  };

  // Determine variant based on state
  const effectiveVariant = item.isDisabled 
    ? 'disabled' 
    : isActive 
      ? 'active' 
      : variant || 'default';

  return (
    <div>
      <motion.button
        onClick={handleClick}
        disabled={item.isDisabled}
        className={cn(
          hiveNavigationItemVariants({ 
            variant: effectiveVariant, 
            size, 
            level: level as 0 | 1 | 2 | 3, 
            collapsed: isCollapsed 
          }),
          className
        )}
        style={{
          willChange: 'transform',
          transformOrigin: 'center',
          backfaceVisibility: 'hidden' as const,
          transform: 'translateZ(0)',
        }}
        whileHover={{ scale: item.isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: item.isDisabled ? 1 : 0.98 }}
        {...props}
      >
        {Icon && (
          <Icon 
            className={cn(
              "flex-shrink-0 w-4 h-4",
              isActive && "text-[var(--hive-brand-primary)]"
            )} 
          />
        )}
        
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate text-left">{item.label}</span>
            
            {item.badge && (
              <motion.div 
                className={cn(
                  "ml-2 px-2 py-1 rounded-full text-xs font-medium",
                  "min-w-5 flex items-center justify-center"
                )}
                style={{
                  backgroundColor: item.badge.variant === 'error' 
                    ? 'var(--hive-status-error)' 
                    : item.badge.variant === 'warning'
                      ? 'var(--hive-status-warning)'
                      : item.badge.variant === 'success'
                        ? 'var(--hive-status-success)'
                        : 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                }}
                animate={item.badge.pulse ? { scale: [1, 1.1, 1] } : {}}
                transition={item.badge.pulse ? { duration: 2, repeat: Infinity } : {}}
              >
                {item.badge.count || ''}
              </motion.div>
            )}
            
            {hasChildren && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="ml-2 w-4 h-4" />
              </motion.div>
            )}
          </>
        )}
      </motion.button>
      
      {hasChildren && isExpanded && !isCollapsed && (
        <motion.div 
          className="mt-1 space-y-1"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.children!.map((child) => (
            <HiveNavigationItem
              key={child.id}
              item={child}
              isActive={child.isActive}
              level={Math.min(level + 1, 3) as 0 | 1 | 2 | 3}
              onNavigate={onNavigate}
              size={size}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

// Section Header Component
export interface HiveNavigationSectionProps {
  label: string;
  collapsed?: boolean;
  className?: string;
}

export function HiveNavigationSection({ 
  label, 
  collapsed, 
  className 
}: HiveNavigationSectionProps) {
  if (collapsed) return null;
  
  return (
    <div className={cn("px-4 mb-2", className)}>
      <h3 
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ 
          color: 'var(--hive-text-muted)',
          fontFamily: 'var(--hive-font-family-primary)',
          fontSize: 'var(--hive-font-size-xs)',
          fontWeight: 'var(--hive-font-weight-semibold)',
          letterSpacing: 'var(--hive-letter-spacing-wider)'
        }}
      >
        {label}
      </h3>
    </div>
  );
}

// Create Button Component
export interface HiveNavigationCreateButtonProps {
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

export function HiveNavigationCreateButton({ 
  collapsed, 
  onClick, 
  className 
}: HiveNavigationCreateButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full font-medium transition-all duration-300 ease-out",
        "bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]",
        "hover:bg-[var(--hive-brand-secondary)] hover:shadow-lg hover:shadow-[var(--hive-shadow-gold-glow)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)]/30",
        "active:scale-[0.98] backdrop-blur-sm",
        collapsed ? "h-10 w-10 rounded-2xl" : "h-10 px-4 rounded-2xl",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center gap-2">
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4v16m8-8H4" 
          />
        </svg>
        {!collapsed && <span>Create</span>}
      </div>
    </motion.button>
  );
}

export type { NavigationItem } from './hive-navigation-system';